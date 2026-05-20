import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@fs/zion-ui'
import s from './styles.module.css'
import malePng from './male.png'
import femalePng from './female.png'

// ============================================================
// DATA
// ============================================================

const myTree = {
  'gg-pp-hus': { name: 'James William Hair', dates: '1840-1910', pid: 'KWCL-111', gender: 'male' },
  'gg-pp-wife': { name: 'Margaret Ann Scott', dates: '1845-1918', pid: 'KWCL-112', gender: 'female' },
  'gg-pm-hus': { name: 'Thomas Edward Lewis', dates: '1842-1905', pid: 'KWCL-113', gender: 'male' },
  'gg-pm-wife': { name: 'Sarah Jane Morgan', dates: '1848-1920', pid: 'KWCL-114', gender: 'female' },
  'gg-mp-hus': { name: 'Friedrich August Weller', dates: '1838-1902', pid: 'KWCL-115', gender: 'male' },
  'gg-mp-wife': { name: 'Anna Marie Braun', dates: '1843-1915', pid: 'KWCL-116', gender: 'female' },
  'gg-mm-hus': { name: 'Heinrich Karl Martin', dates: '1841-1908', pid: 'KWCL-117', gender: 'male' },
  'gg-mm-wife': { name: 'Elisabeth Hoffman', dates: '1846-1922', pid: 'KWCL-118', gender: 'female' },
  'gp-pat-hus': { name: 'John William Hair', dates: '1891-1965', pid: 'KWCL-QC6', gender: 'male' },
  'gp-pat-wife': { name: 'Doris Jane Lewis', dates: '1896-1988', pid: 'KWCL-QCX', gender: 'female' },
  'gp-mat-hus': { name: 'Gustav August Weller', dates: '1890-1971', pid: 'KWCQ-R2D', gender: 'male' },
  'gp-mat-wife': { name: 'Gertrud Marie Martin', dates: '1894-1978', pid: 'KW2S-P6G', gender: 'female' },
  'par-hus': { name: 'Dale William Hair', dates: '1932-2019', pid: 'LNWC-D92', gender: 'male' },
  'par-wife': { name: 'Mary Magdal. Weller', dates: '1933-2022', pid: 'LNHY-RN8', gender: 'female' },
  focus: { name: 'Andrew Dale Hair', dates: '1974-Living', pid: 'KW4Y-36B', gender: 'male' },
  'focus-spouse': { name: 'Wendy Michelle Sheley', dates: '1972-Living', pid: 'LNHY-R4L', gender: 'female' },
}

const fsTree = {
  'gg-pp-hus': { name: 'James William Hair', dates: '1840-1910', pid: 'USR-001', gender: 'male' },
  'gg-pp-wife': { name: 'Margaret Ann Scott', dates: '1845-1919', pid: 'USR-002', gender: 'female' },
  'gg-pm-hus': { name: 'Thomas E. Lewis', dates: '1842-1906', pid: 'USR-003', gender: 'male' },
  'gg-pm-wife': { name: 'Sarah J. Morgan', dates: '1847-1920', pid: 'USR-004', gender: 'female' },
  'gg-mp-hus': { name: 'Friedrich August Weller', dates: '1838-1902', pid: 'USR-013', gender: 'male' },
  'gg-mp-wife': { name: 'Anna Marie Braun', dates: '1843-1916', pid: 'USR-014', gender: 'female' },
  'gp-pat-hus': { name: 'John W. Hair', dates: '1890-1965', pid: 'USR-005', gender: 'male' },
  'gp-pat-wife': { name: 'Doris J. Lewis', dates: '1896-1987', pid: 'USR-006', gender: 'female' },
  'gp-mat-hus': { name: 'Gustav August Weller', dates: '1890-1971', pid: 'USR-007', gender: 'male' },
  'gp-mat-wife': { name: 'Gertrude Marie Martin', dates: '1894-1978', pid: 'USR-008', gender: 'female' },
  'par-hus': { name: 'Dale William Hair', dates: '1932-2019', pid: 'USR-009', gender: 'male' },
  'par-wife': { name: 'Mary Magdal. Weller', dates: '1933-2022', pid: 'USR-010', gender: 'female' },
  focus: { name: 'Andrew Dale Hair', dates: '1974-Living', pid: 'USR-011', gender: 'male' },
  'focus-spouse': { name: 'Wendy Michelle Sheley', dates: '1972-Living', pid: 'USR-012', gender: 'female' },
  'focus-sibling': { name: 'Robert Dean Hair', dates: '1970-Living', pid: 'USR-015', gender: 'male' },
}

const matches = {
  'gg-pp-hus': 'gg-pp-hus',
  'gg-pp-wife': 'gg-pp-wife',
  'gg-pm-hus': 'gg-pm-hus',
  'gg-pm-wife': 'gg-pm-wife',
  'gg-mp-hus': 'gg-mp-hus',
  'gg-mp-wife': 'gg-mp-wife',
  'gp-pat-hus': 'gp-pat-hus',
  'gp-pat-wife': 'gp-pat-wife',
  'gp-mat-hus': 'gp-mat-hus',
  'gp-mat-wife': 'gp-mat-wife',
  'par-hus': 'par-hus',
  'par-wife': 'par-wife',
  focus: 'focus',
  'focus-spouse': 'focus-spouse',
}

