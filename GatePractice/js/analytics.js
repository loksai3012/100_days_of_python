export function computeAnalytics(state, questions) {
  const progressEntries = Object.entries(state.progress);
  const totalQuestions = questions.length;
  const solved = progressEntries.filter(([, p]) => p.lastResult === 'correct').length;
  const wrong = progressEntries.filter(([, p]) => p.lastResult === 'wrong').length;
  const attempted = progressEntries.filter(([, p]) => (p.attempts || 0) > 0).length;
  const accuracy = attempted ? Number(((solved / attempted) * 100).toFixed(2)) : 0;

  const totalTimeSpentSec = progressEntries.reduce((sum, [, p]) => sum + (p.timeSpentSec || 0), 0);
  const averageTimeSec = attempted ? Math.round(totalTimeSpentSec / attempted) : 0;

  const topicMap = {};
  const difficultyMap = {};
  questions.forEach((q) => {
    const p = state.progress[q.id] || {};
    const entry = p.lastResult || 'unseen';

    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, wrong: 0, total: 0 };
    if (!difficultyMap[q.difficulty]) difficultyMap[q.difficulty] = { correct: 0, wrong: 0, total: 0 };

    topicMap[q.topic].total += 1;
    difficultyMap[q.difficulty].total += 1;

    if (entry === 'correct') {
      topicMap[q.topic].correct += 1;
      difficultyMap[q.difficulty].correct += 1;
    }
    if (entry === 'wrong') {
      topicMap[q.topic].wrong += 1;
      difficultyMap[q.difficulty].wrong += 1;
    }
  });

  const topicAccuracy = Object.entries(topicMap).map(([topic, stat]) => ({
    topic,
    accuracy: stat.total ? Math.round((stat.correct / stat.total) * 100) : 0,
    ...stat
  }));

  const difficultyAccuracy = Object.entries(difficultyMap).map(([difficulty, stat]) => ({
    difficulty,
    accuracy: stat.total ? Math.round((stat.correct / stat.total) * 100) : 0,
    ...stat
  }));

  const strongTopics = topicAccuracy.filter((t) => t.total >= 1).sort((a, b) => b.accuracy - a.accuracy).slice(0, 5);
  const weakTopics = topicAccuracy.filter((t) => t.total >= 1).sort((a, b) => a.accuracy - b.accuracy).slice(0, 5);

  const trend = state.testHistory.slice(-30).map((test) => ({
    date: new Date(test.completedAt).toLocaleDateString(),
    accuracy: test.result.accuracy,
    marks: test.result.finalMarks
  }));

  const streakInfo = computeStreak(state.dailyActivity);
  const heatmap = buildHeatmap(state.dailyActivity);

  return {
    totalQuestions,
    solved,
    wrong,
    remaining: Math.max(totalQuestions - solved, 0),
    accuracy,
    attempted,
    totalTimeSpentSec,
    averageTimeSec,
    strongTopics,
    weakTopics,
    topicAccuracy,
    difficultyAccuracy,
    trend,
    streakInfo,
    recentTests: state.recentTests || [],
    bookmarks: state.bookmarks,
    wrongQuestions: state.wrongQuestions,
    revisionQueue: state.revisionQueue,
    heatmap
  };
}

function computeStreak(dailyActivity) {
  const days = Object.keys(dailyActivity).sort();
  if (!days.length) return { currentStreak: 0, longestStreak: 0 };

  let currentStreak = 0;
  let longestStreak = 0;
  let rolling = 0;
  let prevDate = null;

  days.forEach((dayKey) => {
    const currentDate = new Date(dayKey);
    if (!prevDate) {
      rolling = 1;
    } else {
      const diff = Math.round((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      rolling = diff === 1 ? rolling + 1 : 1;
    }
    if (rolling > longestStreak) longestStreak = rolling;
    prevDate = currentDate;
  });

  const today = new Date();
  let pointer = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  while (true) {
    const key = pointer.toISOString().split('T')[0];
    if (dailyActivity[key]) {
      currentStreak += 1;
      pointer.setDate(pointer.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

function buildHeatmap(dailyActivity) {
  const now = new Date();
  const items = [];
  for (let i = 27; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const value = dailyActivity[key] || 0;
    items.push({ key, value });
  }
  return items;
}
