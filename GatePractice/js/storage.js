const STORAGE_KEY = 'gate_practice_v1';

const defaultState = {
  version: 1,
  settings: {
    theme: 'dark'
  },
  progress: {},
  wrongQuestions: [],
  bookmarks: [],
  revisionQueue: [],
  testHistory: [],
  recentTests: [],
  currentSession: null,
  dailyActivity: {}
};

const clone = (value) => JSON.parse(JSON.stringify(value));

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return clone(defaultState);
    }
    const parsed = JSON.parse(raw);
    return {
      ...clone(defaultState),
      ...parsed,
      settings: { ...defaultState.settings, ...(parsed.settings || {}) }
    };
  } catch {
    return clone(defaultState);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function withAutoSave(state, updater) {
  updater(state);
  saveState(state);
  return state;
}

export function resetState() {
  saveState(clone(defaultState));
  return clone(defaultState);
}

export function upsertProgress(state, questionId, payload) {
  const existing = state.progress[questionId] || {
    attempts: 0,
    correctAttempts: 0,
    wrongAttempts: 0,
    timeSpentSec: 0,
    lastAnswer: null,
    lastResult: 'unseen',
    reviewed: false,
    note: '',
    bookmarked: false,
    updatedAt: null,
    subject: '',
    topic: ''
  };
  state.progress[questionId] = {
    ...existing,
    ...payload,
    updatedAt: Date.now()
  };
}

export function ensureUniquePush(list, value) {
  if (!list.includes(value)) {
    list.push(value);
  }
}

export function removeValue(list, value) {
  const index = list.indexOf(value);
  if (index >= 0) {
    list.splice(index, 1);
  }
}
