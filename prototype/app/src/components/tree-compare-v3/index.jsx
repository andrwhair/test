import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@fs/zion-ui'
import s from './styles.module.css'
import malePng from './male.png'
import femalePng from './female.png'

// ============================================================
// DATA — Wendy Sheley as focus person
// ============================================================

const myTree = {
  'gp-pat-hus': { name: 'David Edwin Sheley', dates: '1848-1918', pid: 'LZ6W-RP4', gender: 'male' },
  'gp-pat-wife': { name: 'Ray Norene Orner', dates: '1852-1924', pid: 'LL38-H2C', gender: 'female' },
  'gp-mat-hus': { name: 'Alfred William Hamling', dates: '1845-1910', pid: 'KWC2-PRP', gender: 'male' },
  'gp-mat-wife': { name: 'Margaret Neva Wright', dates: '1850-1928', pid: 'KWC2-PR2', gender: 'female' },
  'par-hus': { name: 'Darryl Kent Sheley', dates: '1875-1948', pid: 'LNHY-RMP', gender: 'male' },
  'par-wife': { name: 'Mary Sue Hamling', dates: '1878-1955', pid: 'LNHY-RTY', gender: 'female' },
  focus: { name: 'Wendy Michelle Sheley', dates: '1902-1975', pid: 'LNHY-R4L', gender: 'female' },
  'focus-spouse': { name: 'Andrew Dale Hair', dates: '1898-1962', pid: 'KW4Y-36B', gender: 'male' },
  'sib-holly': { name: 'Holly Anne Sheley', dates: '1899-1968', pid: 'LB3V-14J', gender: 'female' },
  'sib-david': { name: 'David Sheley', dates: '1901-1972', pid: 'LB3K-4XF', gender: 'male' },
  'sib-julie': { name: 'Julie Kay Sheley', dates: '1905-1981', pid: 'LB3V-R1F', gender: 'female' },
  'child-brian': { name: 'Brian Andrew Hair', dates: '1924-1998', pid: 'LNHY-R3R', gender: 'male' },
  'child-sarah': { name: 'Sarah Halloway', dates: '1927-2001', pid: 'GHLD-MQZ', gender: 'female' },
  'child-zachary': { name: 'Zachary Kent Hair', dates: '1926-2005', pid: 'LNHY-RKR', gender: 'male' },
  'child-anna': { name: 'Anna Deakin', dates: '1930-2008', pid: 'G48M-QLQ', gender: 'female' },
  'child-landon': { name: 'Landon Joseph Hair', dates: '1928-2010', pid: 'LNHY-R5K', gender: 'male' },
  'child-samuel': { name: 'Samuel Dale Hair', dates: '1930-2012', pid: 'LNHY-R78', gender: 'male' },
  'child-ammon': { name: 'Ammon William Hair', dates: '1932-2015', pid: 'LNHY-RVR', gender: 'male' },
  'child-elizabeth': { name: 'Elizabeth Rae Hair', dates: '1935-2018', pid: 'LNHY-RDN', gender: 'female' },
  'child-luke': { name: 'Luke David Hair', dates: '1938-2019', pid: 'LNHY-RS7', gender: 'male' },
  'child-simon': { name: 'Simon Hudson Hair', dates: '1938-2022', pid: 'LNHY-5BB', gender: 'male' },
}

const fsTree = {
  'gp-pat-hus': { name: 'David E. Sheley', dates: '1848-1918', pid: 'USR-101', gender: 'male' },
  'gp-pat-wife': { name: 'Ray N. Orner', dates: '1852-1924', pid: 'USR-102', gender: 'female' },
  'gp-mat-hus': { name: 'Alfred W. Hamling', dates: '1845-1910', pid: 'USR-103', gender: 'male' },
  'gp-mat-wife': { name: 'Margaret N. Wright', dates: '1850-1928', pid: 'USR-104', gender: 'female' },
  'par-hus': { name: 'Darryl Kent Sheley', dates: '1875-1948', pid: 'USR-105', gender: 'male' },
  'par-wife': { name: 'Mary Sue Hamling', dates: '1878-1955', pid: 'USR-106', gender: 'female' },
  focus: { name: 'Wendy M. Sheley', dates: '1902-1975', pid: 'USR-107', gender: 'female' },
  'focus-spouse': { name: 'Andrew Dale Hair', dates: '1898-1962', pid: 'USR-108', gender: 'male' },
  'sib-holly': { name: 'Holly A. Sheley', dates: '1899-1968', pid: 'USR-109', gender: 'female' },
  'sib-david': { name: 'David Sheley', dates: '1901-1972', pid: 'USR-110', gender: 'male' },
  'sib-julie': { name: 'Julie K. Sheley', dates: '1905-1981', pid: 'USR-111', gender: 'female' },
  'child-brian': { name: 'Brian A. Hair', dates: '1924-1998', pid: 'USR-112', gender: 'male' },
  'child-sarah': { name: 'Sarah Halloway', dates: '1927-2001', pid: 'USR-113', gender: 'female' },
  'child-zachary': { name: 'Zachary K. Hair', dates: '1926-2005', pid: 'USR-114', gender: 'male' },
  'child-anna': { name: 'Anna Deakin', dates: '1930-2008', pid: 'USR-115', gender: 'female' },
  'child-landon': { name: 'Landon J. Hair', dates: '1928-2010', pid: 'USR-116', gender: 'male' },
  'child-samuel': { name: 'Samuel D. Hair', dates: '1930-2012', pid: 'USR-117', gender: 'male' },
  'child-ammon': { name: 'Ammon W. Hair', dates: '1932-2015', pid: 'USR-118', gender: 'male' },
  'child-elizabeth': { name: 'Elizabeth R. Hair', dates: '1935-2018', pid: 'USR-119', gender: 'female' },
  'child-luke': { name: 'Luke D. Hair', dates: '1938-2019', pid: 'USR-120', gender: 'male' },
  'child-simon': { name: 'Simon H. Hair', dates: '1938-2022', pid: 'USR-121', gender: 'male' },
}

