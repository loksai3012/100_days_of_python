export function setupTabs() {
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.panel'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => p.classList.toggle('active', p.id === target));
    });
  });
}

export function renderQuestionView(question, index, total, response, timerText) {
  const badge = document.getElementById('questionBadge');
  const tags = document.getElementById('questionTags');
  const timer = document.getElementById('questionTimer');
  const text = document.getElementById('questionText');
  const options = document.getElementById('questionOptions');

  badge.textContent = `Q${index + 1}/${total}`;
  timer.textContent = timerText;
  text.textContent = question.question;

  tags.innerHTML = `
    <span class="tag">${question.subject}</span>
    <span class="tag">${question.topic}</span>
    <span class="tag">${question.difficulty}</span>
    <span class="tag">${question.type}</span>
    <span class="tag">+${question.marks} / -${question.negativeMarks}</span>
  `;

  if (question.type === 'NAT') {
    options.innerHTML = `
      <label class="field">
        <span>Enter numeric answer</span>
        <input id="natAnswerInput" type="number" step="any" value="${response?.answer ?? ''}" />
      </label>
    `;
    return;
  }

  const isMSQ = question.type === 'MSQ';
  options.innerHTML = question.options
    .map((opt) => {
      const checked = isMSQ
        ? Array.isArray(response?.answer) && response.answer.includes(opt.key)
        : response?.answer === opt.key;
      const inputType = isMSQ ? 'checkbox' : 'radio';
      return `
        <label class="option">
          <input type="${inputType}" name="answerOption" value="${opt.key}" ${checked ? 'checked' : ''} />
          <span><strong>${opt.key}.</strong> ${opt.text}</span>
        </label>
      `;
    })
    .join('');
}

export function collectAnswer(question) {
  if (question.type === 'NAT') {
    return document.getElementById('natAnswerInput')?.value ?? '';
  }

  const selected = Array.from(document.querySelectorAll('input[name="answerOption"]:checked')).map((el) => el.value);
  if (question.type === 'MSQ') return selected;
  return selected[0] ?? '';
}

export function renderPalette(session, currentIndex) {
  const palette = document.getElementById('paletteGrid');
  const progress = document.getElementById('progressText');

  const answeredCount = Object.values(session.responses).filter((r) => {
    if (!r) return false;
    if (Array.isArray(r.answer)) return r.answer.length > 0;
    return r.answer !== '' && r.answer != null;
  }).length;

  progress.textContent = `${answeredCount} / ${session.questionIds.length}`;

  palette.innerHTML = session.questionIds
    .map((id, idx) => {
      const response = session.responses[id];
      const classes = ['palette-item'];
      if (idx === currentIndex) classes.push('current');
      if (response?.markedForReview) classes.push('review');
      const hasAnswer =
        response && (Array.isArray(response.answer) ? response.answer.length > 0 : response.answer !== '' && response.answer != null);
      if (hasAnswer) classes.push('answered');

      return `<button class="${classes.join(' ')}" data-palette-index="${idx}">${idx + 1}</button>`;
    })
    .join('');
}

export function renderSearchResults(container, rows) {
  if (!rows.length) {
    container.innerHTML = '<p class="subtle">No matching questions.</p>';
    return;
  }

  container.innerHTML = rows
    .map(
      (q) => `
      <div class="search-item">
        <div>
          <strong>${q.id}</strong>
          <p class="subtle">${q.subject} • ${q.topic} • ${q.difficulty}</p>
        </div>
        <button class="btn secondary" data-jump-id="${q.id}">Open</button>
      </div>
    `
    )
    .join('');
}

export function toast(message) {
  const existing = document.getElementById('toastEl');
  if (existing) existing.remove();

  const toastEl = document.createElement('div');
  toastEl.id = 'toastEl';
  toastEl.className = 'badge';
  toastEl.style.position = 'fixed';
  toastEl.style.right = '20px';
  toastEl.style.bottom = '20px';
  toastEl.style.zIndex = '2000';
  toastEl.textContent = message;
  document.body.appendChild(toastEl);

  setTimeout(() => toastEl.remove(), 1800);
}
