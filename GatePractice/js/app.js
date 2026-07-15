import { QuestionEngine } from './questionEngine.js';
import { computeAnalytics } from './analytics.js';
import { Timer } from './timer.js';
import { renderDashboard } from './dashboard.js';
import { renderReview } from './review.js';
import { setupTabs, renderQuestionView, collectAnswer, renderPalette, renderSearchResults, toast } from './ui.js';
import { loadState, saveState, withAutoSave, upsertProgress, ensureUniquePush, removeValue } from './storage.js';
import { applyTheme, toggleTheme } from './theme.js';
import { summarizeTest, evaluateQuestion } from './testEngine.js';

const state = {
  data: {
    subjects: [],
    questions: []
  },
  storage: loadState(),
  questionEngine: null,
  session: null,
  currentIndex: 0,
  timer: null,
  lastReviewPayload: null
};

async function init() {
  setupTabs();
  bindStaticEvents();

  await loadData();
  state.questionEngine = new QuestionEngine(state.data.questions);

  const theme = applyTheme(state.storage.settings.theme);
  state.storage.settings.theme = theme;
  saveState(state.storage);

  populateSubjectDropdown();
  refreshAll();

  if (state.storage.currentSession?.questionIds?.length) {
    document.getElementById('resumeSessionBtn').disabled = false;
  }
}

async function loadData() {
  const subjectsResponse = await fetch('./data/subjects.json');
  const subjects = await subjectsResponse.json();

  const questionArrays = await Promise.all(
    subjects.subjects.map(async (subject) => {
      const response = await fetch(`./data/${subject.file}`);
      const payload = await response.json();
      return payload.questions;
    })
  );

  state.data.subjects = subjects.subjects;
  state.data.questions = questionArrays.flat();
}

function populateSubjectDropdown() {
  const select = document.getElementById('subjectSelect');
  state.data.subjects.forEach((subject) => {
    const option = document.createElement('option');
    option.value = subject.code;
    option.textContent = subject.name;
    select.appendChild(option);
  });
}

function bindStaticEvents() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    withAutoSave(state.storage, (draft) => {
      draft.settings.theme = toggleTheme(draft.settings.theme);
      applyTheme(draft.settings.theme);
    });
  });

  document.getElementById('resumeSessionBtn').addEventListener('click', () => {
    if (!state.storage.currentSession) {
      toast('No session available to resume.');
      return;
    }
    state.session = structuredClone(state.storage.currentSession);
    state.currentIndex = Math.min(state.session.currentIndex || 0, state.session.questionIds.length - 1);
    startTimer(state.session.durationSec || null, state.session.elapsedSec || 0);
    mountQuestion();
    activateTab('practicePanel');
    toast('Session resumed.');
  });

  document.getElementById('testBuilderForm').addEventListener('submit', (event) => {
    event.preventDefault();
    startNewSessionFromForm();
  });

  document.getElementById('runSearchBtn').addEventListener('click', runSearch);

  document.getElementById('prevQuestionBtn').addEventListener('click', () => navigateQuestion(-1));
  document.getElementById('nextQuestionBtn').addEventListener('click', () => navigateQuestion(1));
  document.getElementById('saveResponseBtn').addEventListener('click', saveCurrentResponse);
  document.getElementById('markReviewBtn').addEventListener('click', markReview);
  document.getElementById('clearResponseBtn').addEventListener('click', clearResponse);
  document.getElementById('submitTestBtn').addEventListener('click', submitSession);

  document.getElementById('noteInput').addEventListener('change', () => {
    if (!state.session) return;
    const id = state.session.questionIds[state.currentIndex];
    const note = document.getElementById('noteInput').value.trim();
    if (!state.session.responses[id]) state.session.responses[id] = {};
    state.session.responses[id].note = note;
    persistSession();
    toast('Note saved');
  });

  document.getElementById('paletteGrid').addEventListener('click', (event) => {
    const target = event.target.closest('[data-palette-index]');
    if (!target || !state.session) return;
    saveCurrentResponse(false);
    state.currentIndex = Number(target.dataset.paletteIndex);
    state.session.currentIndex = state.currentIndex;
    persistSession();
    mountQuestion();
  });

  document.getElementById('searchResults').addEventListener('click', (event) => {
    const button = event.target.closest('[data-jump-id]');
    if (!button) return;
    const id = button.dataset.jumpId;
    const q = state.questionEngine.getById(id);
    if (!q) return;

    const singleSession = {
      mode: 'custom',
      startedAt: Date.now(),
      durationSec: null,
      elapsedSec: 0,
      questionIds: [id],
      responses: {},
      currentIndex: 0
    };

    state.session = singleSession;
    state.currentIndex = 0;
    startTimer(null, 0);
    persistSession();
    mountQuestion();
    activateTab('practicePanel');
  });

  document.addEventListener('keydown', (event) => {
    if (!state.session) return;
    if (event.key === 'ArrowRight') navigateQuestion(1);
    if (event.key === 'ArrowLeft') navigateQuestion(-1);
    if (event.key.toLowerCase() === 's') saveCurrentResponse();
    if (event.key.toLowerCase() === 'm') markReview();
    if (event.key.toLowerCase() === 'c') clearResponse();
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') submitSession();
  });
}