const matches = {
  'gp-pat-hus': 'gp-pat-hus',
  'gp-pat-wife': 'gp-pat-wife',
  'gp-mat-hus': 'gp-mat-hus',
  'gp-mat-wife': 'gp-mat-wife',
  'par-hus': 'par-hus',
  'par-wife': 'par-wife',
  focus: 'focus',
  'focus-spouse': 'focus-spouse',
  'sib-holly': 'sib-holly',
  'sib-david': 'sib-david',
  'sib-julie': 'sib-julie',
  'child-brian': 'child-brian',
  'child-sarah': 'child-sarah',
  'child-zachary': 'child-zachary',
  'child-anna': 'child-anna',
  'child-landon': 'child-landon',
  'child-samuel': 'child-samuel',
  'child-ammon': 'child-ammon',
  'child-elizabeth': 'child-elizabeth',
  'child-luke': 'child-luke',
  'child-simon': 'child-simon',
}

const treeStructure = [
  {
    label: 'Grandparents',
    couples: [
      { myKey: 'gp-pat-hus', myWife: 'gp-pat-wife' },
      { myKey: 'gp-mat-hus', myWife: 'gp-mat-wife' },
    ],
  },
  {
    label: 'Parents',
    couples: [{ myKey: 'par-hus', myWife: 'par-wife' }],
  },
  {
    label: 'Focus Person',
    couples: [{ myKey: 'focus', myWife: 'focus-spouse', siblings: ['sib-holly', 'sib-david', 'sib-julie'] }],
  },
  {
    label: 'Children',
    couples: [
      {
        children: [
          'child-brian',
          'child-sarah',
          'child-zachary',
          'child-anna',
          'child-landon',
          'child-samuel',
          'child-ammon',
          'child-elizabeth',
          'child-luke',
          'child-simon',
        ],
      },
    ],
  },
]

const personParents = {
  'par-hus': { gen: 0, couple: 0 },
  'par-wife': { gen: 0, couple: 1 },
  focus: { gen: 1, couple: 0 },
  'sib-holly': { gen: 1, couple: 0 },
  'sib-david': { gen: 1, couple: 0 },
  'sib-julie': { gen: 1, couple: 0 },
}

const coupleRelMap = {
  focus: { spouse: 'focus-spouse' },
  'focus-spouse': { spouse: 'focus' },
  'par-hus': { spouse: 'par-wife' },
  'par-wife': { spouse: 'par-hus' },
  'gp-pat-hus': { spouse: 'gp-pat-wife', children: ['par-hus'] },
  'gp-pat-wife': { spouse: 'gp-pat-hus', children: ['par-hus'] },
  'gp-mat-hus': { spouse: 'gp-mat-wife', children: ['par-wife'] },
  'gp-mat-wife': { spouse: 'gp-mat-hus', children: ['par-wife'] },
}

const parentMap = {
  focus: { father: 'par-hus', mother: 'par-wife' },
  'sib-holly': { father: 'par-hus', mother: 'par-wife' },
  'sib-david': { father: 'par-hus', mother: 'par-wife' },
  'sib-julie': { father: 'par-hus', mother: 'par-wife' },
  'par-hus': { father: 'gp-pat-hus', mother: 'gp-pat-wife' },
  'par-wife': { father: 'gp-mat-hus', mother: 'gp-mat-wife' },
}

const siblingMap = {
  focus: ['sib-holly', 'sib-david', 'sib-julie'],
  'sib-holly': ['focus', 'sib-david', 'sib-julie'],
  'sib-david': ['focus', 'sib-holly', 'sib-julie'],
  'sib-julie': ['focus', 'sib-holly', 'sib-david'],
}

