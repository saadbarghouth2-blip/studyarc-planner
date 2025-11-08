import React, { useEffect, useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { loadProgress } from '../utils/storage'

export default function Home(){
  const [progress, setProgress] = useState(0)

  useEffect(()=>{
    const p = loadProgress()
    const total = p.totalTasks || 0
    const done = p.completedTasks || 0
    setProgress(total? Math.round((done/total)*100): 0)
  },[])

  return (
    <main className="container">
      <section className="hero">
        <div style={{flex:1}}>
          <div className="card hero-left">
            <div className="kicker">Structured ArcGIS Study Plan</div>
            <h1 className="h1">StudyArc Planner</h1>
            <p className="lead">Follow a detailed 12-week study plan for ArcGIS Pro, ArcGIS Online and web GIS. Track progress, open daily tasks and mark them complete.</p>
          </div>
        </div>
        <div style={{width:320}}>
          <ProgressBar value={progress} />
        </div>
      </section>

      <section style={{marginTop:24}}>
        <div className="card">
          <h3 className="kicker">Quick actions</h3>
          <div style={{marginTop:12,display:'flex',gap:8,flexWrap:'wrap'}}>
            <a className="btn" href="/plan">Open Study Plan</a>
            <a className="btn" href="/resources">Open Resources</a>
            <a className="btn" href="/settings">Settings</a>
          </div>
        </div>
      </section>
    </main>
  )
}