function startNewSessionFromForm() {
  const mode = document.getElementById('modeSelect').value;
  const subject = document.getElementById('subjectSelect').value;
  const difficulty = document.getElementById('difficultySelect').value;
  const topic = document.getElementById('topicInput').value;
  const count = Number(document.getElementById('questionCount').value || 10);
  const durationMin = Number(document.getElementById('durationInput').value || 30);

  const questionSet = state.questionEngine.buildTestSet(
    mode,
    { subject, difficulty, topic, count },
    state.storage
  );

  if (!questionSet.length) {
    toast('No questions found for selected filters.');
    return;
  }

  state.session = {
    mode,
    startedAt: Date.now(),
    durationSec: mode === 'timed' || mode === 'mock' ? durationMin * 60 : null,
    elapsedSec: 0,
    questionIds: questionSet.map((q) => q.id),
    responses: {},
    currentIndex: 0
  };
  state.currentIndex = 0;
  startTimer(state.session.durationSec, 0);
  persistSession();
  mountQuestion();
  activateTab('practicePanel');
  toast(`Started ${mode.toUpperCase()} session.`);
}

function startTimer(limitSec, elapsedSec = 0) {
  if (state.timer) state.timer.stop();
  state.timer = new Timer(() => {
    if (!state.session) return;
    state.session.elapsedSec = state.timer.elapsedSec;
    persistSession();

    const currentQuestion = getCurrentQuestion();
    if (currentQuestion) {
      renderQuestionView(
        currentQuestion,
        state.currentIndex,
        state.session.questionIds.length,
        state.session.responses[currentQuestion.id],
        state.timer.format(state.timer.getRemainingSec() ?? state.timer.elapsedSec)
      );
    }

    if (state.timer.getRemainingSec() === 0 && state.session.durationSec != null) {
      submitSession();
    }
  });
  state.timer.elapsedSec = elapsedSec;
  state.timer.start(limitSec);
}

function getCurrentQuestion() {
  if (!state.session) return null;
  const id = state.session.questionIds[state.currentIndex];
  return state.questionEngine.getById(id);
}

function mountQuestion() {
  const question = getCurrentQuestion();
  if (!question || !state.session) return;

  const response = state.session.responses[question.id] || {};
  renderQuestionView(
    question,
    state.currentIndex,
    state.session.questionIds.length,
    response,
    state.timer.format(state.timer.getRemainingSec() ?? state.timer.elapsedSec)
  );
  renderPalette(state.session, state.currentIndex);

  document.getElementById('practiceMeta').textContent = `${question.subject} • ${question.topic} • ${state.session.mode.toUpperCase()} mode`;
  document.getElementById('noteInput').value = response.note || '';
}

