import { filterQuestions } from './search.js';

export class QuestionEngine {
  constructor(questions) {
    this.questions = questions;
    this.byId = new Map(questions.map((q) => [q.id, q]));
  }

  getById(id) {
    return this.byId.get(id) || null;
  }

  query(criteria, storageState) {
    return filterQuestions(this.questions, criteria, storageState);
  }

  buildTestSet(mode, options, storageState) {
    const {
      subject = 'all',
      topic = '',
      difficulty = 'all',
      count = 10
    } = options;

    let pool = this.query({ subject, topic, difficulty }, storageState);

    if (mode === 'wrong') {
      pool = pool.filter((q) => storageState.wrongQuestions.includes(q.id));
    }

    if (mode === 'bookmarked') {
      pool = pool.filter((q) => storageState.bookmarks.includes(q.id));
    }

    if (mode === 'mixed') {
      pool = shuffle(pool);
    }

    if (mode === 'mock') {
      pool = shuffle(this.questions).slice(0, Math.min(65, this.questions.length));
      return pool;
    }

    if (mode === 'practice' && pool.length > 0) {
      const unseenFirst = [...pool].sort((a, b) => {
        const pa = storageState.progress[a.id]?.attempts || 0;
        const pb = storageState.progress[b.id]?.attempts || 0;
        return pa - pb;
      });
      return unseenFirst.slice(0, Math.min(count, unseenFirst.length));
    }

    return pool.slice(0, Math.min(count, pool.length));
  }
}

function shuffle(array) {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
