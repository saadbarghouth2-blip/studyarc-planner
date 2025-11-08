import React from 'react'

export default function Settings({setTheme}){
  return (
    <main className="container">
      <h2 className="kicker">Settings</h2>
      <h1 className="h1">Customize</h1>
      <div style={{marginTop:12}} className="card">
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="btn" onClick={()=> setTheme('light')}>Light Mode</button>
          <button className="btn" onClick={()=> setTheme('dark')}>Dark Mode</button>
        </div>
        <div style={{marginTop:12,color:'var(--muted)'}}>Progress is stored locally in your browser's localStorage.</div>
      </div>
    </main>
  )
}
