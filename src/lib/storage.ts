import { BusinessSettings, HistoryEntry, MessageTemplate } from './types';

const KEYS = {
  settings: 'rrg_settings',
  history: 'rrg_history',
  customTemplates: 'rrg_custom_templates',
  recentServices: 'rrg_recent_services',
};

export function getSettings(): BusinessSettings | null {
  const raw = localStorage.getItem(KEYS.settings);
  return raw ? JSON.parse(raw) : null;
}

export function saveSettings(s: BusinessSettings) {
  localStorage.setItem(KEYS.settings, JSON.stringify(s));
}

export function getHistory(): HistoryEntry[] {
  const raw = localStorage.getItem(KEYS.history);
  return raw ? JSON.parse(raw) : [];
}

export function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(KEYS.history, JSON.stringify(entries.slice(0, 100)));
}

export function addHistoryEntry(entry: HistoryEntry) {
  const history = getHistory();
  history.unshift(entry);
  saveHistory(history);
}

export function updateHistoryEntry(id: string, updates: Partial<HistoryEntry>) {
  const history = getHistory();
  const idx = history.findIndex((e) => e.id === id);
  if (idx !== -1) {
    history[idx] = { ...history[idx], ...updates };
    saveHistory(history);
  }
}

export function deleteHistoryEntry(id: string) {
  const history = getHistory().filter((e) => e.id !== id);
  saveHistory(history);
}

export function clearHistory() {
  localStorage.removeItem(KEYS.history);
}

export function getCustomTemplates(): MessageTemplate[] {
  const raw = localStorage.getItem(KEYS.customTemplates);
  return raw ? JSON.parse(raw) : [];
}

export function saveCustomTemplates(templates: MessageTemplate[]) {
  localStorage.setItem(KEYS.customTemplates, JSON.stringify(templates));
}

export function getRecentServices(): string[] {
  const raw = localStorage.getItem(KEYS.recentServices);
  return raw ? JSON.parse(raw) : [];
}

export function addRecentService(service: string) {
  if (!service.trim()) return;
  const recent = getRecentServices().filter((s) => s !== service);
  recent.unshift(service);
  localStorage.setItem(KEYS.recentServices, JSON.stringify(recent.slice(0, 10)));
}
