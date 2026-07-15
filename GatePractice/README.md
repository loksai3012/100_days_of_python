# Offline GATE CS Practice Platform

A production-style offline platform for long-term GATE Computer Science practice using only **HTML5, CSS3, and Vanilla JavaScript (ES6 modules)**.

## Features

- Fully offline-first architecture (no backend, no external API)
- Professional responsive UI with dark/light mode and persistence
- Question types: **MCQ, MSQ, NAT**
- Test modes: Practice, Topic, Timed, Custom, Mixed, Wrong, Bookmarked, Mock
- Detailed post-test review: explanations, shortcuts, mistakes, concepts
- Auto-save local persistence for progress, notes, bookmarks, wrong questions, revision queue, settings, current session, and history
- Analytics dashboard: accuracy trend, topic/difficulty performance, streaks, heatmap, speed metrics
- Search/filter by question ID, keyword, topic, subject, difficulty, solved/unsolved/wrong/bookmarked
- Keyboard shortcuts: **←, →, S, M, C, Enter**

## Folder Structure

```text
GatePractice/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── questionEngine.js
│   ├── storage.js
│   ├── analytics.js
│   ├── timer.js
│   ├── ui.js
│   ├── dashboard.js
│   ├── testEngine.js
│   ├── review.js
│   ├── search.js
│   └── theme.js
├── data/
│   ├── subjects.json
│   ├── operating_systems.json
│   ├── dbms.json
│   └── computer_networks.json
├── images/
├── pdf/
└── README.md
```

## Architecture

- **app.js**: bootstrap, orchestration, global state transitions
- **questionEngine.js**: question indexing, filtering, mode-specific test set creation
- **testEngine.js**: answer evaluation and score summary computation
- **storage.js**: localStorage schema and persistence helpers
- **analytics.js**: derived metrics, streaks, topic/difficulty aggregates, heatmap data
- **ui.js**: render helpers for practice palette, question card, search list, toasts, tabs
- **dashboard.js**: dashboard cards and metrics blocks
- **review.js**: detailed per-question post-test review rendering
- **timer.js**: reusable timer abstraction
- **search.js**: unified search/filter pipeline
- **theme.js**: theme application and toggle behavior

## Data Format

Each subject file contains:

```json
{
  "subject": "Operating Systems",
  "questions": [
    {
      "id": "OS-001",
      "subject": "OS",
      "topic": "Process Scheduling",
      "difficulty": "medium",
      "type": "MCQ",
      "marks": 1,
      "negativeMarks": 0.33,
      "question": "...",
      "options": [{ "key": "A", "text": "..." }],
      "correctAnswer": "A",
      "explanation": "...",
      "shortcut": "...",
      "commonMistakes": "...",
      "relatedConcepts": ["..."],
      "estimatedSolvingTimeSec": 45
    }
  ]
}
```

For NAT, keep `options: []` and use numeric `correctAnswer` (optional `tolerance`).

## Add a New Subject (No Code Changes)

1. Add a new JSON file inside `data/` with valid question objects.
2. Add one entry in `data/subjects.json` with:
   - `code`
   - `name`
   - `file`
3. Reload app; subject appears automatically in test builder and search.

## Running Locally

Because ES modules and JSON fetching are used, run from a static server:

### Option A: VS Code Live Server
Open `GatePractice/index.html` with Live Server.

### Option B: Python static server

```bash
cd GatePractice
python -m http.server 8080
```

Open `http://localhost:8080`.

## Local Storage Design

Single key: `gate_practice_v1`

Schema includes:

- `settings.theme`
- `progress[questionId]`
- `wrongQuestions[]`
- `bookmarks[]`
- `revisionQueue[]`
- `testHistory[]`
- `recentTests[]`
- `currentSession`
- `dailyActivity[YYYY-MM-DD]`

All user actions auto-save.

## Customization

- Update color tokens in `css/style.css` for branding.
- Extend test strategy in `js/questionEngine.js`.
- Add analytics views in `js/analytics.js` + render in `js/app.js`.
- Add additional metadata fields in JSON and map in review UI.

## PDF Workflow

This app does not render PDFs in test mode. Questions must be structured JSON. You can run a separate conversion pipeline from PDFs to this schema and drop resulting files into `data/`.