function saveCurrentResponse(showToast = true) {
  if (!state.session) return;
  const question = getCurrentQuestion();
  const answer = collectAnswer(question);

  if (!state.session.responses[question.id]) {
    state.session.responses[question.id] = {};
  }

  state.session.responses[question.id].answer = answer;
  state.session.responses[question.id].markedForReview = state.session.responses[question.id].markedForReview || false;
  state.session.responses[question.id].note = document.getElementById('noteInput').value.trim();

  persistSession();
  renderPalette(state.session, state.currentIndex);
  if (showToast) toast('Response saved.');
}

function markReview() {
  if (!state.session) return;
  const question = getCurrentQuestion();
  if (!state.session.responses[question.id]) {
    state.session.responses[question.id] = { answer: '' };
  }
  const current = !!state.session.responses[question.id].markedForReview;
  state.session.responses[question.id].markedForReview = !current;
  persistSession();
  renderPalette(state.session, state.currentIndex);
  toast(!current ? 'Marked for review' : 'Review mark removed');
}

function clearResponse() {
  if (!state.session) return;
  const question = getCurrentQuestion();
  if (!state.session.responses[question.id]) {
    state.session.responses[question.id] = {};
  }
  state.session.responses[question.id].answer = question.type === 'MSQ' ? [] : '';
  persistSession();
  mountQuestion();
  toast('Response cleared.');
}

function navigateQuestion(step) {
  if (!state.session) return;
  saveCurrentResponse(false);
  const next = state.currentIndex + step;
  if (next < 0 || next >= state.session.questionIds.length) return;
  state.currentIndex = next;
  state.session.currentIndex = next;
  persistSession();
  mountQuestion();
}

function submitSession() {
  if (!state.session) return;
  saveCurrentResponse(false);

  state.timer?.stop();
  state.session.elapsedSec = state.timer?.elapsedSec || state.session.elapsedSec;

  const questionMap = new Map(state.data.questions.map((q) => [q.id, q]));
  const result = summarizeTest(state.session, questionMap);

  withAutoSave(state.storage, (draft) => {
    const todayKey = new Date().toISOString().split('T')[0];
    draft.dailyActivity[todayKey] = (draft.dailyActivity[todayKey] || 0) + 1;

    state.session.questionIds.forEach((id) => {
      const question = questionMap.get(id);
      const response = state.session.responses[id] || {};
      const evaluation = evaluateQuestion(question, response.answer);
      const existing = draft.progress[id] || {};

      upsertProgress(draft, id, {
        attempts: (existing.attempts || 0) + 1,
        correctAttempts: (existing.correctAttempts || 0) + (evaluation.verdict === 'correct' ? 1 : 0),
        wrongAttempts: (existing.wrongAttempts || 0) + (evaluation.verdict === 'wrong' ? 1 : 0),
        timeSpentSec: (existing.timeSpentSec || 0) + Math.round((state.session.elapsedSec || 0) / state.session.questionIds.length),
        lastAnswer: response.answer ?? '',
        lastResult: evaluation.verdict,
        reviewed: !!response.markedForReview,
        note: response.note || existing.note || '',
        bookmarked: existing.bookmarked || false,
        subject: question.subject,
        topic: question.topic
      });

      if (evaluation.verdict === 'wrong') {
        ensureUniquePush(draft.wrongQuestions, id);
        ensureUniquePush(draft.revisionQueue, id);
      } else if (evaluation.verdict === 'correct') {
        removeValue(draft.revisionQueue, id);
      }
    });

    const completed = {
      mode: state.session.mode,
      completedAt: Date.now(),
      questionIds: [...state.session.questionIds],
      responses: state.session.responses,
      result
    };

    draft.testHistory.push(completed);
    draft.recentTests = draft.testHistory.slice(-10);
    draft.currentSession = null;
  });

  state.storage = loadState();
  state.lastReviewPayload = {
    session: state.storage.testHistory.at(-1),
    questionMap
  };

  state.session = null;
  state.currentIndex = 0;
  document.getElementById('questionText').textContent = 'No active question.';
  document.getElementById('questionOptions').innerHTML = '';
  document.getElementById('paletteGrid').innerHTML = '';
  document.getElementById('progressText').textContent = '0 / 0';

  refreshAll();
  activateTab('reviewPanel');
  toast(`Submitted. Final Marks: ${result.finalMarks.toFixed(2)} | Accuracy: ${result.accuracy}%`);
}

