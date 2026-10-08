import React, { useMemo, useState } from 'react'
import { KIDS, ENCOURAGEMENTS, ALL_DONE_MSG, JOURNAL_QUESTIONS, GRATITUDE } from '../data'
import {
  todayISO,
  addDays,
  fmtDate,
  getDone,
  setDone,
  completionRate,
  getJournal,
  saveJournal,
} from '../store'
import { Toast } from '../components/ui'

function Journal({ kid, iso }) {
  const [form, setForm] = useState(() => getJournal(kid.id, iso))
  const [savedTick, setSavedTick] = useState(0)

  // đổi ngày -> nạp lại nhật ký
  React.useEffect(() => {
    setForm(getJournal(kid.id, iso))
    setSavedTick(0)
  }, [kid.id, iso])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSave = () => {
    saveJournal(kid.id, iso, form)
    setSavedTick((t) => t + 1)
  }

  const fields = [...JOURNAL_QUESTIONS, GRATITUDE]

  return (
    <div className="journal">
      <div className="journal-head">
        <span className="journal-ico">🌙</span>
        <div>
          <div className="journal-title">Nhật ký cuối ngày</div>
          <div className="journal-sub">Viết ngắn gọn, thật lòng là được</div>
        </div>
      </div>
      {fields.map((f) => (
        <label key={f.key} className="field">
          <span className="field-label">{f.label}</span>
          <textarea
            className="field-input"
            rows={2}
            placeholder={f.ph}
            value={form[f.key] || ''}
            onChange={set(f.key)}
          />
        </label>
      ))}
      <button
        className="btn-primary"
        style={{ '--kid': kid.color, '--kid-deep': kid.deep }}
        onClick={onSave}
      >
        💾 Lưu nhật ký
      </button>
      {savedTick > 0 && (
        <div className="saved-note" key={savedTick}>
          ✓ Đã lưu — con làm rất tốt!
        </div>
      )}
    </div>
  )
}

export default function KidPage({ kidId }) {
  const kid = KIDS.find((k) => k.id === kidId) || KIDS[0]
  const today = todayISO()
  const [iso, setIso] = useState(today)
  const [tab, setTab] = useState('tasks')
  const [done, setDoneState] = useState(() => getDone(kid.id, today))
  const [toast, setToast] = useState({ msg: '', show: false, k: 0 })
  const timer = React.useRef(null)

  const rate = done.filter(Boolean).length / kid.tasks.length
  const isToday = iso === today
  const canNext = iso < today

  const pickDate = (next) => {
    setIso(next)
    setDoneState(getDone(kid.id, next))
  }

  const showToast = (msg) => {
    setToast((t) => ({ msg, show: true, k: t.k + 1 }))
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2200)
  }

  const toggle = (idx) => {
    const next = !done[idx]
    const arr = done.slice()
    arr[idx] = next
    setDoneState(arr)
    setDone(kid.id, iso, idx, next)
    if (next) {
      const finished = arr.filter(Boolean).length
      if (finished === kid.tasks.length) showToast(ALL_DONE_MSG)
      else showToast(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)])
    }
  }

  const dateLabel = useMemo(() => {
    if (isToday) return 'Hôm nay'
    if (iso === addDays(today, -1)) return 'Hôm qua'
    return fmtDate(iso)
  }, [iso, isToday, today])

  return (
    <div className="page" style={{ '--kid': kid.color, '--kid-soft': kid.soft, '--kid-deep': kid.deep }}>
      <header className="kid-hero">
        <a href="#/" className="back">
          ← Trang chủ
        </a>
        <div className="kid-hero-row">
          <div className="kid-ava big">
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
          <div>
            <h1 className="kid-page-title">Bảng của {kid.name}</h1>
            <div className="kid-tag">{kid.tagline}</div>
          </div>
        </div>
        <div className="date-nav">
          <button className="date-btn" onClick={() => pickDate(addDays(iso, -1))} aria-label="Ngày trước">
            ‹
          </button>
          <div className="date-label">
            <div className="date-main">{dateLabel}</div>
            <div className="date-sub">{fmtDate(iso)}</div>
          </div>
          <button
            className="date-btn"
            disabled={!canNext}
            onClick={() => pickDate(addDays(iso, 1))}
            aria-label="Ngày sau"
          >
            ›
          </button>
        </div>
      </header>

      <div className="seg">
        <button className={`seg-btn ${tab === 'tasks' ? 'on' : ''}`} onClick={() => setTab('tasks')}>
          ✅ Nhiệm vụ
        </button>
        <button className={`seg-btn ${tab === 'journal' ? 'on' : ''}`} onClick={() => setTab('journal')}>
          🌙 Nhật ký
        </button>
      </div>

      {tab === 'tasks' ? (
        <>
          <div className="card progress-card">
            <div className="progress-top">
              <span>
                Đã xong <b>{done.filter(Boolean).length}/{kid.tasks.length}</b>
              </span>
              <span className="progress-pct">{Math.round(rate * 100)}%</span>
            </div>
            <div className="bar">
              <div className="bar-fill" style={{ width: `${Math.round(rate * 100)}%` }} />
            </div>
            <div className="progress-hint">
              {rate === 1
                ? 'Hoàn hảo cho hôm nay! 🎉'
                : rate >= 0.5
                ? 'Đang tiến bộ rất tốt, cố thêm chút nữa nhé 💪'
                : 'Bắt đầu từ một dấu tick đầu tiên nhé 🌱'}
            </div>
          </div>

          <ul className="task-list">
            {kid.tasks.map((t, i) => (
              <li key={i}>
                <button
                  className={`task ${done[i] ? 'done' : ''}`}
                  onClick={() => toggle(i)}
                  aria-pressed={done[i]}
                >
                  <span className="check">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="task-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="task-text">{t}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Journal kid={kid} iso={iso} />
      )}

      <Toast key={toast.k} msg={toast.msg} show={toast.show} />
    </div>
  )
}