const treeStructure = [
  {
    label: 'Great-Grandparents',
    couples: [
      { myKey: 'gg-pp-hus', myWife: 'gg-pp-wife' },
      { myKey: 'gg-pm-hus', myWife: 'gg-pm-wife' },
      { myKey: 'gg-mp-hus', myWife: 'gg-mp-wife' },
      { myKey: 'gg-mm-hus', myWife: 'gg-mm-wife' },
    ],
  },
  {
    label: 'Grandparents',
    couples: [
      { myKey: 'gp-pat-hus', myWife: 'gp-pat-wife' },
      { myKey: 'gp-mat-hus', myWife: 'gp-mat-wife' },
    ],
  },
  { label: 'Parents', couples: [{ myKey: 'par-hus', myWife: 'par-wife' }] },
  { label: 'Focus Person', couples: [{ myKey: 'focus', myWife: 'focus-spouse', extraFs: ['focus-sibling'] }] },
]

const personParents = {
  'gp-pat-hus': { gen: 0, couple: 0 },
  'gp-pat-wife': { gen: 0, couple: 1 },
  'gp-mat-hus': { gen: 0, couple: 2 },
  'gp-mat-wife': { gen: 0, couple: 3 },
  'par-hus': { gen: 1, couple: 0 },
  'par-wife': { gen: 1, couple: 1 },
  focus: { gen: 2, couple: 0 },
  'focus-sibling': { gen: 2, couple: 0 },
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
  'gg-pp-hus': { spouse: 'gg-pp-wife', children: ['gp-pat-hus'] },
  'gg-pp-wife': { spouse: 'gg-pp-hus', children: ['gp-pat-hus'] },
  'gg-pm-hus': { spouse: 'gg-pm-wife', children: ['gp-pat-wife'] },
  'gg-pm-wife': { spouse: 'gg-pm-hus', children: ['gp-pat-wife'] },
  'gg-mp-hus': { spouse: 'gg-mp-wife', children: ['gp-mat-hus'] },
  'gg-mp-wife': { spouse: 'gg-mp-hus', children: ['gp-mat-hus'] },
  'gg-mm-hus': { spouse: 'gg-mm-wife', children: ['gp-mat-wife'] },
  'gg-mm-wife': { spouse: 'gg-mm-hus', children: ['gp-mat-wife'] },
}

