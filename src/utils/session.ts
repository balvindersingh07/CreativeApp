const UID_KEY = "cc_user_id";
const TID_KEY = "cc_thread_id";

export function getUserId() {
  try {
    let id = localStorage.getItem(UID_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(UID_KEY, id); }
    return id;
  } catch { return undefined; }
}
export function getThreadId() {
  try { return localStorage.getItem(TID_KEY) || undefined; } catch { return undefined; }
}
export function setThreadId(id?: string) {
  try { if (id) localStorage.setItem(TID_KEY, id); } catch {}
}
export function clearThread() {
  try { localStorage.removeItem(TID_KEY); } catch {}
}


