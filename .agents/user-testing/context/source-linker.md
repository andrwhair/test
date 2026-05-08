# Context: Source Linker

## What This Area Does
The Source Linker is the tool users use to attach historical records to people in their FamilySearch family tree. It presents a side-by-side comparison of a record and the user's tree, letting them review matches, resolve discrepancies, and attach the source. It is the #2 driver of high-quality names entering the tree, after the person page. It is the core research-to-contribution workflow for intermediate and expert users.

## Scale & Impact
- ~600,000 record attachments per day
- ~70,000 names added to the tree per day
- Critical to the temple supply plan — accurate names from Source Linker directly feed temple ordinance work
- Governed by the [Genealogical Proof Standard (GPS)](https://bcgcertification.org/ethics-standards)

## Product History

**2014–2018 — Failed redesign (Polymer → Angular):**
The team attempted to modernize the codebase and simplify the UX. Changes included a one-person-at-a-time attachment experience, a full layout redesign with new comparison model and components, and hierarchy changes. The first iteration launched and was rejected by patrons — attach rates fell significantly. After 18–24 months of iteration, the team reverted to the original Angular layout. Attach rates recovered.

**Key lesson:** Users had built deep muscle memory over a decade with the existing layout. Simplification that disrupted that mental model caused abandonment, not efficiency.

**2022 — React/Zion redesign (current):**
The codebase shift to React required a redesign. Before building, the team conducted extensive research:
- 25 internal stakeholder interviews
- 10 external subject matter expert interviews
- 30+ user interviews (expert to beginner, heavy emphasis on high contributors)
- Market research and comparative analysis
- Contextual inquiry in libraries observing the Polymer version in use

The team deliberately kept the familiar two-column layout while adding high-value enhancements users had requested for years (in-tool editing, better typography/hierarchy, infosheets, improved tagging, smoother drag-and-drop, onboarding tools).

**Q4 2023 launch results (6 months post-launch):**
- +12% increase in record attaches
- +8% increase in names added to the tree
- Results have held steady since launch

## URL Pattern
`familysearch.org/en/search/linker?ark=...` — accessed via record hints on the person page, Search Records, or direct record navigation.

## Current Layout / Baseline (Production)

The linker is a two-column layout with a clear left/right structure:

**Left column — "Parents on Record"** (the historical record):
- Record source header (e.g., "Michigan, Births, 1867-1902") with a "view record" link
- Person of Record: name, sex, race, birth, birthplace — as indexed from the document
- Tags automatically added (shown at bottom)
- Add to Source Box option
- Siblings on Record
- Others on Record
- "Return to Record" and "Return to Family Tree" buttons at bottom

**Right column — "Parents in Tree"** (the user's FamilySearch tree):
- "Not your family?" link to change person
- Tree Person and Spouse section: name, sources count, "Different" badge when data conflicts, edit button
- Each vital field shows source count inline with the label (e.g., "Name • 3 sources") with an edit pencil icon on fields that have sources; the "Different" pill badge renders *below* the tree value as a secondary element — not inline with the label
- "Add a reason for attaching this source" text field
- Cancel / Not a Match / **Attach** action buttons
- Children on Record (left) vs. Children in Tree (right) — side by side
  - Each child row has: photo avatar, name, dates, **"Details"** link
  - Children in record but NOT in tree show an **"Open"** button to add them
  - Children in tree but NOT in record shown for comparison
- Siblings in Tree / Others in Tree sections

**Key interaction — adding new children:**
Children found in the record but not yet in the tree appear in the "Children on Record" column with an **"Open"** button. This is the primary path for adding newly discovered children directly from a source into the tree — a high-value action for growing the tree with quality data.

**"Different" badge**: A small teal/purple pill that appears *below* the tree value (right column only) when the record data conflicts with the tree data for a given field (name, birth date, etc.). It is the primary data quality signal in the linker. Its position is secondary — below the value, not inline with the label — which gives it low visual weight on a quick scan. Novice users frequently miss it entirely; intermediate users notice it but aren't always sure what action to take; expert users rely on it as an actionable signal to investigate before attaching.

**Action buttons**: Cancel · Not a Match · **Attach** — Attach is the primary CTA, prominently styled.

## What the Current Source Linker Gets Right

These are validated positives from research — things users appreciate, rely on, or would notice if missing. When evaluating a new design, check whether these are preserved, improved, or lost.

- **Two-column layout is trusted.** Users across all experience levels have internalized the left = record / right = tree structure. It mirrors how expert researchers think: "What does the document say?" vs. "What does my tree say?" A decade of muscle memory is built on this. The 2014–2018 redesign that broke this model saw attach rates fall significantly.
- **"View Record" + "View Image" dual links are high value.** Nearly every expert user seeks the original document artifact before committing. These links exist and are used — they just need to be more prominent.
- **Source count inline with vitals ("Name • 3 sources") is meaningful.** Users treat source counts as data quality signals. Experts look at these before anything else. "(0)" is alarming and motivating.
- **"Different" badge surfaces conflict before the user has to find it.** Intermediate and expert users rely on this to know where to focus their comparison. It's the primary data quality signal in the linker. (Current limitation: it's a small teal pill below the tree value — low visual weight — but the signal itself is valued.)
- **Children on Record vs. Children in Tree comparison is a discovery engine.** Expert and intermediate users specifically call this out as a high-value workflow. The ability to see and add children found in a record but not in the tree is one of the tool's most meaningful contributions to tree quality.
- **Source highlight interaction is well-received.** When clicking a source brings up the relevant parts of the record, users respond positively: "when you click on something, it brings up the relevant parts." This connected-evidence experience is what users want more of, not less.
- **The Attach button is unambiguous.** Across all experience levels, the primary CTA is clear. The decision of *whether* to attach is hard — but the *how* is not. Don't obscure or rename this affordance.
- **"Reason to Attach" field gives experts a place to document their logic.** Even though the auto-generated version frustrates them, experts actively use this field. They rewrite it. It serves a real need for provenance and annotation.
- **Mobile "Apply" button for transferring dates without typing is loved.** Specifically called out by expert mobile users as a high-value efficiency feature.

---

## Key User Behaviors (From Research)

**Advanced / Expert users:**
- Common workflow: Google → Person Page → Select Hint → Source Linker; also uses Descendancy View to scan for hints
- Opens record image directly ("view record" link) to learn details not captured in the index; takes notes before updating the person page
- Uses Goldie May bookmarklet for efficiency when attaching; does not recommend it for novices (feels it "could be really dangerous")
- When not attaching (needs more research), adds the hint to their homepage To-Do list to return later
- Loves mobile SL for "descendants with tasks" — uses it for small tasks on the go; reserves heavy research for desktop with multiple monitors/tabs
- Opens multiple tabs simultaneously to cross-reference family context; desktop preferred because "you can see the whole family"
- On mobile: "Apply" button to quickly transfer dates without typing is a high-value feature
- Uses pencil (edit) icon on desktop for vitals during heavy research sessions
- Always looks up sources for each vital before attaching to verify
- Does not attach if locals and relationships "seem bogus"
- Strongly prefers sources inline on the person page with direct visual connection to the data they support
- Source highlight interaction ("when you click on something, it brings up the relevant parts") is well-received
- Source count "(0)" on the person page tab bar is alarming — treats it as an urgent quality signal and goes to Sources tab first
- The "Children on Record" vs. "Children in Tree" comparison is a high-value workflow for discovering new family members
- Sister Rupper: "If I have 15 minutes, I want to add some hints." — efficiency orientation defines engagement
- Cathy DeCook: Reviews sources first, then relational context, then structured data alignment before attaching
- Wendy Rupper: Validates through name, date, place plus fertility windows and sibling gaps before committing
- Mary Jo Young: "Fixer" workflow — attaches hints, merges duplicates, ensures temple readiness; requires multiple records before temple work
- Does not want to mark hints "not a match" without reason; wants ability to annotate so others don't misattach

**Intermediate users:**
- Common workflow: Homepage → Hint → Person Page → Clicks a Hint → Source Linker
- Understands source-to-field connection immediately; "sources stand out to me — verifiable information"
- "I can verify the details after clicking on a source" — sources increase trust in data
- Fan of weaker hints; likes doing research into those in her workflow
- Deletes "dumb" Reason to Attach statements that say obvious things like "(1880 census)"
- Cathina Douglas: focuses immediately on discrepancies and "Different" badges before considering attachment
- Needs to reconcile any difference against the original document before attaching; "I would need to examine the document and relatives"
- Sister Bromley: verifies source completeness on Person page before engaging hints
- Liliana Easily: expects edit confirmation and visible structural change before trusting the action

**Novice users:**
- Often do not click on sources unprompted — need a visual cue or prompt to discover the interaction
- In guided learning environments, need clear procedural direction, visible data alignment, and strong confirmation signals
- Confidence built through reassurance and visible data alignment, not autonomous judgment
- Josie (novice teen): guided learner, relies on matching names and timeline to feel comfortable; "nervous about getting it wrong"
- Gale Curren: proceeds cautiously, "taking a chance"; looks for original record access before trusting AI summary; wants tree view after attachment to confirm context

**First-time / New users:**
- Ontario7856: "The highlights tell me where the data comes from" — discovered only after being shown, not independently. Found it meaningful once understood.
- Very low awareness this workflow exists; needs plain-language framing of why sources matter before mechanics make sense
- The two-column layout may feel complex
- The Attach button is clear but the decision of whether to attach is not
- Annie Stevens: primarily temple-focused, minimal independent validation; needs system to direct next steps and provide clear feedback
- Ann Rawlings: intermediate-beginner; AI increases confidence when it clearly explains what evidence belongs to whom

## Known Friction Points

**Major friction (frequently observed, high abandonment/confusion risk):**
- **Already-attached hints**: Showing hints that are already attached is a top pain point across all experience levels. Users don't know what to do — is it a duplicate? A bad hint? Do they have bad data? Sister Ropper: "Nobody knows what to do." Sister Rupper: "That is a downfall for users." This should not be shown to new users.
- **Change Person flow**: The biggest learning friction for users new to Source Linker. Sister Ropper explicitly calls it out as the #1 problem for people she helps.
- **Multi-person attachment flow confusion**: When attaching a record with multiple family members, the flow opens as a **right-side drawer overlay** on the Person page — removing the two-column linker context mid-flow. A small progress bar with "2 of 3" numeric label appears top-right; the header reads "Person (2 of 3) Successfully Attached." Users consistently misread "1 of 3" / "2 of 3" as wizard steps (process stages), not as "person #2 of 3 people found in this record." The word "person" is in the header but easy to skim past. The strongest signal of the true meaning is the "COMPARE NEXT PERSON" CTA button — but users who don't read it first are already confused. Results in hesitation, incomplete attachment, and users believing they are partway through a multi-step process rather than managing multiple people.
- **Post-commit visibility gap**: After attaching, users at all levels look back to the Person page or Sources section to verify something changed. If the update isn't visibly reflected, trust breaks down. A/B testing feedback: "it isn't clear that the information has transferred because the information isn't listed on the right side of the screen."
- **Auto-generated "Reason to Attach"**: Users at intermediate and expert level interpret the auto-generated statement as a system conclusion, increasing hesitation when data is inconsistent. Experts rewrite it to ground decisions in documented evidence. Cathy DeCook: "identified an error in the auto-generated statement."
- **Record image vs. index**: Expert users want the actual document image, not just the indexed fields. The "view record" link exists but is not prominently emphasized — easy to miss. Nearly every advanced user sought the original record artifact before committing.
- **Instant add without edit checkpoint**: Wendy Rupper: "Surprised by instantaneous add action; desired edit checkpoint and orientation within tree before irreversible commit." Trust decreases when control or conflict visibility is removed.

**Secondary friction:**
- **External sources**: Adding sources from outside FamilySearch (Ancestry, FindMyPast, books, oral history) requires too many steps — expert users consistently flag this.
- **Source threshold**: Some heavy contributors have hit a maximum number of sources that can be attached (Thais Garcia).
- **"Different" badge discoverability**: Despite being the primary conflict signal (see layout description above), its low visual weight and secondary position below the tree value mean novice users frequently miss it, and intermediate users notice it but aren't sure what action to take.
- **Children add flow**: The "Open" button for adding new children from the record is present but not prominently explained.
- **Discoverability of the linker itself**: Novice users often don't know how to get from a search result to actually attaching a source.
- **Merge direction confusion**: "When merging two different people you have to merge it a certain way, otherwise it does not work" — expert users know this; others don't.
- **Transfer animation visibility**: A/B testing feedback — "bringing over additional information does not show that it has happened until you check on the Detail page."
- **Multi-tab state sync**: In desktop SL, if you open multiple tabs and change something in one, the other tabs don't update (bug reported by Sister Rupper).
- **Search navigation**: "The main navigation search menu is too long and is confusing as to which search he should use" — Elder Bryson, noted as a common complaint among users he helps.
- **Ancestry preferred for duplicates**: Both Sister Lambert and Sister Sue Lambert noted Ancestry is better at finding duplicates.

## Validation Lifecycle (Observed Across All Experience Levels)

Research testing across 20 participants identified a consistent 5-step validation pattern before attaching:

1. **Evaluate** — User assesses source credibility and visible data fields (names, dates, places)
2. **Compare** — User manually aligns names, dates, relationships, and context against tree data
3. **Calibrate** — User determines plausibility and confidence level; this is where AI reasoning helps most
4. **Commit** — User decides to attach or reject; pre-commit scope requirement expands with experience
5. **Confirm** — User verifies structural outcome in tree or person page before finalizing trust

**Key finding**: Manual comparison remains primary across all segments. No user delegated final decision authority to AI. AI functions best as a reasoning layer inside step 3 (Calibrate) — reducing cognitive effort without replacing human-led validation.

## AI Reasoning & Trust Patterns (From ADE Testing)

These patterns were observed across 20 sessions testing AI-assisted attachment flows (V1, V2) vs. non-AI Source Linker.

**What builds trust:**
- Visible data alignment (names, dates, places clearly matched)
- AI reasoning that references specific observable fields — not abstract conclusions
- Explicit explanation of why minor discrepancies don't disqualify a match
- Immediate access to original record image
- Relational context (parents, spouse, siblings) visible before committing
- Clear post-commit confirmation of what was added and where it appears in the tree

**What breaks trust:**
- Reasoning that summarizes rather than exposes underlying evidence
- Abstract or authoritative framing ("this is a match" vs. "here's why this likely matches")
- Missing or hard-to-find source/record access
- Outcome ambiguity after attaching — "did anything actually change?"
- Auto-generated reasoning that users know is wrong or generic

**Trust formula observed**: Trust = visible data alignment + grounded reasoning + user verification

**Universal behavioral finding**: AI did not replace manual validation in any user segment. Users anchor trust in visible evidence. AI increases confidence when it organizes and reflects that evidence — not when it replaces it.

**Segment-specific AI behavior:**
- **Advanced users**: AI reasoning useful when it mirrors their verification heuristics (parent age, geography, relationship alignment); used to calibrate confidence ("98% possible"), not to decide
- **Intermediate users**: AI reduces scanning effort and surfaces alignment logic; confidence drops quickly when date attribution or record labeling is unclear
- **Novice users**: AI is acceptable when it supports clear step-by-step comparison grounded in visible alignment; confidence from matching fields, not AI authority
- **New users**: AI perceived positively when it reduces effort ("takes effort away"); trust is usability-dependent — relies on readable text, visible source origin, guided navigation

## What Each Persona Cares About Here

**Expert**:
- View record image (not just index) — non-negotiable before attaching
- Quick path from record to attach with full family context visible
- "Different" badges as actionable quality signals
- Adding new children from record (high-value discovery workflow)
- Ability to add external sources easily
- Source count as a quality indicator on the person page
- Edit checkpoint before irreversible commits
- Explicit mismatch signaling — not only confirmation states
- Wants to annotate rejected hints so others don't misattach
- Filtering tools to prioritize hints for people without completed temple work

**Intermediate**:
- Clear visual feedback on what the source confirms vs. conflicts
- "Different" badge is meaningful and actionable
- Easy path from hints to attachment with original record accessible
- Newly discovered children visible and easy to add
- Sources showing up connected to the data they back up
- Progress indicator that accurately describes what "1 of 3" means
- Clear distinction between system-generated and user-authored reasoning

**Novice**:
- Simple guided attach flow
- Plain-language explanation of what "attaching a source" means and why it matters
- Visual confirmation that something happened after attaching
- "Different" badge needs explanation
- Children comparison section may be confusing without context
- Reassurance mechanisms (ability to go back, undo) to reduce fear of mistakes
- "Save for later" pathway clearly explained

**First-Time**:
- Very low awareness this workflow exists; needs plain-language framing before mechanics make sense
- The two-column layout may feel complex
- The Attach button is clear but the decision of whether to attach is not
- Needs strong confirmation cues and visible post-attach state change
- Should not be shown already-attached hints
- Larger, clearly legible text; strong interaction feedback on clicks

## Source Linker Lite (In Testing — Not Yet Shipped)

### What It Is
Source Linker Lite (internally called "Simple Source Linker") is a new, separate product currently in the testing/discovery phase. It is **not** the full Source Linker — it is a lightweight slide-out side panel designed to let users attach records to their ancestors without leaving their current page or workflow.

**Official tagline from Figma:** *"Attach sources to your ancestors without interrupting your flow"*

It is the slide-out panel being prototyped in v17 of the person page.

### Design
- **Format:** ~440px wide slide-out panel, overlays the right side of the current page
- **Layout (top to bottom):**
  1. Header with "Review and Add" title and close (X) button
  2. RecordBlock — record thumbnail image + title (e.g., "Iowa, County Census") + "View record" inline button
  3. Person data block — person avatar, name, dates, birth/residence/relationship facts
  4. Relationship context — parents, siblings listed below person
  5. Footer with 3 action buttons: **Cancel · Not a Match · Add** (primary CTA)

### Product Context
- Discovery began in earnest Q1 2026
- Being explored in relation to two adjacent flows:
  - **Tree's potential person hint flow** — could surface as part of reviewing a potential person match
  - **ADE's AI linking flow** — could be the attachment UI when ADE suggests a record link
- Tested in conjunction with Karl K. (ADE team) Feb–Apr 2026
- More testing needed before committing to direction

### Key Open Questions (as of testing)
- Does the simplified panel give users enough context to feel confident attaching without the full two-column Source Linker?
- How do users react to losing the side-by-side comparison model they are accustomed to?
- What happens when there are discrepancies — does the panel surface them clearly enough?
- How does it integrate with the existing "Change Person" flow?

### What Personas Care About Here
- **Expert:** Likely to miss the full record image and family comparison context; will want a clear path to the full Source Linker if needed
- **Intermediate:** May appreciate the reduced friction for simple, high-confidence matches; will still want to see discrepancies flagged clearly
- **Novice/New:** The simplified format may actually reduce overwhelm — but needs strong confirmation cues and reassurance that they can undo or see more

## Research Session Reference (ADE Add Flow Testing, Feb 2026)

20 sessions across 3 prototypes (V1 AI reasoning, V2 AI reasoning, non-AI Source Linker):

| Participant | Type | Prototype | Key Insight |
|-------------|------|-----------|-------------|
| Ray | Advanced | V1 | AI reasoning mirrors heuristics; used probability language ("98% possible") to calibrate, not decide |
| Wendy (V1) | Advanced | V1 | "Can I trust this?" — needs family adjacency and original image before committing |
| Sister Volunteer | Advanced | V1 | AI reasoning useful as orientation layer; still verifies full family relationships before attaching |
| Wendy Rupper | Advanced | V2 | Structured verifier; mirroring Source Linker mental model; wanted edit checkpoint before instant add |
| Mary Jo Young | Advanced | V2 | Fixer orientation; requires multiple records before temple work; "jury still out" on AI |
| Carin Price | Advanced | V2 | Long-tenured; strong AI enthusiasm; still double-checks before final commitment |
| Sister Bowles | Advanced | V2 | Temple-focused; enthusiastic adopter; did not realize she added a new person (believed she attached a record) |
| Carrie Jackson | Advanced | V2 | Cross-platform triangulator; prefers "Save for Later" before permanence |
| Cathina Douglas | Non-AI SL | Source Linker | Discrepancy-sensitive; needs original document before deciding; confused by auto-generated "Reason to Attach" |
| Sister Bromley | Non-AI SL | Source Linker | Source-first verifier; reviews Person page sources before engaging hints |
| Cathy DeCook | Non-AI SL | Source Linker | Structured verifier; identified error in auto-generated reasoning; "AI is doing all our thinking for us" |
| Liliana Easily | Non-AI SL | Source Linker | Edit-first mental model; expected visible confirmation; confused by multi-person flow |
| Agustina Müller | Non-AI SL | Source Linker | Image-first verifier; verifies AI outputs independently; "I don't take it for granted" |
| Session 3 | Beginner-Intermediate | V2 | Ordinance-driven; field alignment sufficient to proceed; wanted added child reflected in tree |
| Luanna Pay | New | V2 | Ordinance-focused; optimistic AI adopter; needed sources visible and confirmation of what changed |
| Annie Stevens | New | V2 | Temple-focused, minimal validation; accessibility constraints (small text); needs guided navigation |
| Ann Rawlings | Intermediate | V2 (Variation B) | AI increases confidence when it explains what evidence belongs to whom |
| Gale Curren | Novice-Intermediate | V2 | Proceeds cautiously; "taking AI's word for it"; requested tree view after attachment |
| Josie | Novice | V1 | Teen; guided learner; nervousness about mistakes; confirmation cues essential |
| Byron Halling | New-Intermediate | V1 | Self-described "rookie"; data alignment critical; rationale was "extremely important" to confidence |