const childrenMap = {
  focus: [
    'child-brian',
    'child-sarah',
    'child-zachary',
    'child-anna',
    'child-landon',
    'child-samuel',
    'child-ammon',
    'child-elizabeth',
    'child-luke',
    'child-simon',
  ],
  'focus-spouse': [
    'child-brian',
    'child-sarah',
    'child-zachary',
    'child-anna',
    'child-landon',
    'child-samuel',
    'child-ammon',
    'child-elizabeth',
    'child-luke',
    'child-simon',
  ],
}

// ============================================================
// HELPERS
// ============================================================

function getConflicts(myKey, fsKey) {
  const a = myTree[myKey]
  const b = fsTree[fsKey]
  if (!a || !b) return []
  const conflicts = []
  if (a.name !== b.name) conflicts.push({ field: 'Name', my: a.name, fs: b.name })
  if (a.dates !== b.dates) conflicts.push({ field: 'Dates', my: a.dates, fs: b.dates })
  return conflicts
}

function calcConfidence(myKey, fsKey) {
  const conflicts = getConflicts(myKey, fsKey)
  if (conflicts.length === 0) return 100
  return conflicts.length === 1 ? 82 : 61
}

function parseDates(dateStr) {
  if (!dateStr) return { birth: '', death: '' }
  const parts = dateStr.split('-')
  return { birth: parts[0] || '', death: parts[1] || '' }
}

function getSourceCount(personKey, field) {
  if (!personKey) return 0
  let hash = 0
  const str = personKey + field
  for (let i = 0; i < str.length; i++) hash = hash * 31 + str.charCodeAt(i)
  hash = Math.abs(hash)
  return hash % 10 < 4 ? 0 : (hash % 7) + 1
}

// ============================================================
// PERSON CARD
// ============================================================

function PersonCard({ person, source, stateClass, hasConflict, confidence, onClick, cardStyle }) {
  const isMy = source === 'my'
  const isDark = isMy

  const ghostVariant = isMy ? s.ghostMy : s.ghostFs
  const ghostClass = stateClass === 'ghost' ? ghostVariant : ''

  const isMale = person.gender === 'male'
  let avatarClass
  if (isMy) {
    avatarClass = isMale ? s.avatarMyMale : s.avatarMyFemale
  } else {
    avatarClass = isMale ? s.avatarFsMale : s.avatarFsFemale
  }

  return (
    <div
      className={`${s.personCard} ${isDark ? s.cardDark : s.cardLight} ${s[stateClass]} ${ghostClass}`}
      style={cardStyle}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <div className={`${s.cardTopBar} ${isMy ? s.barMy : s.barFs}`} />
      <div className={`${s.avatar} ${avatarClass}`}>
        {isMy ? (
          <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, fill: 'white' }}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          <img className={s.avatarImg} src={person.gender === 'male' ? malePng : femalePng} alt={person.gender} />
        )}
      </div>
      <div className={`${s.cardName} ${isDark ? s.cardNameDark : ''}`}>{person.name}</div>
      <div className={`${s.cardDates} ${isDark ? s.cardDatesDark : ''}`}>{person.dates}</div>
      <div className={`${s.cardPid} ${isDark ? s.cardPidDark : ''}`}>{person.pid}</div>
      {hasConflict && (
        <div className={s.conflictBadge}>
          Match {confidence != null && <span className={s.confidenceNum}>{confidence}%</span>}
        </div>
      )}
    </div>
  )
}

// ============================================================
// GHOST CARD
// ============================================================

function GhostCard({ person, source, onAdd }) {
  const isMy = source === 'my'
  const isMale = person.gender === 'male'
  let ghostAvatarClass
  if (isMy) {
    ghostAvatarClass = isMale ? s.avatarMyMale : s.avatarMyFemale
  } else {
    ghostAvatarClass = isMale ? s.avatarFsMale : s.avatarFsFemale
  }
  return (
    <div className={`${s.personCard} ${s.ghostCard} ${isMy ? s.ghostCardMy : s.ghostCardFs}`}>
      <div className={`${s.cardTopBar} ${isMy ? s.barMy : s.barFs}`} />
      <div className={`${s.avatar} ${ghostAvatarClass}`} style={{ opacity: 0.4 }}>
        {isMy ? (
          <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, fill: 'white' }}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        ) : (
          <img className={s.avatarImg} src={person.gender === 'male' ? malePng : femalePng} alt={person.gender} />
        )}
      </div>
      <div className={`${s.cardName} ${isMy ? s.cardNameDark : ''}`} style={{ opacity: 0.4 }}>
        {person.name}
      </div>
      <div className={`${s.cardDates} ${isMy ? s.cardDatesDark : ''}`} style={{ opacity: 0.4 }}>
        {person.dates}
      </div>
      <button type="button" className={s.ghostAddBtn} onClick={onAdd}>
        + Add
      </button>
    </div>
  )
}

// ============================================================
// PERSON SLOT
// ============================================================

