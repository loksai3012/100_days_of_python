export function filterQuestions(questions, criteria, storageState) {
  const {
    query = '',
    subject = 'all',
    difficulty = 'all',
    topic = '',
    status = 'all'
  } = criteria;

  const q = query.trim().toLowerCase();
  const topicQ = topic.trim().toLowerCase();

  return questions.filter((question) => {
    const progress = storageState.progress[question.id];
    const isSolved = progress?.lastResult === 'correct';
    const isWrong = progress?.lastResult === 'wrong';
    const isBookmarked = storageState.bookmarks.includes(question.id);

    if (subject !== 'all' && question.subject !== subject) return false;
    if (difficulty !== 'all' && question.difficulty !== difficulty) return false;
    if (topicQ && !question.topic.toLowerCase().includes(topicQ)) return false;

    if (status === 'solved' && !isSolved) return false;
    if (status === 'unsolved' && isSolved) return false;
    if (status === 'wrong' && !isWrong) return false;
    if (status === 'bookmarked' && !isBookmarked) return false;

    if (!q) return true;

    const inKeywords =
      question.id.toLowerCase().includes(q) ||
      question.question.toLowerCase().includes(q) ||
      question.topic.toLowerCase().includes(q) ||
      question.subject.toLowerCase().includes(q);

    return inKeywords;
  });
}
