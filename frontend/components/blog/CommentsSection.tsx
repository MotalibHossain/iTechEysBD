"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, User, Mail } from "lucide-react";
import Avatar from "./Avatar";
import { ArticleComment } from "@/lib/data/article-data";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "guest" | "signup";
interface AuthedUser { name: string; email: string }

// ── Small helpers ─────────────────────────────────────────────────────────────

function IconInput(props: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ElementType }) {
  const { icon: Icon, ...rest } = props;
  return (
    <div className="relative">
      <Icon size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4" />
      <input
        className="w-full pl-10 pr-4 py-2.75 border border-line-2 rounded-btn text-[14px] text-ink bg-surface outline-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-ink-5"
        {...rest}
      />
    </div>
  );
}

// ── Inline reply form ─────────────────────────────────────────────────────────

function ReplyForm({ onPost, onCancel }: { onPost: (t: string) => void; onCancel: () => void }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-3 ml-14">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply…"
        rows={2}
        className="w-full border border-line-2 bg-surface rounded-btn px-4 py-3 text-[14px] leading-normal text-ink outline-none resize-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-ink-5"
      />
      <div className="flex gap-2 justify-end mt-2">
        <button onClick={onCancel} className="text-[13px] font-semibold text-ink-3 hover:text-ink px-3 py-1.5 transition-colors cursor-pointer">
          Cancel
        </button>
        <button
          onClick={() => { const t = text.trim(); if (t) { onPost(t); setText(""); } }}
          className="text-[13px] font-bold bg-ink text-white px-4 py-1.5 rounded-[9px] hover:bg-brand transition-colors cursor-pointer"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

// ── Reply item ────────────────────────────────────────────────────────────────

function ReplyItem({ reply }: { reply: ArticleComment["replies"][number] }) {
  return (
    <div className="flex gap-3 mt-4 pl-4 border-l-2 border-line-2">
      <Avatar src={reply.avatar} alt={reply.name} size={30} className="border border-line mt-0.5 shrink-0" />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-bold text-ink">{reply.name}</span>
          <span className="text-[11.5px] text-ink-5">{reply.time}</span>
        </div>
        <p className="text-[14px] leading-[1.6] text-ink-2 mt-1">{reply.body}</p>
      </div>
    </div>
  );
}

// ── Comment item ──────────────────────────────────────────────────────────────

function CommentItem({
  comment,
  onReply,
}: {
  comment: ArticleComment;
  onReply: (id: string, text: string) => void;
}) {
  const [replying, setReplying] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="py-5 border-b border-line-2 last:border-0">
      <div className="flex gap-3.5">
        <Avatar src={comment.avatar} alt={comment.name} size={44} className="border-2 border-line shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[15px] font-bold text-ink">{comment.name}</span>
            <span className="text-[12px] text-ink-5">{comment.time}</span>
          </div>

          <p className="text-[15px] leading-[1.7] text-ink-2 mt-1.5">{comment.body}</p>

          <div className="flex items-center gap-4 mt-2.5">
            <button
              onClick={() => setLiked((l) => !l)}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${liked ? "text-brand" : "text-ink-4 hover:text-brand"}`}
            >
              <ThumbsUp size={13} strokeWidth={2} fill={liked ? "currentColor" : "none"} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setReplying((r) => !r)}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-4 hover:text-ink transition-colors cursor-pointer"
            >
              <MessageSquare size={13} strokeWidth={2} />
              Reply
            </button>
          </div>

          {/* Reply form */}
          {replying && (
            <ReplyForm
              onPost={(text) => { onReply(comment.id, text); setReplying(false); }}
              onCancel={() => setReplying(false)}
            />
          )}

          {/* Nested replies */}
          {comment.replies.length > 0 && (
            <div className="mt-2 space-y-1">
              {comment.replies.map((r) => <ReplyItem key={r.id} reply={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CommentsSection({ initialComments }: { initialComments: ArticleComment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [tab, setTab] = useState<Tab>("guest");
  const [authed, setAuthed] = useState<AuthedUser | null>(null);

  // Guest form
  const [guestName, setGuestName] = useState("");
  const [draft, setDraft] = useState("");

  // Signup form
  const [signName, setSignName] = useState("");
  const [signEmail, setSignEmail] = useState("");

  const displayName = authed?.name ?? guestName;

  const postComment = () => {
    const text = draft.trim();
    const name = displayName.trim();
    if (!text || !name) return;
    setComments((prev) => [
      { id: `c-${Date.now()}`, name, avatar: "", time: "just now", likes: 0, body: text, replies: [] },
      ...prev,
    ]);
    setDraft("");
    if (!authed) setGuestName("");
  };

  const handleSignup = () => {
    const name = signName.trim();
    const email = signEmail.trim();
    if (!name || !email) return;
    setAuthed({ name, email });
    setTab("guest");
    setSignName("");
    setSignEmail("");
  };

  const handleReply = (commentId: string, text: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, { id: `r-${Date.now()}`, name: displayName || "You", avatar: "", time: "just now", body: text }] }
          : c
      )
    );
  };

  const canPost = draft.trim().length > 0 && displayName.trim().length > 0;
  const canSignup = signName.trim().length > 0 && signEmail.trim().length > 0;

  return (
    <section className="pt-10 border-t border-line-2">
      <div className="flex items-center gap-3 mb-7">
        <MessageSquare size={20} strokeWidth={2} className="text-brand" />
        <h2 className="font-newsreader text-[26px] font-semibold tracking-[-0.4px] text-ink">
          Comments{" "}
          <span className="text-ink-5 font-normal text-[22px]">({comments.length})</span>
        </h2>
      </div>

      {/* Composer card ──────────────────────────────────────────────────── */}
      <div className="bg-surface border border-line rounded-card-lg overflow-hidden mb-8">

        {!authed && (
          <div className="grid grid-cols-2 border-b border-line-2">
            {(["guest", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-3.5 text-[13.5px] font-bold transition-colors cursor-pointer ${
                  tab === t
                    ? "text-brand border-b-2 border-brand -mb-px bg-surface"
                    : "text-ink-3 bg-surface-warm hover:text-ink"
                }`}
              >
                {t === "guest" ? "Comment as Guest" : "Create Account"}
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          {authed && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-surface-warm rounded-btn">
              <Avatar src="" alt={authed.name} size={36} />
              <div className="min-w-0">
                <p className="text-[13.5px] font-bold text-ink truncate">{authed.name}</p>
                <p className="text-[12px] text-ink-3 truncate">{authed.email}</p>
              </div>
              <button
                onClick={() => setAuthed(null)}
                className="ml-auto text-[12px] text-ink-3 hover:text-brand transition-colors cursor-pointer shrink-0"
              >
                Sign out
              </button>
            </div>
          )}

          {/* ── Guest comment tab ── */}
          {tab === "guest" && (
            <div className="space-y-3">
              {!authed && (
                <IconInput
                  icon={User}
                  placeholder="Your name (required)"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              )}
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Share your thoughts…"
                rows={3}
                className="w-full border border-line-2 bg-surface-2 rounded-btn px-4 py-3 text-[15px] leading-normal text-ink outline-none resize-y transition-all focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-ink-5"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-ink-5">
                  {authed ? `Posting as ${authed.name}` : "Guest comment · moderated before publishing"}
                </p>
                <button
                  onClick={postComment}
                  disabled={!canPost}
                  className="bg-brand text-white text-[14px] font-bold px-5 py-2.5 rounded-input transition-colors hover:bg-brand-strong cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  Post Comment
                </button>
              </div>
            </div>
          )}

          {/* ── Sign up tab ── */}
          {tab === "signup" && !authed && (
            <div className="space-y-3">
              <IconInput icon={User} placeholder="Display name" value={signName} onChange={(e) => setSignName(e.target.value)} />
              <IconInput icon={Mail} placeholder="Email address" type="email" value={signEmail} onChange={(e) => setSignEmail(e.target.value)} />
              <button
                onClick={handleSignup}
                disabled={!canSignup}
                className="w-full bg-ink text-white text-[14px] font-bold py-3 rounded-btn transition-colors hover:bg-brand cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Account &amp; Start Commenting
              </button>
              <p className="text-[12px] text-center text-ink-5">
                Your email stays private and is never shared.
              </p>
            </div>
          )}
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-14 text-ink-5">
          <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-[15px] font-medium">No comments yet — be the first!</p>
        </div>
      ) : (
        <div>
          {comments.map((c) => (
            <CommentItem key={c.id} comment={c} onReply={handleReply} />
          ))}
        </div>
      )}
    </section>
  );
}
