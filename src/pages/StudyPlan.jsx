import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadProgress, saveProgress } from '../utils/storage'

export default function StudyPlan(){
  const [plan, setPlan] = useState([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState({totalTasks:0, completedTasks:0})

  useEffect(()=>{
    fetch('/src/data/studyplan.json').then(r=>r.json()).then(data=>{
      setPlan(data); setLoading(false)
      // initialize progress totals
      const total = data.reduce((acc,w)=> acc + w.days.length, 0)
      const stored = loadProgress()
      const completed = stored.completedTasks || 0
      setProgress({totalTasks: total, completedTasks: completed})
    })
  },[])

  const markDone = () => {
    const newProgress = { ...progress, completedTasks: progress.completedTasks + 1 }
    setProgress(newProgress)
    saveProgress(newProgress)
  }

  return (
    <main className="container">
      <h2 className="kicker">Study Plan</h2>
      <h1 className="h1">12-week ArcGIS Learning Roadmap</h1>
      {loading ? <div className="loader-wrap"><div className="loader">SA</div></div> : (
        <div style={{marginTop:12}}>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <div className="card" style={{minWidth:220}}>
              <div className="kicker">Progress</div>
              <div style={{marginTop:8}}>{progress.completedTasks} / {progress.totalTasks} tasks completed</div>
              <div style={{marginTop:8, height:10, background:'rgba(0,0,0,0.06)', borderRadius:999}}><div style={{width: Math.round((progress.completedTasks/progress.totalTasks)*100) + '%', height:'100%', background:'linear-gradient(90deg,var(--accent), rgba(6,182,212,0.8))'}}></div></div>
              <div style={{marginTop:8}}><button className="btn" onClick={markDone}>Mark one task done (demo)</button></div>
            </div>

            <div style={{flex:1}} className="card">
              <div className="kicker">Tips</div>
              <p style={{color:'var(--muted)'}}>Follow the plan daily, document your exercises, and export your work to include in your portfolio.</p>
            </div>
          </div>

          <div className="grid" style={{marginTop:16}}>
            {plan.map(week => (
              <div key={week.week} className="card week-card">
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div className="kicker">Week {week.week}</div>
                    <h3 style={{marginTop:8}}>{week.title}</h3>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'var(--muted)'}}>{week.days.length} days</div>
                    <Link to={`/day/${week.week}/1`} className="btn" style={{marginTop:8}}>Open week</Link>
                  </div>
                </div>
                <div style={{marginTop:12}}>
                  {week.days.slice(0,4).map(d => (
                    <div key={d.day} className="day-item">
                      <div>
                        <div style={{fontWeight:700}}>{d.title}</div>
                        <div style={{fontSize:12,color:'var(--muted)'}}>Duration: {d.duration_min} min</div>
                      </div>
                      <div style={{display:'flex',gap:8,alignItems:'center'}}>
                        <Link to={`/day/${week.week}/${d.day}`} className="btn">Open</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
