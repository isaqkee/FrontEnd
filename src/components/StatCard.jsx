import React from 'react';
export default function StatCard({ icon: Icon, label, value, suffix, tone='blue', note, progress }) {
  return <article className="stat-card">
    <div className={`stat-icon ${tone}`}><Icon size={19}/></div>
    <div className="stat-content"><span className="eyebrow">{label}</span><div className="stat-value">{value}<small>{suffix}</small></div>
      {progress !== undefined && <div className="progress-track"><span style={{width:`${progress}%`}}/></div>}
      {note && <div className="stat-note">{note}</div>}
    </div>
  </article>;
}