"use client"

import { useMemo, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

type CourtId = 1 | 2 | 3 | 4
type Duration = 60 | 90
type BookingType = "singles" | "doubles"
type BookingKey = `${CourtId}-${number}`

interface BookingRecord {
  member: string
  court: CourtId
  slotIndex: number
  duration: Duration
  bookingType: BookingType
  date: string
}

interface BlockRecord {
  label: string
  courtIds: CourtId[]
  startSlot: number
  durationSlots: number
  date: string
  blockType: "lesson" | "clinic" | "tournament" | "maintenance"
}

interface WeeklyEventTemplate {
  id: string
  label: string
  courtIds: CourtId[] | "all"
  weekday: number
  startSlot: number
  durationSlots: number
}

const START_MINUTES = 7.5 * 60 // 07:30
const END_MINUTES = 21 * 60 // 21:00
const STEP = 30
const COURTS: CourtId[] = [1, 2, 3, 4]

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
  return out
}
const SLOTS = buildSlots()

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n))
}

function timeToSlotIndex(hhmm: string): number | null {
  const [h, m] = hhmm.split(":").map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return null
  const minutes = h * 60 + m
  if (minutes < START_MINUTES || minutes >= END_MINUTES) return null
  const delta = minutes - START_MINUTES
  if (delta % STEP !== 0) return null
  return delta / STEP
}

