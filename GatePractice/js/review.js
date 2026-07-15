let reviewIndex = 0;
let activeReviewKey = '';

export function renderReview(container, payload) {
  if (!payload?.session) {
    reviewIndex = 0;
    activeReviewKey = '';
    container.innerHTML = '<p class="subtle">Submit a test to review detailed solutions.</p>';
    return;
  }

  const { session, questionMap } = payload;
  const reviewKey = `${session.completedAt}-${session.questionIds.length}`;

  if (reviewKey !== activeReviewKey) {
    reviewIndex = 0;
    activeReviewKey = reviewKey;
  }

  reviewIndex = Math.max(0, Math.min(reviewIndex, session.questionIds.length - 1));
  const id = session.questionIds[reviewIndex];
  const q = questionMap.get(id);
  const attempt = session.responses[id] || {};
  const answerText = formatAnswer(attempt.answer);

  container.innerHTML = `
    <div class="panel-header">
      <h2>Solution Review</h2>
      <p class="subtle">Question ${reviewIndex + 1} of ${session.questionIds.length}</p>
    </div>
    <div class="inline-controls">
      <button class="btn secondary" data-review-step="-1" ${reviewIndex === 0 ? 'disabled' : ''}>Previous Explanation</button>
      <button class="btn secondary" data-review-step="1" ${reviewIndex === session.questionIds.length - 1 ? 'disabled' : ''}>Next Explanation</button>
    </div>
    <div class="review-grid">
      <article class="review-card">
        <h3>Q${reviewIndex + 1} • ${q.id}</h3>
        <p><strong>Topic:</strong> ${q.topic}</p>
        <p><strong>Difficulty:</strong> ${q.difficulty}</p>
        <p><strong>Your Answer:</strong> ${answerText}</p>
        <p><strong>Correct Answer:</strong> ${formatAnswer(q.correctAnswer)}</p>
        <p><strong>Explanation:</strong> ${q.explanation}</p>
        <p><strong>Shortcut:</strong> ${q.shortcut}</p>
        <p><strong>Common Mistake:</strong> ${q.commonMistakes}</p>
        <p><strong>Related Concepts:</strong> ${(q.relatedConcepts || []).join(', ')}</p>
        <p><strong>Estimated Time:</strong> ${q.estimatedSolvingTimeSec}s</p>
      </article>
    </div>
  `;
}

export function stepReview(container, payload, step) {
  if (!payload?.session) return;
  reviewIndex += step;
  renderReview(container, payload);
}

function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(', ') || 'Skipped';
  if (answer == null || answer === '') return 'Skipped';
  return String(answer);
}
