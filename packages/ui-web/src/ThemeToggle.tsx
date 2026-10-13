"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

import { Button } from "./Button";
import "./ThemeToggle.css";

const STORAGE_KEY = "vvp-theme";
const listeners = new Set<() => void>();

// Session fallback for when localStorage throws (private/sandboxed
// contexts): without it, setIsDark's write would fail silently and
// getIsDark would keep re-deriving the same value from matchMedia on every
// read, making the toggle look inert even though the click registered.
let memoryIsDark: boolean | null = null;

function getIsDark(): boolean {
  if (memoryIsDark !== null) return memoryIsDark;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "dark";
  } catch {
    // localStorage can throw (e.g. blocked storage in private/sandboxed
    // contexts) — fall back to OS preference below.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// The server can't know the stored/OS preference, so it always reports
// light. useSyncExternalStore uses this consistently during hydration
// (matching the server-rendered markup exactly), then re-renders with the
// real client value right after — no hydration mismatch, unlike reading
// localStorage in a mount effect.
function getServerIsDark(): boolean {
  return false;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", callback);
  };
}

function setIsDark(next: boolean) {
  memoryIsDark = next;
  try {
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // Storage unavailable — the toggle still works for this session via
    // memoryIsDark above, it just won't persist across reloads.
  }
  listeners.forEach((listener) => listener());
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

/**
 * Fixed-corner light/dark toggle. Persists to localStorage, falls back to
 * `prefers-color-scheme`, and flips the `dark` class on `<html>` — the same
 * convention the `--vvp-*` tokens' `.dark` scope expects. Browser-only (no
 * Divi/React Native use case), so it always renders — there's no server
 * variant to opt out of.
 */
export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getIsDark, getServerIsDark);

  // Only synchronizes the DOM with the resolved value — never calls
  // setState, so it can't trigger cascading renders.
  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() => setIsDark(!isDark)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="vvp-ui-theme-toggle"
    >
      {isDark ? (
        <Sun size={16} aria-hidden="true" />
      ) : (
        <Moon size={16} aria-hidden="true" />
      )}
    </Button>
  );
}
