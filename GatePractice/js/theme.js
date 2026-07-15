export function applyTheme(theme) {
  const normalized = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', normalized);
  return normalized;
}

export function toggleTheme(current) {
  return current === 'dark' ? 'light' : 'dark';
}
