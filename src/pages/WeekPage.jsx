import React from 'react'
import { KIDS } from '../data'
import { last7Days, fmtDayShort, completionRate, doneCount, todayISO } from '../store'

export default function WeekPage() {
  const days = last7Days()
  return (
    <div className="page">
      <header className="page-head">
        <h1 className="page-title">📊 Tổng quan tuần</h1>
        <p className="page-sub">7 ngày gần nhất · tỉ lệ hoàn thành mỗi bé</p>
      </header>

      <div className="week-list">
        {[...days].reverse().map((iso) => {
          const { wd, dm } = fmtDayShort(iso)
          const isToday = iso === todayISO()
          return (
            <div key={iso} className={`card week-day ${isToday ? 'today' : ''}`}>
              <div className="week-day-head">
                <span className="week-wd">{wd}</span>
                <span className="week-dm">{dm}</span>
                {isToday && <span className="today-badge">Hôm nay</span>}
              </div>
              {KIDS.map((kid) => {
                const rate = completionRate(kid.id, iso)
                const done = doneCount(kid.id, iso)
                return (
                  <div key={kid.id} className="week-row">
                    <span className="week-kid" style={{ color: kid.deep }}>
                      {kid.emoji} {kid.name}
                    </span>
                    <div className="bar slim">
                      <div
                        className="bar-fill"
                        style={{ width: `${Math.round(rate * 100)}%`, background: kid.color }}
                      />
                    </div>
                    <span className="week-pct">
                      {done}/{kid.tasks.length}
                    </span>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <section className="card tip-card">
        <div className="tip-title">🔥 Cách tính chuỗi ngày</div>
        <p className="tip-text">
          Một ngày được tính là “ngày tốt” khi hoàn thành từ 8/10 nhiệm vụ trở lên. Chuỗi ngày duy trì
          đếm số ngày tốt liên tiếp gần nhất — không cần hoàn hảo, chỉ cần đều đặn.
        </p>
      </section>
    </div>
  )
}
