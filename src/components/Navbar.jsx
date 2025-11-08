import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({theme, setTheme}){
  const loc = useLocation()
  return (
    <header className="navbar card">
      <div className="container nav-inner">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="brand">StudyArc Planner</div>
          <div className="kicker" style={{opacity:0.8}}>ArcGIS study planner</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <nav className="nav-links" aria-label="Main navigation">
            <Link to="/" style={{color: loc.pathname==='/'? 'var(--text)':'var(--muted)'}}>Home</Link>
            <Link to="/plan" style={{color: loc.pathname.startsWith('/plan')? 'var(--text)':'var(--muted)', marginLeft:12}}>Study Plan</Link>
            <Link to="/resources" style={{color: loc.pathname==='/resources'? 'var(--text)':'var(--muted)', marginLeft:12}}>Resources</Link>
            <Link to="/settings" style={{color: loc.pathname==='/settings'? 'var(--text)':'var(--muted)', marginLeft:12}}>Settings</Link>
          </nav>

          <button className="btn" onClick={()=> setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?'Light':'Dark'}</button>
        </div>
      </div>
    </header>
  )
}
