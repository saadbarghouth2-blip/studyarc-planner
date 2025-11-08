import React, { useEffect, useState } from 'react'

export default function Resources(){
  const [plan, setPlan] = useState([])
  useEffect(()=>{ fetch('/src/data/studyplan.json').then(r=>r.json()).then(data=>setPlan(data)) },[])

  const allResources = plan.flatMap(w => w.days.flatMap(d => d.resources.map(r => ({...r, week: w.week, day: d.day, titleDay: d.title}))))
  return (
    <main className="container">
      <h2 className="kicker">Resources</h2>
      <h1 className="h1">Consolidated study resources</h1>
      <div style={{marginTop:12}} className="card">
        <p style={{color:'var(--muted)'}}>All links are external references (official docs and tutorials).</p>
        <ul style={{marginTop:12}}>
          {allResources.map((r,i)=>(<li key={i}><a href={r.link} target="_blank" rel="noreferrer">{r.title}</a> — Week {r.week} Day {r.day}</li>))}
        </ul>
      </div>
    </main>
  )
}
