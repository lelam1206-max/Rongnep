import React from 'react'
import { PRINCIPLES, MOM_QUOTE } from '../data'

export default function PrinciplesPage() {
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">🌟 7 nguyên tắc vàng</h1>
        <p className="page-sub">Kim chỉ nam của Rồng &amp; Nếp mỗi ngày</p>
      </header>

      <div className="principles">
        {PRINCIPLES.map((p, i) => (
          <div key={i} className="card principle">
            <div className="principle-ico">{p.icon}</div>
            <div>
              <div className="principle-title">
                <span className="principle-num">{i + 1}</span> {p.title}
              </div>
              <p className="principle-desc">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="card mom-card">
        <div className="mom-ico">💛</div>
        <p className="mom-text">“{MOM_QUOTE}”</p>
        <p className="mom-sign">— Mẹ —</p>
      </section>
    </div>
  )
}