function PersonSlot({ myKey, fsKey, mode, primaryTree, onSelect, selectedKey }) {
  const personMy = myKey ? myTree[myKey] : null
  const personFs = fsKey ? fsTree[fsKey] : null
  const hasConflict = myKey && fsKey && personMy && personFs && getConflicts(myKey, fsKey).length > 0
  const confidence = hasConflict ? calcConfidence(myKey, fsKey) : null
  const dataKey = myKey || fsKey
  const isSelected = selectedKey === dataKey

  const handleClick = useCallback(() => {
    onSelect(myKey, fsKey)
  }, [myKey, fsKey, onSelect])
  const slotClass = `${s.personSlot}${isSelected ? ` ${s.selected}` : ''}`

  if (mode === 'fs-only') {
    return (
      <div className={slotClass} data-person-key={dataKey}>
        <PersonCard
          person={personFs}
          source="fs"
          stateClass={primaryTree === 'fs' ? 'solo' : 'background'}
          onClick={handleClick}
          cardStyle={primaryTree === 'my' ? { background: 'white' } : undefined}
        />
        {primaryTree === 'my' && <GhostCard person={personFs} source="my" onAdd={() => {}} />}
      </div>
    )
  }

  if (personMy && personFs) {
    const myState = primaryTree === 'my' ? 'foreground' : 'background'
    const fsState = primaryTree === 'fs' ? 'foreground' : 'background'
    return (
      <div className={slotClass} data-person-key={dataKey}>
        <PersonCard
          person={personMy}
          source="my"
          stateClass={myState}
          hasConflict={hasConflict}
          confidence={confidence}
          onClick={handleClick}
        />
        <PersonCard
          person={personFs}
          source="fs"
          stateClass={fsState}
          hasConflict={hasConflict}
          confidence={confidence}
          onClick={handleClick}
        />
      </div>
    )
  }

  if (personMy && !personFs) {
    return (
      <div className={slotClass} data-person-key={dataKey}>
        <PersonCard
          person={personMy}
          source="my"
          stateClass={primaryTree === 'my' ? 'solo' : 'background'}
          onClick={handleClick}
        />
        {primaryTree === 'fs' && <GhostCard person={personMy} source="fs" onAdd={() => {}} />}
      </div>
    )
  }

  if (!personMy && personFs) {
    return (
      <div className={slotClass} data-person-key={dataKey}>
        <PersonCard
          person={personFs}
          source="fs"
          stateClass={primaryTree === 'fs' ? 'solo' : 'background'}
          onClick={handleClick}
        />
        {primaryTree === 'my' && <GhostCard person={personFs} source="my" onAdd={() => {}} />}
      </div>
    )
  }

  return <div className={slotClass} data-person-key={dataKey} />
}

// ============================================================
// CONNECTOR LINES — uses a single persistent SVG, cleared on each draw
// ============================================================

function drawConnectors(svgEl, containerEl, cssModule) {
  if (!svgEl || !containerEl) return

  // Resize SVG to match container
  svgEl.setAttribute('width', containerEl.scrollWidth)
  svgEl.setAttribute('height', containerEl.scrollHeight)

  // Clear all previous lines
  while (svgEl.firstChild) svgEl.removeChild(svgEl.firstChild)

  function getOffset(el) {
    let x = 0
    let y = 0
    let cur = el
    while (cur && cur !== containerEl) {
      x += cur.offsetLeft
      y += cur.offsetTop
      cur = cur.offsetParent
    }
    return { x, y }
  }

  function rel(el) {
    const pos = getOffset(el)
    return { bottom: pos.y + el.offsetHeight, top: pos.y, cx: pos.x + el.offsetWidth / 2 }
  }

  function relCard(slotEl) {
    const card =
      slotEl.querySelector(`.${cssModule.foreground}`) ||
      slotEl.querySelector(`.${cssModule.solo}`) ||
      slotEl.querySelector(`.${cssModule.personCard}`)
    return card ? rel(card) : rel(slotEl)
  }

  function line(x1, y1, x2, y2) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    el.setAttribute('x1', x1)
    el.setAttribute('y1', y1)
    el.setAttribute('x2', x2)
    el.setAttribute('y2', y2)
    el.setAttribute('stroke', '#bbb')
    el.setAttribute('stroke-width', '1.5')
    svgEl.appendChild(el)
  }

  // Draw couple bars and store their midpoints
  const coupleInfo = {}
  containerEl.querySelectorAll('[data-couple-id]').forEach((coupleEl) => {
    const id = coupleEl.getAttribute('data-couple-id')
    const slots = coupleEl.querySelectorAll(`.${cssModule.personSlot}`)
    if (slots.length < 2) return
    const h = relCard(slots[0])
    const w = relCard(slots[1])
    const barY = Math.max(h.bottom, w.bottom) + 8
    const midX = (h.cx + w.cx) / 2
    line(h.cx, h.bottom, h.cx, barY)
    line(w.cx, w.bottom, w.cx, barY)
    line(h.cx, barY, w.cx, barY)
    coupleInfo[id] = { barY, midX }
  })

  // Connect persons to their parent couples
  Object.entries(personParents).forEach(([personKey, ref]) => {
    const personEl = containerEl.querySelector(`[data-person-key="${personKey}"]`)
    if (!personEl) return
    const person = relCard(personEl)
    const parent = coupleInfo[`couple-${ref.gen}-${ref.couple}`]
    if (!parent) return
    const railY = (parent.barY + person.top) / 2
    line(parent.midX, parent.barY, parent.midX, railY)
    line(parent.midX, railY, person.cx, railY)
    line(person.cx, railY, person.cx, person.top)
  })

  // Connect children to focus+spouse couple
  const focusCoupleEl = containerEl.querySelector('[data-couple-id="couple-2-0"]')
  if (focusCoupleEl) {
    const focusSlots = focusCoupleEl.querySelectorAll(`.${cssModule.personSlot}`)
    if (focusSlots.length >= 2) {
      const focusPos = relCard(focusSlots[0])
      const spousePos = relCard(focusSlots[1])
      const coupleBarY = Math.max(focusPos.bottom, spousePos.bottom) + 8
      const coupleMidX = (focusPos.cx + spousePos.cx) / 2

      const childrenRow = containerEl.querySelector('[data-children-row]')
      if (childrenRow) {
        const childSlots = childrenRow.querySelectorAll(`.${cssModule.personSlot}`)
        if (childSlots.length > 0) {
          const childPositions = Array.from(childSlots).map((slot) => relCard(slot))
          const railY = (coupleBarY + Math.min(...childPositions.map((c) => c.top))) / 2

          line(coupleMidX, coupleBarY, coupleMidX, railY)

          childPositions.forEach((child) => {
            line(child.cx, railY, child.cx, child.top)
          })

          const leftX = Math.min(...childPositions.map((c) => c.cx))
          const rightX = Math.max(...childPositions.map((c) => c.cx))
          line(leftX, railY, rightX, railY)
        }
      }
    }
  }
}

