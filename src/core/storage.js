const SAVE_KEY = "ordinary-life-save-v1";

export function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function loadState() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || typeof parsed.currentCardId !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSavedState() {
  localStorage.removeItem(SAVE_KEY);
}