export default function TennisCourtReservationsPage() {
  const [date, setDate] = useState<string>(() => {
    const d = new Date()
    const iso = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
    return iso
  })
  const [member, setMember] = useState("")
  const [duration, setDuration] = useState<Duration>(60)
  const [bookingType, setBookingType] = useState<BookingType>("doubles")
  const [bookingsByDate, setBookingsByDate] = useState<Record<string, Record<string, BookingRecord>>>({})
  const bookings = bookingsByDate[date] || {}

  const [blocksByDate, setBlocksByDate] = useState<Record<string, BlockRecord[]>>({})
  const [blockStart, setBlockStart] = useState("07:30")
  const [blockDuration, setBlockDuration] = useState<number>(3)
  const [blockLabel, setBlockLabel] = useState<string>("Private Lesson")
  const [blockTarget, setBlockTarget] = useState<CourtId[] | "all">([4])

  const [weeklyTemplates, setWeeklyTemplates] = useState<WeeklyEventTemplate[]>([])
  const [newWeekly, setNewWeekly] = useState<Partial<WeeklyEventTemplate>>({
    weekday: 1,
    startSlot: 0,
    durationSlots: 3,
    label: "Clinic",
    courtIds: [4],
  })

  const [selectedHour, setSelectedHour] = useState<number>(8)

  const hourOptions = useMemo(() => {
    const seen = new Set<number>()
    SLOTS.forEach((s) => seen.add(Math.floor(s.start / 60)))
    return Array.from(seen)
  }, [])

  const filteredMobileSlots = useMemo(() => {
    return COURTS.flatMap((court) =>
      SLOTS.filter((s) => Math.floor(s.start / 60) === selectedHour).map((slot) => ({
        court,
        slot,
      })),
    )
  }, [selectedHour])

  function key(court: CourtId, slotIndex: number): BookingKey {
    return `${court}-${slotIndex}`
  }

  function isCellBooked(court: CourtId, slotIndex: number) {
    return bookings[key(court, slotIndex)]
  }

  function getBlocksForDate(dateStr: string): BlockRecord[] {
    const oneOff = blocksByDate[dateStr] || []
    const recurring = getRecurringBlocksForDate(dateStr)
    return [...oneOff, ...recurring]
  }

  function isCellBlocked(court: CourtId, slotIndex: number, dateStr?: string): BlockRecord | undefined {
    const blocks = getBlocksForDate(dateStr ?? date)
    return blocks.find(
      (b) => b.courtIds.includes(court) && slotIndex >= b.startSlot && slotIndex < b.startSlot + b.durationSlots,
    )
  }

  function canBook(
    court: CourtId,
    slotIndex: number,
    dur: Duration,
  ): { ok: true } | { ok: false; reason: string } {
    const count = dur === 90 ? 3 : 2
    for (let i = 0; i < count; i++) {
      const idx = slotIndex + i
      if (idx >= SLOTS.length) return { ok: false, reason: "Past closing time" }
      if (bookings[key(court, idx)]) return { ok: false, reason: "Court already booked" }
      if (isCellBlocked(court, idx)) return { ok: false, reason: "Blocked for event" }
    }
    return { ok: true }
  }

  function placeBooking(court: CourtId, slotIndex: number) {
    if (!member.trim()) {
      alert("Enter member name first")
      return
    }
    const check = canBook(court, slotIndex, duration)
    if (!check.ok) {
      alert(check.reason)
      return
    }
    const count = duration === 90 ? 3 : 2
    const updates: Record<string, BookingRecord> = {}
    for (let i = 0; i < count; i++) {
      const idx = slotIndex + i
      updates[key(court, idx)] = {
        member,
        court,
        slotIndex: idx,
        duration,
        bookingType,
        date,
      }
    }
    setBookingsByDate((prev) => {
      const cur = { ...(prev[date] || {}) }
      Object.assign(cur, updates)
      return { ...prev, [date]: cur }
    })
  }

  function clearBooking(court: CourtId, slotIndex: number) {
    const b = isCellBooked(court, slotIndex)
    if (!b) return
    const count = b.duration === 90 ? 3 : 2
    setBookingsByDate((prev) => {
      const cur = { ...(prev[date] || {}) }
      for (let i = 0; i < SLOTS.length; i++) {
        if (cur[key(court, i)]?.member === b.member && cur[key(court, i)]?.slotIndex !== undefined) {
          delete cur[key(court, i)]
        }
      }
      return { ...prev, [date]: cur }
    })
  }

  function blockCourtsForEvent(
    dateStr: string,
    startSlot: number,
    durationSlots: number,
    courtIds: CourtId[] | "all",
    label: string,
    type: "lesson" | "clinic" | "tournament" | "maintenance" = "lesson",
  ) {
    const targetCourts = courtIds === "all" ? COURTS : courtIds
    const block: BlockRecord = {
      label,
      courtIds: targetCourts,
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

  function getRecurringBlocksForDate(dateStr: string): BlockRecord[] {
    const d = new Date(dateStr + "T00:00:00")
    const weekday = d.getDay()
    return weeklyTemplates
      .filter((tpl) => tpl.weekday === weekday)
      .map((tpl) => ({
        label: tpl.label,
        courtIds: tpl.courtIds === "all" ? COURTS : tpl.courtIds,
        startSlot: clamp(tpl.startSlot, 0, SLOTS.length - 1),
        durationSlots: Math.max(1, tpl.durationSlots),
        date: dateStr,
        blockType: "clinic" as const,
      }))
  }

  const courtHeaders = useMemo(() => {
    const headers: Array<{ label: string }> = [{ label: "Time" }]
    for (const ct of COURTS) {
      headers.push({ label: `Court ${ct}` })
    }
    return headers
  }, [])

  const maxDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + 3)
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  }, [])

  const minDate = useMemo(() => {
    const d = new Date()
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Court Reservations</h1>
          <p className="text-muted-foreground mb-6">
            Reserve a court up to 3 days in advance. Maximum 1.5 hours per reservation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                min={minDate}
                max={maxDate}
                onChange={(e) => setDate(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Member Name</label>
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
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes (max)</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Play Type</label>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value as BookingType)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="singles">Singles</option>
                <option value="doubles">Doubles</option>
              </select>
            </div>
          </div>

          <div className="border rounded p-4 mb-6 bg-gray-50">
            <h2 className="font-semibold mb-3">Weekly Schedule (Repeats every week)</h2>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 mb-3">
              <select
                value={newWeekly.weekday ?? 1}
                onChange={(e) => setNewWeekly((x) => ({ ...x, weekday: Number(e.target.value) }))}
                className="border rounded px-2 py-1"
              >
                <option value={0}>Sun</option>
                <option value={1}>Mon</option>
                <option value={2}>Tue</option>
                <option value={3}>Wed</option>
                <option value={4}>Thu</option>
                <option value={5}>Fri</option>
                <option value={6}>Sat</option>
              </select>

              <input
                type="number"
                min={0}
                max={SLOTS.length - 1}
                value={newWeekly.startSlot ?? 0}
                onChange={(e) => setNewWeekly((x) => ({ ...x, startSlot: Number(e.target.value) }))}
                className="border rounded px-2 py-1"
                placeholder="Start slot"
                title="0 = 7:30, 1 = 8:00, etc."
              />

              <input
                type="number"
                min={1}
                value={newWeekly.durationSlots ?? 3}
                onChange={(e) => setNewWeekly((x) => ({ ...x, durationSlots: Number(e.target.value) }))}
                className="border rounded px-2 py-1"
                placeholder="Duration (slots)"
              />

              <select
                value={Array.isArray(newWeekly.courtIds) ? (newWeekly.courtIds as CourtId[]).join(",") : "all"}
                onChange={(e) => {
                  const val = e.target.value
                  setNewWeekly((x) => ({
                    ...x,
                    courtIds: val === "all" ? "all" : (val.split(",").map(Number) as CourtId[]),
                  }))
                }}
                className="border rounded px-2 py-1"
              >
                <option value="all">All courts</option>
                <option value="4">Court 4 (Pro)</option>
                <option value="1,2">Courts 1-2</option>
                <option value="3,4">Courts 3-4</option>
                <option value="1">Court 1</option>
                <option value="2">Court 2</option>
                <option value="3">Court 3</option>
              </select>

              <input
                value={newWeekly.label ?? "Clinic"}
                onChange={(e) => setNewWeekly((x) => ({ ...x, label: e.target.value }))}
                className="border rounded px-2 py-1"
                placeholder="Label"
              />

              <button
                onClick={() => {
                  const w = newWeekly
                  if (w.weekday === undefined || w.startSlot == null || w.durationSlots == null || !w.label) {
                    alert("Fill all fields for weekly event.")
                    return
                  }
                  setWeeklyTemplates((prev) => [
                    ...prev,
                    {
                      id: Math.random().toString(36).slice(2),
                      label: w.label!,
                      courtIds: w.courtIds ?? "all",
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

            <ul className="text-sm divide-y">
              {weeklyTemplates.map((tpl) => (
                <li key={tpl.id} className="py-2 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][tpl.weekday]} • {tpl.label}
                    </span>
                    <span className="text-muted-foreground">
                      Slots {tpl.startSlot}-{tpl.startSlot + tpl.durationSlots} •{" "}
                      {tpl.courtIds === "all" ? "All courts" : `Court(s) ${(tpl.courtIds as CourtId[]).join(",")}`}
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

          <div className="border rounded p-4 mb-6 bg-gray-50">
            <h2 className="font-semibold mb-2">Block Court(s) (one-off)</h2>
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
                <label className="text-xs block mb-1">Target courts</label>
                <select
                  value={Array.isArray(blockTarget) ? blockTarget.join(",") : "all"}
                  onChange={(e) =>
                    setBlockTarget(
                      e.target.value === "all" ? "all" : (e.target.value.split(",").map(Number) as CourtId[]),
                    )
                  }
                  className="border rounded px-2 py-1 w-full"
                >
                  <option value="all">All courts</option>
                  <option value="4">Court 4 (Pro)</option>
                  <option value="1,2,3,4">All courts</option>
                  <option value="1,2">Courts 1-2</option>
                  <option value="3,4">Courts 3-4</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    const startIndex = timeToSlotIndex(blockStart)
                    if (startIndex === null) {
                      alert("Start time must align to a 30-minute slot between 7:30 AM and 9:00 PM.")
                      return
                    }
                    blockCourtsForEvent(
                      date,
                      startIndex,
                      Math.max(1, blockDuration),
                      blockTarget,
                      blockLabel,
                      "lesson",
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

          <div className="block md:hidden mb-6">
            <label className="block text-sm font-medium mb-2">Select Hour</label>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
              className="w-full border rounded px-3 py-2 mb-4"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {`${h === 12 ? 12 : h % 12}:${h === 7 ? "30" : "00"} ${h < 12 ? "AM" : "PM"}`}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-2">
              {filteredMobileSlots.map(({ court, slot }) => {
                const blocked = isCellBlocked(court, slot.index)
                if (blocked) {
                  return (
                    <div
                      key={`${court}-${slot.index}`}
                      className="rounded border text-xs h-16 bg-gray-300 flex items-center justify-center text-center px-1 font-semibold"
                      title={`Blocked: ${blocked.label}`}
                    >
                      {blocked.label}
                    </div>
                  )
                }
                const booked = isCellBooked(court, slot.index)
                return (
                  <button
                    key={`${court}-${slot.index}`}
                    onClick={() =>
                      booked ? clearBooking(court, slot.index) : placeBooking(court, slot.index)
                    }
                    className={[
                      "rounded border text-xs h-16 flex flex-col justify-center items-center",
                      booked ? "bg-rose-100 border-rose-300" : "bg-gray-50 hover:bg-gray-100",
                    ].join(" ")}
                    title={booked ? `${booked.member}` : "Tap to book"}
                  >
                    <span className="font-semibold">{slot.label}</span>
                    <span>Court {court}</span>
                    {booked && <span className="text-rose-600">{booked.member}</span>}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="hidden md:block overflow-auto border rounded-lg">
            <table className="min-w-[600px] w-full border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  {courtHeaders.map((h, i) => (
                    <th key={i} className="text-left text-xs font-semibold px-3 py-2 border-b">
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLOTS.map((slot) => (
                  <tr key={slot.index} className="border-b">
                    <td className="px-3 py-2 text-sm font-medium whitespace-nowrap">{slot.label}</td>
                    {COURTS.map((ct) => {
                      const blocked = isCellBlocked(ct, slot.index)
                      if (blocked) {
                        return (
                          <td key={ct} className="p-1">
                            <div
                              className="w-full h-10 rounded border text-xs bg-gray-300 text-center flex items-center justify-center font-semibold"
                              title={`Blocked: ${blocked.label}`}
                            >
                              {blocked.label}
                            </div>
                          </td>
                        )
                      }
                      const booked = isCellBooked(ct, slot.index)
                      return (
                        <td key={ct} className="p-1">
                          <button
                            onClick={() =>
                              booked ? clearBooking(ct, slot.index) : placeBooking(ct, slot.index)
                            }
                            className={[
                              "w-full h-10 rounded border text-xs",
                              booked ? "bg-rose-100 border-rose-300" : "bg-gray-50 hover:bg-gray-100 border-gray-300",
                            ].join(" ")}
                            title={
                              booked
                                ? `${booked.member} • ${booked.bookingType} • ${booked.duration}m`
                                : "Click to book"
                            }
                          >
                            {booked ? `${booked.member}` : `Ct ${ct}`}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-semibold mb-2">Court Rules Reminder</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Maximum 1.5 hours per reservation</li>
              <li>• Courts close 3:30–4:00 PM for grooming</li>
              <li>• Court 4 has priority for tennis pro instruction</li>
              <li>• Unused court becomes available 15 minutes after reserved start time</li>
              <li>• Guest fee: $15 + tax</li>
            </ul>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            Demo data is in-memory per date. Connect to Supabase or similar backend to persist across users and devices.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
