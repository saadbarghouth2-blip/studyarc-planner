import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import StudyPlan from './pages/StudyPlan'
import Day from './pages/Day'
import Resources from './pages/Resources'
import Settings from './pages/Settings'
import MotionWrapper from './components/MotionWrapper'

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')
  const location = useLocation()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <MotionWrapper location={location}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<StudyPlan />} />
          <Route path="/day/:week/:day" element={<Day />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/settings" element={<Settings setTheme={setTheme} />} />
        </Routes>
      </MotionWrapper>
      <Footer />
    </>
  )
}
