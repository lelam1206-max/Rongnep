// Tầng lưu trữ localStorage — key prefix rongnep_v1, theo từng bé + từng ngày
import { KIDS, GOOD_DAY_THRESHOLD } from './data'

const PREFIX = 'rongnep_v1'

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value))
  } catch {
    // bộ nhớ đầy hoặc bị chặn — bỏ qua lặng lẽ
  }
}

// ---- Ngày tháng (giờ địa phương) ----
export function toISODate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

export function todayISO() {
  return toISODate(new Date())
}

export function addDays(iso, n) {
  const d = new Date(iso + 'T12:00:00')
  d.setDate(d.getDate() + n)
  return toISODate(d)
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export function fmtDate(iso) {
  const d = new Date(iso + 'T12:00:00')
  return `${WEEKDAYS[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}/${String(
    d.getMonth() + 1
  ).padStart(2, '0')}`
}

export function fmtDayShort(iso) {
  const d = new Date(iso + 'T12:00:00')
  return {
    wd: WEEKDAYS[d.getDay()],
    dm: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
  }
}

// ---- Nhiệm vụ ----
export function getDone(kidId, iso) {
  const arr = read(`tasks:${kidId}:${iso}`, [])
  const kid = KIDS.find((k) => k.id === kidId)
  const n = kid ? kid.tasks.length : 10
  const done = new Array(n).fill(false)
  arr.forEach((v, i) => {
    if (i < n) done[i] = !!v
  })
  return done
}

export function setDone(kidId, iso, idx, val) {
  const done = getDone(kidId, iso)
  done[idx] = val
  write(`tasks:${kidId}:${iso}`, done)
}

export function doneCount(kidId, iso) {
  return getDone(kidId, iso).filter(Boolean).length
}

export function completionRate(kidId, iso) {
  const kid = KIDS.find((k) => k.id === kidId)
  const n = kid ? kid.tasks.length : 10
  return n === 0 ? 0 : doneCount(kidId, iso) / n
}

// Chuỗi ngày duy trì: số ngày liên tiếp (tính từ hôm nay, hoặc hôm qua nếu hôm nay chưa đạt)
// mà mỗi ngày hoàn thành >= GOOD_DAY_THRESHOLD
export function streakDays(kidId) {
  let d = todayISO()
  if (completionRate(kidId, d) < GOOD_DAY_THRESHOLD) d = addDays(d, -1)
  let s = 0
  while (completionRate(kidId, d) >= GOOD_DAY_THRESHOLD) {
    s += 1
    d = addDays(d, -1)
    if (s > 3650) break
  }
  return s
}

export function last7Days() {
  const t = todayISO()
  return Array.from({ length: 7 }, (_, i) => addDays(t, i - 6))
}

// ---- Nhật ký ----
export function getJournal(kidId, iso) {
  return read(`journal:${kidId}:${iso}`, { good: '', notGood: '', tomorrow: '', gratitude: '' })
}

export function saveJournal(kidId, iso, data) {
  write(`journal:${kidId}:${iso}`, data)
}

export function journalFilled(kidId, iso) {
  const j = getJournal(kidId, iso)
  return [j.good, j.notGood, j.tomorrow, j.gratitude].some((v) => (v || '').trim().length > 0)
}
