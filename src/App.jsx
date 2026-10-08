import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import KidPage from './pages/KidPage'
import WeekPage from './pages/WeekPage'
import PrinciplesPage from './pages/PrinciplesPage'
import { BottomNav } from './components/ui'
import './styles.css'

// Hash router đơn giản — phù hợp SPA tĩnh, không cần cấu hình server
function parseRoute(hash) {
  const h = hash || '#/'
  const m = h.match(/^#\/be\/(rong|nep)/)
  if (m) return { name: 'kid', kidId: m[1] }
  if (h.startsWith('#/tuan')) return { name: 'week' }
  if (h.startsWith('#/nguyen-tac')) return { name: 'principles' }
  return { name: 'home' }
}

export default function App() {
  const [hash, setHash] = useState(() => window.location.hash)
  const route = parseRoute(hash)

  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return (
    <div className="app">
      <div className="bg-decor" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <main className="shell">
        {route.name === 'home' && <Home />}
        {route.name === 'kid' && <KidPage key={route.kidId} kidId={route.kidId} />}
        {route.name === 'week' && <WeekPage />}
        {route.name === 'principles' && <PrinciplesPage />}
      </main>
      <BottomNav route={hash} />
    </div>
  )
}
