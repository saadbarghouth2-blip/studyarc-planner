import React from 'react'
export default function ProgressBar({value}){
  return (
    <div className="card" style={{padding:12}}>
      <div className="kicker">Overall progress</div>
      <div className="progress" style={{marginTop:8}}><div style={{width: value + '%'}}></div></div>
      <div style={{marginTop:8}}>{value}% completed</div>
    </div>
  )
}