// ============================================================
// PANEL: COMPARE FIELD
// ============================================================

function SourceBadge({ count }) {
  if (!count) return <span className={s.sourceZero}>0 sources</span>
  return (
    <button type="button" className={s.sourceLink}>
      {count} source{count > 1 ? 's' : ''}
    </button>
  )
}

function CompareField({ label, myValue, fsValue, myKey, fsKey }) {
  const isDiff = myValue && fsValue && myValue !== fsValue
  const [staged, setStaged] = useState(false)
  const [moving, setMoving] = useState(false)

  const handleClick = () => {
    if (moving) return
    setMoving(true)
    setTimeout(() => {
      setStaged((v) => !v)
      setMoving(false)
    }, 400)
  }

  return (
    <div className={`${s.fieldRow}${isDiff ? ` ${s.fieldRowConflict}` : ''}`}>
      <div className={s.fieldCell}>
        <div className={s.fieldLabel}>
          {label} <SourceBadge count={getSourceCount(myKey, label)} />
        </div>
        <div className={`${s.fieldValue}${staged ? ` ${s.fieldValueStaged}` : ''}`}>
          {myValue || <span className={s.fieldEmpty}>—</span>}
        </div>
      </div>

      <div className={`${s.fieldCell} ${s.fieldCellFs}`}>
        <div className={s.fieldLabel}>
          {label} <SourceBadge count={getSourceCount(fsKey, label)} />
        </div>
        <div className={s.fieldValue}>{fsValue || <span className={s.fieldEmpty}>—</span>}</div>
        {isDiff && !staged && <div className={s.diffTag}>Different</div>}
      </div>

      {isDiff && (
        <div className={`${s.slidingBox} ${staged ? s.slidingBoxRight : s.slidingBoxLeft}`}>
          <div className={s.slidingBoxLabel}>
            {label} <SourceBadge count={getSourceCount(myKey, label)} />
          </div>
          <div className={s.slidingBoxValue}>{myValue}</div>
          {staged && <div className={s.stagedTag}>Ready ✓</div>}
          <button
            type="button"
            className={s.arrowBtn}
            onClick={handleClick}
            disabled={moving}
            style={{ pointerEvents: 'all' }}
          >
            <span className={s.arrowCircle}>
              <svg viewBox="0 0 24 24" className={s.arrowIcon} style={staged ? { transform: 'rotate(180deg)' } : {}}>
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
              </svg>
            </span>
            <span className={s.arrowBtnLabel}>{staged ? 'Undo' : 'Add'}</span>
          </button>
        </div>
      )}
    </div>
  )
}

// ============================================================
// PANEL: FAMILY MEMBER
// ============================================================

function FamilyMember({ name, dates, gender }) {
  return (
    <div className={s.familyMember}>
      <div className={`${s.dot} ${gender === 'female' ? s.dotPink : s.dotBlue}`} />
      <div>
        <div className={s.memberName}>{name}</div>
        {dates && <div className={s.memberDates}>{dates}</div>}
      </div>
    </div>
  )
}

