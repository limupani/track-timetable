# track · timetable

A university timetable app built with React + Vite.  
Students select their courses once and see their weekly schedule — no login, no setup.

---

## Tech Stack

- **React + Vite** — frontend
- **localStorage** — saves selected courses between visits
- **Vercel** — hosting (auto-deploys on every push to GitHub)

---

## Project Structure

```
src/
  constants/        ← day names, colours, storage key
  utils/            ← pure helper functions (time, course formatting)
  hooks/            ← reusable React hooks (selections, clock)
  components/
    Schedule/       ← main timetable view
    Picker/         ← course selection screen
  styles/           ← all inline style objects
  data/
    sessions.js     ← timetable data (auto-generated, do not edit by hand)
scripts/
  update-timetable.js  ← run this every new semester
```

---

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Updating the Timetable (New Semester)

Follow these steps every time the university releases a new timetable.

### Step 1 — Download the new timetable

Go to the university Google Sheet with the new semester timetable.  
**File → Download → Microsoft Excel (.xlsx)**  
Save it anywhere on your computer.

### Step 2 — Run the update script

Open a terminal inside the project folder and run:

```bash
npm run update-timetable -- path/to/timetable.xlsx
```

**Example on Windows:**
```bash
npm run update-timetable -- D:/track/timetable.xlsx
```

**Example on Mac:**
```bash
npm run update-timetable -- ~/Downloads/timetable.xlsx
```

The script will print each day it processes and confirm how many sessions were found:

```
📂  Reading: D:/track/timetable.xlsx
✅  Monday: 87 sessions
✅  Tuesday: 79 sessions
✅  Wednesday: 82 sessions
✅  Thursday: 74 sessions
✅  Friday: 65 sessions
🎉  Done! 387 sessions written to src/data/sessions.js
```

### Step 3 — Check it locally (optional but recommended)

```bash
npm run dev
```

Open the app, pick a course, and make sure the times look right.

### Step 4 — Deploy

```bash
git add .
git commit -m "Update timetable — [semester name]"
git push
```

Vercel picks up the push and redeploys automatically within 30 seconds.  
The live site is updated — no other steps needed.

---

## Troubleshooting

**`Cannot find module 'xlsx'`**  
Run `npm install` first, then try the update command again.

**Script says "No sessions found"**  
Make sure you downloaded the file as `.xlsx` (not `.csv` or a PDF).  
The sheet tabs must be named Monday, Tuesday, etc.

**Deployed site looks different from local**  
Clear your browser cache or open in an incognito window.

---

## Notes

- `src/data/sessions.js` is auto-generated — never edit it by hand.
- If selected courses disappear after an update, it means the section names changed in the new timetable. Students just need to re-select their courses once.

---

*More features coming soon.*