function runSearch() {
  const query = document.getElementById('searchInput').value;
  const status = document.getElementById('searchStatus').value;
  const subject = document.getElementById('subjectSelect').value;
  const difficulty = document.getElementById('difficultySelect').value;
  const topic = document.getElementById('topicInput').value;

  const rows = state.questionEngine.query({ query, status, subject, difficulty, topic }, state.storage);
  renderSearchResults(document.getElementById('searchResults'), rows.slice(0, 100));
}

function renderAnalyticsPanel(stats) {
  const panel = document.getElementById('analyticsPanel');

  panel.innerHTML = `
    <div class="panel-header">
      <h2>Analytics</h2>
      <p class="subtle">Track progress across attempts</p>
    </div>

    <div class="analytics-grid">
      <article class="chart-card">
        <h3>Topic-wise Accuracy</h3>
        ${bars(stats.topicAccuracy, 'topic')}
      </article>

      <article class="chart-card">
        <h3>Difficulty-wise Accuracy</h3>
        ${bars(stats.difficultyAccuracy, 'difficulty')}
      </article>

      <article class="chart-card">
        <h3>Accuracy Over Time</h3>
        ${trendRows(stats.trend)}
      </article>

      <article class="chart-card">
        <h3>Daily Heatmap (Last 4 Weeks)</h3>
        <div class="heatmap">
          ${stats.heatmap
            .map((entry) => {
              const opacity = Math.min(entry.value / 4, 1);
              return `<div class="heat-cell" title="${entry.key}: ${entry.value} sessions" style="background:rgba(79,140,255,${opacity});"></div>`;
            })
            .join('')}
        </div>
      </article>
    </div>
  `;
}

function bars(rows, labelKey) {
  if (!rows.length) return '<p class="subtle">No data yet.</p>';
  return `
    <div class="bar-wrap">
      ${rows
        .map(
          (row) => `
          <div class="bar-row">
            <span>${row[labelKey]}</span>
            <div class="bar" style="width:${Math.max(row.accuracy, 5)}%"></div>
            <span>${row.accuracy}%</span>
          </div>
        `
        )
        .join('')}
    </div>
  `;
}

function trendRows(trend) {
  if (!trend.length) return '<p class="subtle">No completed tests yet.</p>';
  return trend
    .map(
      (item) => `
      <div class="search-item">
        <span>${item.date}</span>
        <strong>${item.accuracy}%</strong>
      </div>
    `
    )
    .join('');
}

function refreshAll() {
  const stats = computeAnalytics(state.storage, state.data.questions);
  renderDashboard(document.getElementById('dashboardPanel'), stats);
  renderAnalyticsPanel(stats);
  renderReview(document.getElementById('reviewPanel'), state.lastReviewPayload);
}

function activateTab(panelId) {
  document.querySelectorAll('.tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.target === panelId);
  });
  document.querySelectorAll('.panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === panelId);
  });
}

function persistSession() {
  if (!state.session) return;
  withAutoSave(state.storage, (draft) => {
    draft.currentSession = { ...state.session, currentIndex: state.currentIndex };
  });
}

window.addEventListener('beforeunload', () => {
  if (state.session) persistSession();
});

init().catch((error) => {
  console.error(error);
  toast('Failed to initialize. Use a local static server (e.g., Live Server).');
});
