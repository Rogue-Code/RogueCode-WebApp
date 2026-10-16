"use client";

import { Excalidraw, serializeAsJSON } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useMemo, useRef } from "react";
import { loadScene, saveScene } from "./storage";

type ExcalidrawProps = React.ComponentProps<typeof Excalidraw>;
type OnChange = NonNullable<ExcalidrawProps["onChange"]>;

export default function Board({
  id,
  onSaved,
  onSaveFailed,
}: {
  id: string;
  onSaved: () => void;
  onSaveFailed: () => void;
}) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastSaved = useRef<string | null>(null);

  const initialData = useMemo(() => {
    const raw = loadScene(id);
    if (!raw) return null;
    try {
      const scene = JSON.parse(raw);
      return { elements: scene.elements, appState: scene.appState, files: scene.files, scrollToContent: true };
    } catch {
      return null;
    }
  }, [id]);

  const onChange: OnChange = (elements, appState, files) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const json = serializeAsJSON(elements, appState, files, "local");
      if (json === lastSaved.current) return;
      lastSaved.current = json;
      if (saveScene(id, json)) onSaved();
      else onSaveFailed();
    }, 600);
  };

  return (
    <Excalidraw
      initialData={initialData}
      onChange={onChange}
      name="Rogue Code Jamboard"
      UIOptions={{ canvasActions: { toggleTheme: true } }}
    />
  );
}
