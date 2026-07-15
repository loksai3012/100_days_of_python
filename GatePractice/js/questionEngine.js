import { filterQuestions } from './search.js';

export class QuestionEngine {
  constructor(questions) {
    this.questions = questions;
    this.byId = new Map(questions.map((q) => [q.id, q]));
    this.orderIndexById = new Map(questions.map((q, idx) => [q.id, idx + 1]));
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
      count = 10,
      from = null,
      to = null
    } = options;

    let pool = this.query({ subject, topic, difficulty }, storageState);
    pool = this.filterByRange(pool, from, to);

    if (mode === 'wrong') {
      pool = pool.filter((q) => storageState.wrongQuestions.includes(q.id));
    }

    if (mode === 'bookmarked') {
      pool = pool.filter((q) => storageState.bookmarks.includes(q.id));
    }

    if (mode === 'mock') {
      const linearMockPool = this.filterByRange(this.questions, from, to);
      return linearMockPool.slice(0, Math.min(65, linearMockPool.length));
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

  filterByRange(questions, from, to) {
    const normalizedFrom = Number.isFinite(from) && from > 0 ? Math.floor(from) : null;
    const normalizedTo = Number.isFinite(to) && to > 0 ? Math.floor(to) : null;

    if (normalizedFrom == null && normalizedTo == null) return questions;

    const start = normalizedFrom ?? 1;
    const end = Math.max(start, normalizedTo ?? Number.MAX_SAFE_INTEGER);

    return questions.filter((q) => {
      const order = this.orderIndexById.get(q.id);
      if (order == null) return false;
      return order >= start && order <= end;
    });
  }
}
