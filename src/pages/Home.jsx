import React from 'react'
import { KIDS, MOM_QUOTE } from '../data'
import { todayISO, completionRate, doneCount, streakDays } from '../store'
import { ProgressRing } from '../components/ui'

function KidCard({ kid }) {
  const iso = todayISO()
  const rate = completionRate(kid.id, iso)
  const done = doneCount(kid.id, iso)
  const total = kid.tasks.length
  const streak = streakDays(kid.id)
  return (
    <a
      href={`#/be/${kid.id}`}
      className="kid-card"
      style={{ '--kid': kid.color, '--kid-soft': kid.soft, '--kid-deep': kid.deep }}
    >
      <div className="kid-top">
        <div className="kid-ava">
          {kid.photo ? (
            <img
              src={kid.photo}
              alt={kid.name}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.classList.add('kid-ava-fallback')
                e.currentTarget.parentElement.textContent = kid.emoji
              }}
            />
          ) : (
            kid.emoji
          )}
        </div>
        <div className="kid-meta">
          <div className="kid-name">{kid.name}</div>
          <div className="kid-tag">{kid.tagline}</div>
        </div>
        <ProgressRing pct={rate} color={kid.color} size={76} stroke={8}>
          <span className="ring-pct">{Math.round(rate * 100)}%</span>
        </ProgressRing>
      </div>
      <div className="kid-stats">
        <div className="stat">
          <span className="stat-num">
            {done}/{total}
          </span>
          <span className="stat-label">nhiệm vụ hôm nay</span>
        </div>
        <div className="stat">
          <span className="stat-num">🔥 {streak}</span>
          <span className="stat-label">ngày duy trì</span>
        </div>
      </div>
      <div className="kid-cta">Mở bảng của {kid.name} →</div>
    </a>
  )
}

export default function Home() {
  return (
    <div className="page">
      <header className="hero">
        <div className="hero-emoji">🌱</div>
        <h1 className="hero-title">
          Rồng <span className="amp">&amp;</span> Nếp
        </h1>
        <p className="hero-sub">Bảng thói quen mỗi ngày</p>
        <p className="hero-quote">
          “Kỷ luật là sức mạnh.
          <br />
          Mỗi ngày tốt hơn chính mình của hôm qua một chút.”
        </p>
      </header>

      <section className="kid-list">
        {KIDS.map((k) => (
          <KidCard key={k.id} kid={k} />
        ))}
      </section>

      <section className="card tip-card">
        <div className="tip-title">💛 Lời nhắn của mẹ</div>
        <p className="tip-text">“{MOM_QUOTE}”</p>
        <div className="tip-links">
          <a href="#/tuan" className="chip-link">
            📊 Xem tổng quan tuần
          </a>
          <a href="#/nguyen-tac" className="chip-link">
            🌟 7 nguyên tắc vàng
          </a>
        </div>
      </section>
    </div>
  )
}
