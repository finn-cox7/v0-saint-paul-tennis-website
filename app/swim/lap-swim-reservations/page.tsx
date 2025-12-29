"use client"

import { useMemo, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

type LaneId = 1 | 2 | 3 | 4 | 5
type Subslot = "A" | "B"
type Duration = 30 | 60
type BookingType = "single" | "full"
type BookingKey = `${LaneId}-${number}-${Subslot}`

interface BookingRecord {
  member: string
  lane: LaneId
  slotIndex: number
  subslot: Subslot | "A&B"
  duration: Duration
  bookingType: BookingType
  date: string // yyyy-mm-dd
}

interface BlockRecord {
  label: string
  laneIds: LaneId[]
  startSlot: number // slot index
  durationSlots: number // in 30-min slots
  date: string // yyyy-mm-dd
  blockType: "event" | "pool"
}

interface WeeklyEventTemplate {
  id: string
  label: string
  laneIds: LaneId[] | "all"
  weekday: number // 0 = Sun ... 6 = Sat
  startSlot: number // slot index
  durationSlots: number // in 30-min slots
}

const START_MINUTES = 6 * 60 // 06:00
const END_MINUTES = 21 * 60 // 21:00 (exclusive end)
const STEP = 30 // 30-minute slots
const LANES: LaneId[] = [1, 2, 3, 4, 5]
const SUBS: Subslot[] = ["A", "B"]

function minutesToLabel(m: number) {
  const hh = Math.floor(m / 60)
  const mm = m % 60
  const h12 = ((hh + 11) % 12) + 1
  const ampm = hh < 12 ? "AM" : "PM"
  return `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`
}

function buildSlots() {
  const out: { index: number; start: number; label: string }[] = []
  let idx = 0
  for (let t = START_MINUTES; t < END_MINUTES; t += STEP) {
    out.push({ index: idx++, start: t, label: minutesToLabel(t) })
  }
  return out // last start 20:30 (ends 21:00)
}
const SLOTS = buildSlots()

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

function timeToSlotIndex(hhmm: string): number | null {
  // expects "HH:MM" 24h from <input type="time">
  const [h, m] = hhmm.split(":").map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  const minutes = h * 60 + m
  if (minutes < START_MINUTES || minutes >= END_MINUTES) return null
  const delta = minutes - START_MINUTES
  if (delta % STEP !== 0) return null
  return delta / STEP // 0..(SLOTS.length-1)
}

export default function LapLaneBookingPage() {
  // --- Booking state ---
  const [date, setDate] = useState<string>(() => {
    const d = new Date()
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
    return iso
  })
  const [member, setMember] = useState("")
  const [duration, setDuration] = useState<Duration>(30)
  const [bookingType, setBookingType] = useState<BookingType>("single")
  const [bookingsByDate, setBookingsByDate] = useState<Record<string, Record<string, BookingRecord>>>({})
  const bookings = bookingsByDate[date] || {}

  // --- Blocks (one-off events / closures) ---
  const [blocksByDate, setBlocksByDate] = useState<Record<string, BlockRecord[]>>({})
  const [blockStart, setBlockStart] = useState("06:00") // HH:MM 24h
  const [blockDuration, setBlockDuration] = useState<number>(2) // in slots
  const [blockLabel, setBlockLabel] = useState<string>("Event")
  const [blockTarget, setBlockTarget] = useState<LaneId[] | "all">("all")

  // --- Weekly recurring templates (auto-applied by weekday) ---
  const [weeklyTemplates, setWeeklyTemplates] = useState<WeeklyEventTemplate[]>([])
  const [newWeekly, setNewWeekly] = useState<Partial<WeeklyEventTemplate>>({
    weekday: 1,
    startSlot: 0,
    durationSlots: 2,
    label: "Recurring Event",
    laneIds: "all",
  })

  // --- Mobile hour picker ---
  const [selectedHour, setSelectedHour] = useState<number>(6)

  const hourOptions = useMemo(() => {
    const seen = new Set<number>()
    SLOTS.forEach((s) => seen.add(Math.floor(s.start / 60)))
    return Array.from(seen)
  }, [])

  const filteredMobileSlots = useMemo(() => {
    return LANES.flatMap((lane) =>
      SUBS.flatMap((subslot) =>
        SLOTS.filter((s) => Math.floor(s.start / 60) === selectedHour).map((slot) => ({
          lane,
          subslot,
          slot,
        })),
      ),
    )
  }, [selectedHour, bookings, date, blocksByDate, weeklyTemplates])

  // ---- Helpers: booking & conflicts ----
  function key(lane: LaneId, slotIndex: number, subslot: Subslot): BookingKey {
    return `${lane}-${slotIndex}-${subslot}`
  }
  function isCellBooked(lane: LaneId, slotIndex: number, subslot: Subslot) {
    return bookings[key(lane, slotIndex, subslot)]
  }
  function getBlocksForDate(dateStr: string): BlockRecord[] {
    const oneOff = blocksByDate[dateStr] || []
    const recurring = getRecurringBlocksForDate(dateStr)
    // Merge (recurring last so it can appear with label; either can block)
    return [...oneOff, ...recurring]
  }
  function isCellBlocked(lane: LaneId, slotIndex: number, dateStr?: string): BlockRecord | undefined {
    const blocks = getBlocksForDate(dateStr ?? date)
    return blocks.find(
      (b) => b.laneIds.includes(lane) && slotIndex >= b.startSlot && slotIndex < b.startSlot + b.durationSlots,
    )
  }
  function canBook(
    lane: LaneId,
    slotIndex: number,
    subslot: Subslot,
    type: BookingType,
    dur: Duration,
  ): { ok: true } | { ok: false; reason: string } {
    const count = dur === 60 ? 2 : 1
    const needed: Array<[LaneId, number, Subslot | "A&B"]> = []
    for (let i = 0; i < count; i++) {
      const idx = slotIndex + i
      if (idx >= SLOTS.length) return { ok: false, reason: "Past 9pm" }
      if (type === "single") needed.push([lane, idx, subslot])
      else needed.push([lane, idx, "A&B"])
    }
    for (const [ln, si, ss] of needed) {
      if (ss === "A&B") {
        // full lane requires both cells free
        for (const s of SUBS) {
          if (bookings[key(ln, si, s)]) return { ok: false, reason: "Already booked" }
        }
      } else {
        if (bookings[key(ln, si, ss)]) return { ok: false, reason: "Already booked" }
      }
      if (isCellBlocked(ln, si)) return { ok: false, reason: "Blocked for event" }
    }
    return { ok: true }
  }
  function placeBooking(lane: LaneId, slotIndex: number, subslot: Subslot) {
    if (!member.trim()) {
      alert("Enter member name first")
      return
    }
    const check = canBook(lane, slotIndex, subslot, bookingType, duration)
    if (!check.ok) {
      alert(check.reason)
      return
    }
    const count = duration === 60 ? 2 : 1
    const updates: Record<string, BookingRecord> = {}
    for (let i = 0; i < count; i++) {
      const idx = slotIndex + i
      if (bookingType === "single") {
        updates[key(lane, idx, subslot)] = {
          member,
          lane,
          slotIndex: idx,
          subslot,
          duration,
          bookingType,
          date,
        }
      } else {
        for (const s of SUBS) {
          updates[key(lane, idx, s)] = {
            member,
            lane,
            slotIndex: idx,
            subslot: "A&B",
            duration,
            bookingType,
            date,
          }
        }
      }
    }
    setBookingsByDate((prev) => {
      const cur = { ...(prev[date] || {}) }
      Object.assign(cur, updates)
      return { ...prev, [date]: cur }
    })
  }
  function clearBooking(lane: LaneId, slotIndex: number, subslot: Subslot) {
    const b = isCellBooked(lane, slotIndex, subslot)
    if (!b) return
    setBookingsByDate((prev) => {
      const cur = { ...(prev[date] || {}) }
      delete cur[key(lane, slotIndex, subslot)]
      if (b.bookingType === "full") {
        const pair = subslot === "A" ? "B" : "A"
        delete cur[key(lane, slotIndex, pair)]
      }
      return { ...prev, [date]: cur }
    })
  }

  // ---- Blocks: create / derive ----
  function blockLanesForEvent(
    dateStr: string,
    startSlot: number,
    durationSlots: number,
    laneIds: LaneId[] | "all",
    label: string,
    type: "event" | "pool" = "event",
  ) {
    const targetLanes = laneIds === "all" ? LANES : laneIds
    const block: BlockRecord = {
      label,
      laneIds: targetLanes,
      startSlot: clamp(startSlot, 0, SLOTS.length - 1),
      durationSlots: Math.max(1, durationSlots),
      date: dateStr,
      blockType: type,
    }
    setBlocksByDate((prev) => {
      const cur = prev[dateStr] ? [...prev[dateStr]] : []
      cur.push(block)
      return { ...prev, [dateStr]: cur }
    })
  }

  // ---- Weekly templates (recurring every week) ----
  function getRecurringBlocksForDate(dateStr: string): BlockRecord[] {
    const d = new Date(dateStr + "T00:00:00")
    const weekday = d.getDay() // 0..6
    return weeklyTemplates
      .filter((tpl) => tpl.weekday === weekday)
      .map((tpl) => ({
        label: tpl.label,
        laneIds: tpl.laneIds === "all" ? LANES : tpl.laneIds,
        startSlot: clamp(tpl.startSlot, 0, SLOTS.length - 1),
        durationSlots: Math.max(1, tpl.durationSlots),
        date: dateStr,
        blockType: "event" as const,
      }))
  }

  const laneHeaders = useMemo(() => {
    const headers: Array<{ label: string }> = [{ label: "Time" }]
    for (const ln of LANES) {
      headers.push({ label: `Lane ${ln} • A` })
      headers.push({ label: `Lane ${ln} • B` })
    }
    return headers
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Lap Lane Reservations</h1>

          {/* --- Booking controls --- */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Member</label>
              <input
                type="text"
                value={member}
                onChange={(e) => setMember(e.target.value)}
                placeholder="Your name"
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value) as Duration)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Type</label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value as BookingType)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="single">Single swimmer (A or B)</option>
                <option value="full">Full lane (A & B)</option>
              </select>
            </div>
          </div>
{/* --- Weekly schedule templates (Add/Remove) --- */}
<div className="border rounded p-4 mb-6 bg-gray-50">
  <h2 className="font-semibold mb-3">Weekly Schedule (Repeats every week)</h2>
  <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-3">
    {/* Day selector */}
    <select
      value={newWeekly.weekday ?? 1}
      onChange={(e) => {
        const val = e.target.value
        setNewWeekly((x) => ({
          ...x,
          weekday: val === "weekdays" ? "weekdays" : Number(val),
        }))
      }}
      className="border rounded px-2 py-1"
    >
      <option value={0}>Sun</option>
      <option value={1}>Mon</option>
      <option value={2}>Tue</option>
      <option value={3}>Wed</option>
      <option value={4}>Thu</option>
      <option value={5}>Fri</option>
      <option value={6}>Sat</option>
      <option value="weekdays">Weekdays (Thurs)</option>
      <option value="weekends">Weekends (Fri-Sun)</option>
    </select>

    {/* Start slot */}
    <input
      type="number"
      min={0}
      max={SLOTS.length - 1}
      value={newWeekly.startSlot ?? 0}
      onChange={(e) => setNewWeekly((x) => ({ ...x, startSlot: Number(e.target.value) }))}
      className="border rounded px-2 py-1"
      placeholder="Start slot idx"
      title="0 = 6:00, 1 = 6:30, ... 30 = 21:00"
    />

    {/* Duration */}
    <input
      type="number"
      min={1}
      value={newWeekly.durationSlots ?? 2}
      onChange={(e) => setNewWeekly((x) => ({ ...x, durationSlots: Number(e.target.value) }))}
      className="border rounded px-2 py-1"
      placeholder="Duration (slots)"
    />

    {/* Lane selector */}
    <select
      value={Array.isArray(newWeekly.laneIds) ? (newWeekly.laneIds as LaneId[]).join(",") : "all"}
      onChange={(e) => {
        const val = e.target.value
        setNewWeekly((x) => ({
          ...x,
          laneIds: val === "all" ? "all" : (val.split(",").map(Number) as LaneId[]),
        }))
      }}
      className="border rounded px-2 py-1"
    >
      <option value="all">All lanes</option>
      <option value="1,2">1,2</option>
      <option value="3,4,5">3,4,5</option>
      <option value="2,3,4,5">2,3,4,5</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>

    {/* Label */}
    <input
      value={newWeekly.label ?? "Recurring Event"}
      onChange={(e) => setNewWeekly((x) => ({ ...x, label: e.target.value }))}
      className="border rounded px-2 py-1"
      placeholder="Label"
    />

    {/* Add button */}
    <button
      onClick={() => {
        const w = newWeekly

        // Validate fields
        if (w.weekday === undefined || w.startSlot == null || w.durationSlots == null || !w.label) {
          alert("Fill all fields for weekly event.")
          return
        }

        // Special case: Weekdays (Mon–Thurs)
        if (w.weekday === "weekdays") {
          const days = [1, 2, 3, 4] // Mon-Thurs
          setWeeklyTemplates((prev) => [
            ...prev,
            ...days.map((d) => ({
              id: Math.random().toString(36).slice(2),
              label: w.label!,
              laneIds: w.laneIds ?? "all",
              weekday: d,
              startSlot: clamp(Number(w.startSlot), 0, SLOTS.length - 1),
              durationSlots: Math.max(1, Number(w.durationSlots)),
            })),
          ])
          return
        }

        //Special case: Weekends (Fri-Sun
        if (w.weekday === "weekends") {
          const days = [5, 6, 0] // Fri-Sun
          setWeeklyTemplates((prev) => [
            ...prev,
            ...days.map((d) => ({
              id: Math.random().toString(36).slice(2),
              label: w.label!,
              laneIds: w.laneIds ?? "all",
              weekday: d,
              startSlot: clamp(Number(w.startSlot), 0, SLOTS.length - 1),
              durationSlots: Math.max(1, Number(w.durationSlots)),
            })),
          ])
          return
        }

        // Single day event
        setWeeklyTemplates((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).slice(2),
            label: w.label!,
            laneIds: w.laneIds ?? "all",
            weekday: Number(w.weekday),
            startSlot: clamp(Number(w.startSlot), 0, SLOTS.length - 1),
            durationSlots: Math.max(1, Number(w.durationSlots)),
          },
        ])
      }}
      style={{ backgroundColor: "#5a7d5d" }}
      className="text-white px-3 py-1 rounded hover:opacity-90"
    >
      Add
    </button>
  </div>

  {/* List of weekly templates */}
  <ul className="text-sm divide-y">
    {weeklyTemplates.map((tpl) => (
      <li key={tpl.id} className="py-2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][tpl.weekday]} • {tpl.label}
          </span>
          <span className="text-muted-foreground">
            Slots {tpl.startSlot}-{tpl.startSlot + tpl.durationSlots} •{" "}
            {tpl.laneIds === "all" ? "All lanes" : `Lanes ${(tpl.laneIds as LaneId[]).join(",")}`}
          </span>
        </div>
        <button
          onClick={() => setWeeklyTemplates((prev) => prev.filter((w) => w.id !== tpl.id))}
          className="text-red-600 hover:underline text-xs"
        >
          remove
        </button>
      </li>
    ))}
    {weeklyTemplates.length === 0 && (
      <li className="py-2 text-muted-foreground">No weekly events yet. Add one above.</li>
    )}
  </ul>
