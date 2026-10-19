"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/layout/LogoMark";
import { Icon } from "@/components/ui/Icon";
import { deleteScene, loadIndex, newBoardId, saveIndex, type BoardMeta } from "./storage";

const Board = dynamic(() => import("./Board"), {
  ssr: false,
  loading: () => <p className="p-8 font-mono text-sm text-muted">Loading board…</p>,
});

/** Board tabs + canvas. Rendered client-only (it reads localStorage on first render). */
export default function JamboardApp() {
  const [boards, setBoards] = useState<BoardMeta[]>(loadIndex);
  const [activeId, setActiveId] = useState(() => boards[0].id);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [status, setStatus] = useState<"saved" | "full" | null>(null);

  useEffect(() => saveIndex(boards), [boards]);

  const touch = (id: string) =>
    setBoards((bs) => bs.map((b) => (b.id === id ? { ...b, updatedAt: Date.now() } : b)));

  function addBoard() {
    const board = { id: newBoardId(), name: `Board ${boards.length + 1}`, updatedAt: Date.now() };
    setBoards([...boards, board]);
    setActiveId(board.id);
    setConfirmDelete(false);
  }

  function rename(id: string, name: string) {
    const trimmed = name.trim();
    if (trimmed) setBoards((bs) => bs.map((b) => (b.id === id ? { ...b, name: trimmed } : b)));
    setRenaming(null);
  }

  function removeActive() {
    deleteScene(activeId);
    const rest = boards.filter((b) => b.id !== activeId);
    setBoards(rest);
    setActiveId(rest[0].id);
    setConfirmDelete(false);
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-ink">
      <header className="flex flex-wrap items-center gap-3 border-b border-line px-4 py-2.5">
        <Link href="/academy" className="flex items-center gap-2 font-bold text-paper" aria-label="Back to Rogue Academy">
          <LogoMark className="h-7" />
          <span className="hidden sm:inline">jamboard</span>
        </Link>

        <div role="tablist" aria-label="Boards" className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto">
          {boards.map((b) =>
            renaming === b.id ? (
              <input
                key={b.id}
                autoFocus
                defaultValue={b.name}
                aria-label="Board name"
                onBlur={(e) => rename(b.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") rename(b.id, e.currentTarget.value);
                  if (e.key === "Escape") setRenaming(null);
                }}
                className="min-h-9 w-36 rounded-full border border-gold bg-ink px-3.5 text-sm text-paper"
              />
            ) : (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={b.id === activeId}
                title="Double-click to rename"
                onClick={() => {
                  setActiveId(b.id);
                  setConfirmDelete(false);
                }}
                onDoubleClick={() => setRenaming(b.id)}
                className={`min-h-9 flex-none cursor-pointer rounded-full border px-3.5 text-sm whitespace-nowrap ${
                  b.id === activeId ? "border-paper bg-paper font-semibold text-ink" : "border-outline text-paper"
                }`}
              >
                {b.name}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={addBoard}
            aria-label="New board"
            className="inline-flex size-9 flex-none cursor-pointer items-center justify-center rounded-full border border-dashed border-outline"
          >
            <Icon name="plus" size={16} />
          </button>
        </div>

        <span role="status" className="hidden font-mono text-xs text-subtle md:inline">
          {status === "full" ? (
            <span className="text-gold">Storage full — export your board</span>
          ) : status === "saved" ? (
            "saved on this device"
          ) : null}
        </span>

        {boards.length > 1 &&
          (confirmDelete ? (
            <span className="flex items-center gap-2 text-sm">
              Delete this board?
              <button type="button" onClick={removeActive} className="cursor-pointer rounded-full bg-gold px-3 py-1.5 font-semibold text-ink">
                Delete
              </button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="cursor-pointer px-2 py-1.5 text-muted">
                Cancel
              </button>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              aria-label="Delete board"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-muted hover:text-gold"
            >
              <Icon name="trash" size={17} />
            </button>
          ))}
      </header>

      <div className="relative flex-1">
        <Board
          key={activeId}
          id={activeId}
          onSaved={() => {
            setStatus("saved");
            touch(activeId);
          }}
          onSaveFailed={() => setStatus("full")}
        />
      </div>
    </div>
  );
}
