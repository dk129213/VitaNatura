"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { PaperPlaneRight, ArrowRight } from "@phosphor-icons/react";
import type { Script, ChatNode } from "@/lib/scripts";
import { useVita } from "@/lib/store";

type Msg = { from: "bot" | "user"; text: string; key: string };

const TYPING_MS = 650;

export function ChatPanel({
  script,
  title = "Vita",
  onEnd,
  className = "",
}: {
  script: Script;
  title?: string;
  onEnd?: () => void;
  className?: string;
}) {
  const patch = useVita((s) => s.patch);
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [node, setNode] = useState<ChatNode | null>(null);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Plays a node's bot lines one by one, then shows its replies.
  const play = (n: ChatNode) => {
    setNode(null);
    const delay = reduce ? 0 : TYPING_MS;
    n.bot.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => {
          setTyping(i < n.bot.length);
          timers.current.push(
            setTimeout(() => {
              setMessages((m) => [...m, { from: "bot", text: line, key: `b${counter.current++}` }]);
              if (i === n.bot.length - 1) {
                setTyping(false);
                setNode(n);
                if (n.end || n.replies.length === 0) onEnd?.();
              }
            }, delay),
          );
        }, i * (delay + 250)),
      );
    });
  };

  useEffect(() => {
    // Start on the next tick so the effect itself never sets state synchronously.
    timers.current.push(setTimeout(() => play(script.start), 0));
    const t = timers.current;
    return () => t.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, node, reduce]);

  const answer = (text: string, next: string, p?: object) => {
    setMessages((m) => [...m, { from: "user", text, key: `u${counter.current++}` }]);
    if (p) patch(p);
    const target = script[next];
    if (target) play(target);
  };

  const submitFree = (e: React.FormEvent) => {
    e.preventDefault();
    if (!node?.freeTextNext || !draft.trim()) return;
    answer(draft.trim(), node.freeTextNext, node.freeTextPatch?.(draft.trim()));
    setDraft("");
  };

  return (
    <section
      aria-label={`Conversation with ${title}`}
      className={`flex flex-col rounded-2xl border border-line bg-surface shadow-soft overflow-hidden ${className}`}
    >
      <header className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="grid size-9 place-items-center rounded-full bg-accent text-accent-ink font-semibold">V</span>
        <div className="leading-tight">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-ink-3">Scripted demo, no live AI</p>
        </div>
      </header>

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-5 py-5" aria-live="polite">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.key}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className={m.from === "user" ? "flex justify-end" : "flex"}
            >
              <p
                className={
                  m.from === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-accent-ink"
                    : "max-w-[85%] rounded-2xl rounded-bl-md bg-surface-2 px-4 py-2.5"
                }
              >
                {m.text}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <div className="flex" aria-label="Vita is typing">
            <span className="flex gap-1 rounded-2xl bg-surface-2 px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-ink-3 animate-pulse"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <footer className="border-t border-line px-5 py-4 space-y-3">
        {node && node.replies.length > 0 && (
          <div className="flex flex-col items-end gap-2">
            {node.replies.map((r) => (
              <button
                key={r.label}
                onClick={() => answer(r.label, r.next, r.patch)}
                className={`max-w-[90%] rounded-2xl border px-4 py-2 text-left transition active:scale-[0.98] ${
                  r.tone === "danger"
                    ? "border-danger/40 text-danger hover:bg-danger-soft"
                    : "border-accent/40 text-accent hover:bg-accent-soft"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
        {node?.end && (
          <div className="flex justify-end">
            <Link
              href={node.end.href}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-medium text-accent-ink transition active:scale-[0.98]"
            >
              {node.end.label} <ArrowRight weight="bold" />
            </Link>
          </div>
        )}
        <form onSubmit={submitFree} className="flex items-center gap-2">
          <label htmlFor={`chat-${title}`} className="sr-only">
            Type a message
          </label>
          <input
            id={`chat-${title}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={!node?.freeTextNext}
            placeholder={node?.freeTextNext ? "Type in any language" : "Pick an answer above"}
            className="flex-1 rounded-xl border border-line bg-bg px-4 py-2.5 placeholder:text-ink-3 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!node?.freeTextNext}
            aria-label="Send"
            className="grid size-11 place-items-center rounded-full bg-accent text-accent-ink disabled:opacity-40"
          >
            <PaperPlaneRight weight="fill" />
          </button>
        </form>
      </footer>
    </section>
  );
}