</div>

          {/* --- Manual one-off block UI --- */}
          <div className="border rounded p-4 mb-6 bg-gray-50">
            <h2 className="font-semibold mb-2">Block Pool / Lanes (one-off)</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
              <div>
                <label className="text-xs block mb-1">Start time</label>
                <input
                  type="time"
                  value={blockStart}
                  onChange={(e) => setBlockStart(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="text-xs block mb-1">Duration (slots)</label>
                <input
                  type="number"
                  min={1}
                  value={blockDuration}
                  onChange={(e) => setBlockDuration(Number(e.target.value))}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="text-xs block mb-1">Label</label>
                <input
                  type="text"
                  value={blockLabel}
                  onChange={(e) => setBlockLabel(e.target.value)}
                  className="border rounded px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="text-xs block mb-1">Target lanes</label>
                <select
                  value={Array.isArray(blockTarget) ? blockTarget.join(",") : "all"}
                  onChange={(e) =>
                    setBlockTarget(
                      e.target.value === "all" ? "all" : (e.target.value.split(",").map(Number) as LaneId[]),
                    )
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="all">All lanes (Pool)</option>
                  <option value="1,2,3,4,5">1,2,3,4,5</option>
                  <option value="1,2">1,2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const startIndex = timeToSlotIndex(blockStart)
                    if (startIndex === null) {
                      alert("Start time must align to a 30-minute slot between 06:00 and 21:00.")
                      return
                    }
                    blockLanesForEvent(
                      date,
                      startIndex,
                      Math.max(1, blockDuration),
                      blockTarget,
                      blockLabel,
                      Array.isArray(blockTarget) ? "event" : "pool",
                    )
                  }}
                  style={{ backgroundColor: "#5a7d5d" }}
                  className="text-white px-4 py-2 rounded w-full hover:opacity-90"
                >
                  Block
                </button>
              </div>
            </div>
          </div>

          {/* --- Mobile hour sort view --- */}
          <div className="block md:hidden mb-6">
            <label className="block text-sm font-medium mb-2">Select Hour</label>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {`${h === 12 ? 12 : h % 12}:00 ${h < 12 ? "AM" : "PM"}`}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-3 gap-2">
              {filteredMobileSlots.map(({ lane, subslot, slot }) => {
                const blocked = isCellBlocked(lane, slot.index) || isCellBlocked(lane, slot.index, date) // explicit date
                if (blocked) {
                  return (
                    <div
                      key={`${lane}-${subslot}-${slot.index}`}
                      className="rounded border text-xs h-10 bg-gray-300 flex items-center justify-center text-center px-1"
                      title={`Blocked: ${blocked.label}`}
                    >
                      {blocked.blockType === "pool" ? "POOL CLOSED" : blocked.label}
                    </div>
                  )
                }
                const booked = isCellBooked(lane, slot.index, subslot)
                return (
                  <button
                    key={`${lane}-${subslot}-${slot.index}`}
                    onClick={() =>
                      booked ? clearBooking(lane, slot.index, subslot) : placeBooking(lane, slot.index, subslot)
                    }
                    className={[
                      "rounded border text-xs h-10 flex flex-col justify-center items-center",
                      booked ? "bg-rose-100 border-rose-300" : "bg-gray-50 hover:bg-gray-100",
                    ].join(" ")}
                    title={booked ? `${booked.member}` : "Tap to book"}
                  >
                    <span className="font-semibold">{slot.label}</span>
                    <span>{`Lane ${lane}${subslot}`}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* --- Desktop full grid --- */}
          <div className="hidden md:block overflow-auto border rounded-lg">
            <table className="min-w-[920px] w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  {laneHeaders.map((h, i) => (
                    <th key={i} className="text-left text-xs font-semibold px-3 py-2 border-b">
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot) => (
                  <tr key={slot.index} className="border-b">
                    {/* Time */}
                    <td className="px-3 py-2 text-sm font-medium whitespace-nowrap">{slot.label}</td>
                    {/* Cells */}
                    {LANES.flatMap((ln) =>
                      SUBS.map((ss) => {
                        const blocked = isCellBlocked(ln, slot.index)
                        if (blocked) {
                          return (
                            <td key={`${ln}-${ss}`} className="p-1">
                              <div
                                className="w-full h-10 rounded border text-xs bg-gray-300 text-center flex items-center justify-center font-semibold"
                                title={`Blocked: ${blocked.label}`}
                              >
                                {blocked.blockType === "pool" ? "POOL CLOSED" : blocked.label}
                              </div>
                            </td>
                          )
                        }
                        const booked = isCellBooked(ln, slot.index, ss)
                        return (
                          <td key={`${ln}-${ss}`} className="p-1">
                            <button
                              onClick={() =>
                                booked ? clearBooking(ln, slot.index, ss) : placeBooking(ln, slot.index, ss)
                              }
                              className={[
                                "w-full h-10 rounded border text-xs",
                                booked ? "bg-rose-100 border-rose-300" : "bg-gray-50 hover:bg-gray-100 border-gray-300",
                              ].join(" ")}
                              title={
                                booked
                                  ? `${booked.member} • ${
                                      booked.bookingType === "full" ? "Full lane" : "Single"
                                    } • ${booked.duration}m`
                                  : "Click to book"
                              }
                            >
                              {booked
                                ? booked.bookingType === "full"
                                  ? `${booked.member} • Full`
                                  : `${booked.member}`
                                : `${ln}${ss}`}
                            </button>
                          </td>
                        )
                      }),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Demo data is in-memory per date. Hook these actions to an API/DB (e.g., Supabase, Vercel Postgres, or KV) to
            persist across users and devices.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