const parentMap = {
  focus: { father: 'par-hus', mother: 'par-wife' },
  'par-hus': { father: 'gp-pat-hus', mother: 'gp-pat-wife' },
  'par-wife': { father: 'gp-mat-hus', mother: 'gp-mat-wife' },
  'gp-pat-hus': { father: 'gg-pp-hus', mother: 'gg-pp-wife' },
  'gp-pat-wife': { father: 'gg-pm-hus', mother: 'gg-pm-wife' },
  'gp-mat-hus': { father: 'gg-mp-hus', mother: 'gg-mp-wife' },
  'gp-mat-wife': { father: 'gg-mm-hus', mother: 'gg-mm-wife' },
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
// PERSON SLOT
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
// CONNECTOR LINES
// ============================================================

function drawConnectors(containerEl, cssModule) {
  const existingSvg = containerEl.querySelector(`.${cssModule.treeSvg}`)
  if (existingSvg) existingSvg.remove()

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.classList.add(cssModule.treeSvg)
  svg.setAttribute('width', containerEl.scrollWidth)
  svg.setAttribute('height', containerEl.scrollHeight)
  containerEl.appendChild(svg)

  function getOffset(el, ancestor) {
    let x = 0
    let y = 0
    let cur = el
    while (cur && cur !== ancestor) {
      x += cur.offsetLeft
      y += cur.offsetTop
      cur = cur.offsetParent
    }
    return { x, y }
  }

  function rel(el) {
    const pos = getOffset(el, containerEl)
    return { bottom: pos.y + el.offsetHeight, top: pos.y, cx: pos.x + el.offsetWidth / 2 }
  }

  function relCard(slotEl) {
    const card =
      slotEl.querySelector(`.${cssModule.foreground}`) ||
      slotEl.querySelector(`.${cssModule.solo}`) ||
      slotEl.querySelector(`.${cssModule.ghost}`)
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
    svg.appendChild(el)
  }

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
      {/* Left cell */}
      <div className={s.fieldCell}>
        <div className={s.fieldLabel}>
          {label} <SourceBadge count={getSourceCount(myKey, label)} />
        </div>
        <div className={`${s.fieldValue}${staged ? ` ${s.fieldValueStaged}` : ''}`}>
          {myValue || <span className={s.fieldEmpty}>—</span>}
        </div>
      </div>

      {/* Right cell */}
      <div className={`${s.fieldCell} ${s.fieldCellFs}`}>
        <div className={s.fieldLabel}>
          {label} <SourceBadge count={getSourceCount(fsKey, label)} />
        </div>
        <div className={s.fieldValue}>{fsValue || <span className={s.fieldEmpty}>—</span>}</div>
        {isDiff && !staged && <div className={s.diffTag}>Different</div>}
      </div>

      {/* Sliding box */}
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
  const datesA = parseDates(personMy?.dates)
  const datesB = parseDates(personFs?.dates)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => onSave && onSave(), 1200)
  }

  return (
    <>
      {/* Panel headers */}
      <div className={s.panelHeaders}>
        <div className={s.panelHeaderMy}>
          <span className={s.panelHeaderLabel}>My Tree</span>
          <span className={s.panelHeaderSub}>GEDCOM</span>
        </div>
        <div className={s.panelHeaderFs}>
          <span className={s.panelHeaderLabel}>FamilySearch</span>
        </div>
      </div>

      {/* Person portraits */}
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

      {/* Vitals comparison */}
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

      {/* Spouse and children */}
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
            {rel.children &&
              rel.children.map(
                (ck) =>
                  myTree[ck] &&
                  (() => {
                    const ch = myTree[ck]
                    const d = parseDates(ch.dates)
                    return (
                      <React.Fragment key={ck}>
                        <div className={s.familyRole}>Child</div>
                        <FamilyMember name={ch.name} dates={d.birth} gender={ch.gender} />
                      </React.Fragment>
                    )
                  })()
              )}
            {!personMy && !rel.spouse && (!rel.children || rel.children.length === 0) && (
              <div className={s.familyEmpty}>No information</div>
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
            {rel.children &&
              rel.children.map(
                (ck) =>
                  fsTree[ck] &&
                  (() => {
                    const ch = fsTree[ck]
                    const d = parseDates(ch.dates)
                    return (
                      <React.Fragment key={ck}>
                        <div className={s.familyRole}>Child</div>
                        <FamilyMember name={ch.name} dates={d.birth} gender={ch.gender} />
                      </React.Fragment>
                    )
                  })()
              )}
            {!personFs && !rel.spouse && (!rel.children || rel.children.length === 0) && (
              <div className={s.familyEmpty}>No information</div>
            )}
          </div>
        </div>
      </CollapsibleSection>

      {/* Parents and siblings */}
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
            {pMap &&
              Object.entries(myTree)
                .filter(([k]) => {
                  const pm = parentMap[k]
                  return pm && pm.father === pMap.father && pm.mother === pMap.mother && k !== personKey
                })
                .map(([k, v]) => {
                  const d = parseDates(v.dates)
                  return (
                    <React.Fragment key={k}>
                      <div className={s.familyRole}>Sibling</div>
                      <FamilyMember name={v.name} dates={d.birth} gender={v.gender} />
                    </React.Fragment>
                  )
                })}
            {!pMap && <div className={s.familyEmpty}>No information</div>}
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
            {pMap &&
              Object.entries(fsTree)
                .filter(([k]) => {
                  const pm = parentMap[k]
                  return pm && pm.father === pMap.father && pm.mother === pMap.mother && k !== personKey
                })
                .map(([k, v]) => {
                  const d = parseDates(v.dates)
                  return (
                    <React.Fragment key={k}>
                      <div className={s.familyRole}>Sibling</div>
                      <FamilyMember name={v.name} dates={d.birth} gender={v.gender} />
                    </React.Fragment>
                  )
                })}
            {!pMap && <div className={s.familyEmpty}>No information</div>}
          </div>
        </div>
      </CollapsibleSection>

      {/* Save footer */}
      <div className={s.panelFooter}>
        <Button emphasis="high" onClick={!saved ? handleSave : undefined} disabled={saved}>
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

export default function TreeCompareV2() {
  const [primaryTree, setPrimaryTree] = useState('my')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)
  const [sheetContent, setSheetContent] = useState(null)
  const containerRef = useRef(null)

  const redraw = useCallback(() => {
    if (containerRef.current) drawConnectors(containerRef.current, s)
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

  // Redraw connectors every render
  useEffect(() => {
    const id = requestAnimationFrame(redraw)
    return () => cancelAnimationFrame(id)
  })

  // Animate connectors during sheet slide
  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined
    let rafId = null
    const tick = () => {
      redraw()
      rafId = requestAnimationFrame(tick)
    }
    const onStart = (e) => {
      if (e.propertyName === 'margin-right') rafId = requestAnimationFrame(tick)
    }
    const onEnd = (e) => {
      if (e.propertyName === 'margin-right') {
        cancelAnimationFrame(rafId)
        rafId = null
        redraw()
      }
    }
    el.addEventListener('transitionstart', onStart)
    el.addEventListener('transitionend', onEnd)
    return () => {
      el.removeEventListener('transitionstart', onStart)
      el.removeEventListener('transitionend', onEnd)
      if (rafId) cancelAnimationFrame(rafId)
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
        {treeStructure.map((gen, gi) => (
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
                  {couple.extraFs &&
                    couple.extraFs.map((k) => (
                      <PersonSlot
                        key={k}
                        myKey={null}
                        fsKey={k}
                        mode="fs-only"
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
        ))}
      </div>

      {/* Side sheet — fixed to browser window */}
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
