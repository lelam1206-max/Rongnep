import React from 'react'

// Vòng tiến độ SVG
export function ProgressRing({ pct, color, size = 84, stroke = 9, track = '#F1E8DC', children }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, pct))
  return (
    <div className="ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset .6s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div className="ring-center">{children}</div>
    </div>
  )
}

// Thanh điều hướng dưới (mobile-first)
const TABS = [
  { hash: '#/', label: 'Trang chủ', icon: '🏠' },
  { hash: '#/be/rong', label: 'Rồng', icon: '🐉' },
  { hash: '#/be/nep', label: 'Nếp', icon: '🌸' },
  { hash: '#/tuan', label: 'Tuần', icon: '📊' },
  { hash: '#/nguyen-tac', label: 'Nguyên tắc', icon: '🌟' },
]

export function BottomNav({ route }) {
  const active = (h) => {
    if (h === '#/') return route === '' || route === '#/'
    return route.startsWith(h)
  }
  return (
    <nav className="bottom-nav">
      {TABS.map((t) => (
        <a key={t.hash} href={t.hash} className={`tab ${active(t.hash) ? 'on' : ''}`}>
          <span className="tab-ico">{t.icon}</span>
          <span className="tab-label">{t.label}</span>
        </a>
      ))}
    </nav>
  )
}

// Thông báo khích lệ nhỏ
export function Toast({ msg, show }) {
  return <div className={`toast ${show ? 'show' : ''}`}>{msg}</div>
}