function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <>
      <div
        className={`${s.sectionHeader}${!open ? ` ${s.sectionHeaderCollapsed}` : ''}`}
        onClick={() => setOpen((o) => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
      >
        <span>{title}</span>
        <svg viewBox="0 0 24 24" className={s.chevron}>
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </div>
      {open && children}
    </>
  )
}

// ============================================================
// PANEL: SIDE SHEET CONTENT
// ============================================================

function SideSheetContent({ myKey, fsKey, onSave }) {
  const personMy = myKey ? myTree[myKey] : null
  const personFs = fsKey ? fsTree[fsKey] : null
  const personKey = myKey || fsKey
  const rel = coupleRelMap[personKey] || {}
  const pMap = parentMap[personKey]
  const siblings = siblingMap[personKey] || []
  const children = childrenMap[personKey] || []
  const datesA = parseDates(personMy?.dates)
  const datesB = parseDates(personFs?.dates)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => onSave && onSave(), 1200)
  }

  return (
    <>
      <div className={s.panelHeaders}>
        <div className={s.panelHeaderMy}>
          <span className={s.panelHeaderLabel}>My Tree</span>
          <span className={s.panelHeaderSub}>GEDCOM</span>
        </div>
        <div className={s.panelHeaderFs}>
          <span className={s.panelHeaderLabel}>FamilySearch</span>
        </div>
      </div>

      <div className={s.portraits}>
        <div className={s.portraitCell}>
          {personMy ? (
            <>
              <div
                className={s.portraitIcon}
                style={{ background: personMy.gender === 'male' ? '#4a7fb5' : '#b5547a' }}
              >
                <svg viewBox="0 0 24 24" style={{ width: 34, height: 34, fill: 'white' }}>
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className={s.portraitName}>{personMy.name}</div>
              <div className={s.portraitMeta}>
                {datesA.birth}–{datesA.death} · {personMy.pid}
              </div>
            </>
          ) : (
            <div className={s.notFound}>Not in My Tree</div>
          )}
        </div>
        <div className={`${s.portraitCell} ${s.portraitCellFs}`}>
          {personFs ? (
            <>
              <img
                className={s.portraitImg}
                src={personFs.gender === 'male' ? malePng : femalePng}
                alt={personFs.name}
              />
              <div className={s.portraitName}>{personFs.name}</div>
              <div className={s.portraitMeta}>
                {datesB.birth}–{datesB.death} · {personFs.pid}
              </div>
            </>
          ) : (
            <div className={s.notFound}>Not in FamilySearch</div>
          )}
        </div>
      </div>

      <div className={s.sectionDivider}>Vitals</div>
      <CompareField label="Name" myValue={personMy?.name} fsValue={personFs?.name} myKey={myKey} fsKey={fsKey} />
      {(() => {
        let myGender = ''
        if (personMy) myGender = personMy.gender === 'male' ? 'Male' : 'Female'
        let fsGender = ''
        if (personFs) fsGender = personFs.gender === 'male' ? 'Male' : 'Female'
        return <CompareField label="Sex" myValue={myGender} fsValue={fsGender} myKey={myKey} fsKey={fsKey} />
      })()}
      <CompareField label="Birth" myValue={datesA.birth} fsValue={datesB.birth} myKey={myKey} fsKey={fsKey} />
      <CompareField
        label="Death"
        myValue={datesA.death === 'Living' ? '' : datesA.death}
        fsValue={datesB.death === 'Living' ? '' : datesB.death}
        myKey={myKey}
        fsKey={fsKey}
      />

      {(rel.spouse || children.length > 0) && (
        <CollapsibleSection title="Spouse and Children">
          <div className={s.familyGrid}>
            <div className={s.familyCol}>
              {personMy && (
                <>
                  <div className={s.familyRole}>Self</div>
                  <FamilyMember name={personMy.name} dates={datesA.birth} gender={personMy.gender} />
                </>
              )}
              {rel.spouse &&
                myTree[rel.spouse] &&
                (() => {
                  const sp = myTree[rel.spouse]
                  const d = parseDates(sp.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Spouse</div>
                      <FamilyMember name={sp.name} dates={d.birth} gender={sp.gender} />
                    </>
                  )
                })()}
              {children.length > 0 && (
                <>
                  <div className={s.familyRole}>Children</div>
                  {children.map((ck) => {
                    const c = myTree[ck]
                    if (!c) return null
                    const d = parseDates(c.dates)
                    return <FamilyMember key={ck} name={c.name} dates={d.birth} gender={c.gender} />
                  })}
                </>
              )}
            </div>
            <div className={`${s.familyCol} ${s.familyColRight}`}>
              {personFs && (
                <>
                  <div className={s.familyRole}>Self</div>
                  <FamilyMember name={personFs.name} dates={datesB.birth} gender={personFs.gender} />
                </>
              )}
              {rel.spouse &&
                fsTree[rel.spouse] &&
                (() => {
                  const sp = fsTree[rel.spouse]
                  const d = parseDates(sp.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Spouse</div>
                      <FamilyMember name={sp.name} dates={d.birth} gender={sp.gender} />
                    </>
                  )
                })()}
              {children.length > 0 && (
                <>
                  <div className={s.familyRole}>Children</div>
                  {children.map((ck) => {
                    const c = fsTree[ck]
                    if (!c) return null
                    const d = parseDates(c.dates)
                    return <FamilyMember key={ck} name={c.name} dates={d.birth} gender={c.gender} />
                  })}
                </>
              )}
            </div>
          </div>
        </CollapsibleSection>
      )}

      {(pMap || siblings.length > 0) && (
        <CollapsibleSection title="Parents and Siblings" defaultOpen={false}>
          <div className={s.familyGrid}>
            <div className={s.familyCol}>
              {pMap &&
                myTree[pMap.father] &&
                (() => {
                  const f = myTree[pMap.father]
                  const d = parseDates(f.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Father</div>
                      <FamilyMember name={f.name} dates={d.birth} gender={f.gender} />
                    </>
                  )
                })()}
              {pMap &&
                myTree[pMap.mother] &&
                (() => {
                  const m = myTree[pMap.mother]
                  const d = parseDates(m.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Mother</div>
                      <FamilyMember name={m.name} dates={d.birth} gender={m.gender} />
                    </>
                  )
                })()}
              {siblings.length > 0 && (
                <>
                  <div className={s.familyRole}>Siblings</div>
                  {siblings.map((sk) => {
                    const sib = myTree[sk]
                    if (!sib) return null
                    const d = parseDates(sib.dates)
                    return <FamilyMember key={sk} name={sib.name} dates={d.birth} gender={sib.gender} />
                  })}
                </>
              )}
            </div>
            <div className={`${s.familyCol} ${s.familyColRight}`}>
              {pMap &&
                fsTree[pMap.father] &&
                (() => {
                  const f = fsTree[pMap.father]
                  const d = parseDates(f.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Father</div>
                      <FamilyMember name={f.name} dates={d.birth} gender={f.gender} />
                    </>
                  )
                })()}
              {pMap &&
                fsTree[pMap.mother] &&
                (() => {
                  const m = fsTree[pMap.mother]
                  const d = parseDates(m.dates)
                  return (
                    <>
                      <div className={s.familyRole}>Mother</div>
                      <FamilyMember name={m.name} dates={d.birth} gender={m.gender} />
                    </>
                  )
                })()}
              {siblings.length > 0 && (
                <>
                  <div className={s.familyRole}>Siblings</div>
                  {siblings.map((sk) => {
                    const sib = fsTree[sk]
                    if (!sib) return null
                    const d = parseDates(sib.dates)
                    return <FamilyMember key={sk} name={sib.name} dates={d.birth} gender={sib.gender} />
                  })}
                </>
              )}
            </div>
          </div>
        </CollapsibleSection>
      )}

      <div className={s.panelFooter}>
        <Button emphasis="high" fullWidth onClick={!saved ? handleSave : undefined} disabled={saved}>
          {saved ? 'Saved ✓' : 'Save to FamilySearch'}
        </Button>
      </div>
    </>
  )
}

