const secToReadable = (value) => {
  const min = Math.floor((value || 0) / 60);
  const hr = Math.floor(min / 60);
  if (hr > 0) return `${hr}h ${min % 60}m`;
  return `${min}m`;
};

export function renderDashboard(container, stats) {
  container.innerHTML = `
    <div class="metrics-grid">
      ${metric('Subjects', String(new Set(stats.topicAccuracy.map((t) => t.topic)).size || 0))}
      ${metric('Total Questions', stats.totalQuestions)}
      ${metric('Solved Questions', stats.solved)}
      ${metric('Remaining Questions', stats.remaining)}
      ${metric('Accuracy', `${stats.accuracy}%`)}
      ${metric('Current Streak', `${stats.streakInfo.currentStreak} days`)}
      ${metric('Longest Streak', `${stats.streakInfo.longestStreak} days`)}
      ${metric('Average Time', secToReadable(stats.averageTimeSec))}
      ${metric('Total Time Spent', secToReadable(stats.totalTimeSpentSec))}
      ${metric('Wrong Questions', stats.wrongQuestions.length)}
      ${metric('Revision Queue', stats.revisionQueue.length)}
      ${metric('Bookmarks', stats.bookmarks.length)}
    </div>

    <div class="board-grid">
      <div class="list-card">
        <h3>Strong Topics</h3>
        ${topicList(stats.strongTopics, 'topic')}
      </div>
      <div class="list-card">
        <h3>Weak Topics</h3>
        ${topicList(stats.weakTopics, 'topic')}
      </div>
      <div class="list-card">
        <h3>Recent Tests</h3>
        ${recentTests(stats.recentTests)}
      </div>
      <div class="list-card">
        <h3>Mistake Notebook</h3>
        <p class="subtle">Wrong questions: ${stats.wrongQuestions.length}</p>
        <p class="subtle">Ready for revision: ${stats.revisionQueue.length}</p>
      </div>
    </div>
  `;
}

function metric(label, value) {
  return `<article class="metric"><h4>${label}</h4><strong>${value}</strong></article>`;
}

function topicList(items, key) {
  if (!items.length) return '<p class="subtle">No activity yet.</p>';
  return `
    <div class="bar-wrap">
      ${items
        .map(
          (entry) => `
          <div class="bar-row">
            <span>${entry[key]}</span>
            <div class="bar" style="width:${Math.max(entry.accuracy, 6)}%"></div>
            <span>${entry.accuracy}%</span>
          </div>
        `
        )
        .join('')}
    </div>
  `;
}

function recentTests(tests) {
  if (!tests.length) return '<p class="subtle">No tests completed yet.</p>';
  return tests
    .slice()
    .reverse()
    .map(
      (test) => `
        <div class="search-item">
          <span>${test.mode.toUpperCase()} • ${new Date(test.completedAt).toLocaleString()}</span>
          <strong>${test.result.finalMarks.toFixed(2)} marks</strong>
        </div>
      `
    )
    .join('');
}
