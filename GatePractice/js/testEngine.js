function normalizeNat(value) {
  const numeric = Number(String(value).trim());
  return Number.isFinite(numeric) ? numeric : null;
}

export function evaluateQuestion(question, userAnswer) {
  if (userAnswer == null || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    return { verdict: 'skipped', marksObtained: 0 };
  }

  if (question.type === 'MCQ') {
    const isCorrect = userAnswer === question.correctAnswer;
    return {
      verdict: isCorrect ? 'correct' : 'wrong',
      marksObtained: isCorrect ? question.marks : -Math.abs(question.negativeMarks || 0)
    };
  }

  if (question.type === 'MSQ') {
    const ans = [...new Set(userAnswer)].sort().join('|');
    const corr = [...new Set(question.correctAnswer)].sort().join('|');
    const isCorrect = ans === corr;
    return {
      verdict: isCorrect ? 'correct' : 'wrong',
      marksObtained: isCorrect ? question.marks : -Math.abs(question.negativeMarks || 0)
    };
  }

  if (question.type === 'NAT') {
    const entered = normalizeNat(userAnswer);
    if (entered == null) return { verdict: 'wrong', marksObtained: -Math.abs(question.negativeMarks || 0) };

    const expected = Number(question.correctAnswer);
    const tolerance = Number(question.tolerance ?? 0);
    const isCorrect = Math.abs(entered - expected) <= tolerance;
    return {
      verdict: isCorrect ? 'correct' : 'wrong',
      marksObtained: isCorrect ? question.marks : -Math.abs(question.negativeMarks || 0)
    };
  }

  return { verdict: 'wrong', marksObtained: 0 };
}

export function summarizeTest(session, questionMap) {
  const result = {
    total: session.questionIds.length,
    correct: 0,
    wrong: 0,
    skipped: 0,
    score: 0,
    negativeMarks: 0,
    finalMarks: 0,
    accuracy: 0,
    timeTakenSec: session.elapsedSec,
    topicStats: {},
    difficultyStats: {}
  };

  session.questionIds.forEach((id) => {
    const question = questionMap.get(id);
    const attempt = session.responses[id];
    const evaluation = evaluateQuestion(question, attempt?.answer);

    if (evaluation.verdict === 'correct') result.correct += 1;
    if (evaluation.verdict === 'wrong') {
      result.wrong += 1;
      if (evaluation.marksObtained < 0) {
        result.negativeMarks += Math.abs(evaluation.marksObtained);
      }
    }
    if (evaluation.verdict === 'skipped') result.skipped += 1;

    result.score += Math.max(evaluation.marksObtained, 0);
    result.finalMarks += evaluation.marksObtained;

    accumulate(result.topicStats, question.topic, evaluation.verdict);
    accumulate(result.difficultyStats, question.difficulty, evaluation.verdict);
  });

  result.accuracy = result.total ? Number(((result.correct / result.total) * 100).toFixed(2)) : 0;
  result.rankEstimate = estimateRank(result.finalMarks, result.total);
  return result;
}

function accumulate(target, key, verdict) {
  if (!target[key]) {
    target[key] = { correct: 0, wrong: 0, skipped: 0, attempts: 0 };
  }
  target[key][verdict] += 1;
  if (verdict !== 'skipped') target[key].attempts += 1;
}

function estimateRank(finalMarks, totalQuestions) {
  if (!totalQuestions) return null;
  const normalized = Math.max(0, (finalMarks / (totalQuestions * 2)) * 100);
  if (normalized > 85) return 'Top 1k';
  if (normalized > 70) return 'Top 3k';
  if (normalized > 55) return 'Top 8k';
  if (normalized > 40) return 'Top 15k';
  return 'Needs Improvement';
}