// ============================================================
// TREE ICON
// ============================================================

function TreeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M20 4v4h-3V4h3Zm0 12v4h-3v-4h3ZM4 14v-4h3v4H4ZM15 3v2h-1a3 3 0 0 0-3 3v3H9V9a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-2h2v3a3 3 0 0 0 3 3h1v2a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v2h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1v2a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1Z"
      />
    </svg>
  )
}

// ============================================================
// MAIN
// ============================================================

export default function TreeCompareV3() {
  const [primaryTree, setPrimaryTree] = useState('my')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)
  const [sheetContent, setSheetContent] = useState(null)
  const containerRef = useRef(null)
  const svgRef = useRef(null)

  const redraw = useCallback(() => {
    if (containerRef.current && svgRef.current) drawConnectors(svgRef.current, containerRef.current, s)
  }, [])

  const handleSelect = useCallback(
    (myKey, fsKey) => {
      const dataKey = myKey || fsKey
      if (selectedKey === dataKey && sheetOpen) {
        setSheetOpen(false)
        setSelectedKey(null)
        return
      }
      setSelectedKey(dataKey)
      setSheetContent({ myKey, fsKey })
      setSheetOpen(true)
    },
    [selectedKey, sheetOpen]
  )

  const closeSheet = useCallback(() => {
    setSheetOpen(false)
    setSelectedKey(null)
  }, [])

  // Redraw on mount and whenever sheet/primaryTree changes
  useEffect(() => {
    // Immediate draw + delayed draw to catch post-transition layout
    redraw()
    const t1 = setTimeout(redraw, 50)
    const t2 = setTimeout(redraw, 350)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [redraw, sheetOpen, primaryTree])

  // Animate connectors smoothly during sheet slide
  useEffect(() => {
    let rafId = null
    let running = false
    const tick = () => {
      redraw()
      if (running) rafId = requestAnimationFrame(tick)
    }
    const start = () => {
      running = true
      rafId = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(rafId)
      redraw()
    }
    const el = containerRef.current
    if (!el) return undefined
    el.addEventListener('transitionstart', start)
    el.addEventListener('transitionend', stop)
    return () => {
      el.removeEventListener('transitionstart', start)
      el.removeEventListener('transitionend', stop)
      running = false
      cancelAnimationFrame(rafId)
    }
  }, [redraw])

  useEffect(() => {
    window.addEventListener('resize', redraw)
    return () => window.removeEventListener('resize', redraw)
  }, [redraw])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeSheet()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeSheet])

  return (
    <div className={s.root}>
      {/* Toggle */}
      <div className={s.toggle}>
        <button
          type="button"
          className={`${s.toggleBtn} ${s.toggleBtnMy}${primaryTree === 'my' ? ` ${s.toggleActive}` : ''}`}
          onClick={() => setPrimaryTree('my')}
        >
          <TreeIcon /> My Tree
        </button>
        <button
          type="button"
          className={`${s.toggleBtn} ${s.toggleBtnFs}${primaryTree === 'fs' ? ` ${s.toggleActive}` : ''}`}
          onClick={() => setPrimaryTree('fs')}
        >
          FamilySearch
        </button>
      </div>

      {/* Tree canvas */}
      <div ref={containerRef} className={`${s.canvas}${sheetOpen ? ` ${s.canvasShifted}` : ''}`}>
        <svg ref={svgRef} className={s.treeSvg} />
        {treeStructure.map((gen, gi) => {
          // Children row renders differently — flat list, no couples
          if (gen.label === 'Children') {
            const childKeys = gen.couples[0].children
            return (
              <React.Fragment key={gen.label}>
                <div className={s.genLabel}>{gen.label}</div>
                <div className={s.generation} data-children-row>
                  {childKeys.map((key) => (
                    <PersonSlot
                      key={key}
                      myKey={key}
                      fsKey={matches[key] || null}
                      primaryTree={primaryTree}
                      onSelect={handleSelect}
                      selectedKey={selectedKey}
                    />
                  ))}
                </div>
                {gi < treeStructure.length - 1 && <div className={s.spacer} />}
              </React.Fragment>
            )
          }

          return (
            <React.Fragment key={gen.label}>
              <div className={s.genLabel}>{gen.label}</div>
              <div className={s.generation}>
                {gen.couples.map((couple, ci) => (
                  <div
                    key={`${couple.myKey}-${couple.myWife}`}
                    className={s.couple}
                    data-couple-id={`couple-${gi}-${ci}`}
                  >
                    <PersonSlot
                      myKey={couple.myKey}
                      fsKey={matches[couple.myKey] || null}
                      primaryTree={primaryTree}
                      onSelect={handleSelect}
                      selectedKey={selectedKey}
                    />
                    <PersonSlot
                      myKey={couple.myWife}
                      fsKey={matches[couple.myWife] || null}
                      primaryTree={primaryTree}
                      onSelect={handleSelect}
                      selectedKey={selectedKey}
                    />
                    {couple.siblings &&
                      couple.siblings.map((k) => (
                        <PersonSlot
                          key={k}
                          myKey={k}
                          fsKey={matches[k] || null}
                          primaryTree={primaryTree}
                          onSelect={handleSelect}
                          selectedKey={selectedKey}
                        />
                      ))}
                  </div>
                ))}
              </div>
              {gi < treeStructure.length - 1 && <div className={s.spacer} />}
            </React.Fragment>
          )
        })}
      </div>

      {/* Side sheet */}
      <div className={`${s.sheet}${sheetOpen ? ` ${s.sheetOpen}` : ''}`} role="dialog" aria-label="Person comparison">
        <div className={s.sheetTopBar}>
          <span className={s.sheetTitle}>Tree Compare</span>
          <button type="button" className={s.sheetClose} onClick={closeSheet} aria-label="Close">
            ×
          </button>
        </div>
        <div className={s.sheetBody}>
          {sheetContent && (
            <SideSheetContent
              key={sheetContent.myKey + sheetContent.fsKey}
              myKey={sheetContent.myKey}
              fsKey={sheetContent.fsKey}
              onSave={closeSheet}
            />
          )}
        </div>
      </div>

      {/* Legend */}
      <div className={`${s.legend}${sheetOpen ? ` ${s.legendShifted}` : ''}`}>
        <div className={s.legendItem}>
          <div className={`${s.legendDot} ${s.legendDotMy}`} />
          <span>My Tree</span>
        </div>
        <div className={s.legendItem}>
          <div className={`${s.legendDot} ${s.legendDotFs}`} />
          <span>FamilySearch</span>
        </div>
      </div>
    </div>
  )
}
