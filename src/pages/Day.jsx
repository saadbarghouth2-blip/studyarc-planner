import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { loadProgress, saveProgress } from '../utils/storage'

export default function Day(){
  const { week, day } = useParams()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(true)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(loadProgress())

  useEffect(()=>{
    fetch('/src/data/studyplan.json').then(r=>r.json()).then(data=>{
      const w = data.find(x => String(x.week) === String(week))
      if(w){
        const d = w.days.find(x => String(x.day) === String(day))
        setTask(d || null)
      }
      setLoading(false)
    })
  },[week,day])

  const toggleDone = ()=>{
    setDone(prev => !prev)
    const stored = loadProgress()
    const completed = stored.completedTasks || 0
    const total = stored.totalTasks || 0
    const newCompleted = done ? Math.max(0, completed-1) : completed+1
    const newObj = { totalTasks: total, completedTasks: newCompleted }
    saveProgress(newObj)
    setProgress(newObj)
  }

  if(loading) return <div className="loader-wrap"><div className="loader">SA</div></div>
  if(!task) return <main className="container"><p>Task not found</p></main>

  return (
    <main className="container">
      <div className="card">
        <div className="kicker">Week {week} • Day {day}</div>
        <h2 style={{marginTop:8}}>{task.title}</h2>
        <div style={{color:'var(--muted)',marginTop:8}}>{task.description || ''}</div>
        <div style={{marginTop:12}}>
          <strong>Objectives</strong>
          <ul>
            {task.objectives.map((o,i)=><li key={i}>{o}</li>)}
          </ul>
        </div>
        <div style={{marginTop:12}}>
          <strong>Resources</strong>
          <ul>
            {task.resources.map((r,i)=>(<li key={i}><a href={r.link} target="_blank" rel="noreferrer">{r.title}</a> ({r.type})</li>))}
          </ul>
        </div>
        <div style={{marginTop:12}}>
          <strong>Exercise</strong>
          <p>{task.exercise}</p>
        </div>

        <div style={{marginTop:12, display:'flex',gap:8}}>
          <button className="btn" onClick={toggleDone}>{done? 'Mark as not done' : 'Mark as done'}</button>
          <div style={{color:'var(--muted)'}}>Progress saved locally</div>
        </div>
      </div>
    </main>
  )
}
