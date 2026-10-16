// Jamboard boards are stored in this browser's localStorage.
// TODO: once student accounts are live, sync boards to Firestore so they follow the student.

export type BoardMeta = { id: string; name: string; updatedAt: number };

const INDEX_KEY = "rc_jamboard_index";
const boardKey = (id: string) => `rc_jamboard_${id}`;

export function newBoardId() {
  return Math.random().toString(36).slice(2, 10);
}

export function loadIndex(): BoardMeta[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const boards = raw ? (JSON.parse(raw) as BoardMeta[]) : [];
    if (boards.length) return boards;
  } catch {}
  return [{ id: newBoardId(), name: "Board 1", updatedAt: Date.now() }];
}

export function saveIndex(boards: BoardMeta[]) {
  try {
    localStorage.setItem(INDEX_KEY, JSON.stringify(boards));
  } catch {}
}

export function loadScene(id: string): string | null {
  try {
    return localStorage.getItem(boardKey(id));
  } catch {
    return null;
  }
}

/** Returns false when the browser refused to store it (usually: storage full because of large images). */
export function saveScene(id: string, json: string): boolean {
  try {
    localStorage.setItem(boardKey(id), json);
    return true;
  } catch {
    return false;
  }
}

export function deleteScene(id: string) {
  try {
    localStorage.removeItem(boardKey(id));
  } catch {}
}
