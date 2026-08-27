"use client";

import { useEffect, useSyncExternalStore } from "react";

import { Button } from "./Button";
import "./ThemeToggle.css";

const STORAGE_KEY = "vvp-theme";
const listeners = new Set<() => void>();

function getIsDark(): boolean {
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
  try {
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  } catch {
    // Storage unavailable — the toggle still works for this session via
    // the in-memory listeners below, it just won't persist.
  }
  listeners.forEach((listener) => listener());
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

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
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
