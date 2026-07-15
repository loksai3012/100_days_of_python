export function renderReview(container, payload) {
  if (!payload?.session) {
    container.innerHTML = '<p class="subtle">Submit a test to review detailed solutions.</p>';
    return;
  }

  const { session, questionMap } = payload;

  container.innerHTML = `
    <div class="panel-header">
      <h2>Solution Review</h2>
      <p class="subtle">${session.questionIds.length} questions</p>
    </div>
    <div class="review-grid">
      ${session.questionIds
        .map((id, idx) => {
          const q = questionMap.get(id);
          const attempt = session.responses[id] || {};
          const answerText = formatAnswer(attempt.answer);
          return `
            <article class="review-card">
              <h3>Q${idx + 1} • ${q.id}</h3>
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
          `;
        })
        .join('')}
    </div>
  `;
}

function formatAnswer(answer) {
  if (Array.isArray(answer)) return answer.join(', ') || 'Skipped';
  if (answer == null || answer === '') return 'Skipped';
  return String(answer);
}
