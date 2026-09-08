"use client";

import { useState } from "react";
import {
  MessageSquare,
  ThumbsUp,
  User,
  Mail,
  Lock,
  UserCircle2,
  Send,
  ArrowUpDown,
  LogIn,
  Shield,
} from "lucide-react";
import Avatar from "./Avatar";
import { ArticleComment } from "@/lib/data/article-data";

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = "anonymous" | "guest" | "login";
type SortMode = "newest" | "top";
interface AuthedUser {
  name: string;
  email: string;
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function IconInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ElementType }
) {
  const { icon: Icon, ...rest } = props;
  return (
    <div className="relative">
      <Icon
        size={14}
        strokeWidth={2}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-4"
      />
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
    <div className="mt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply…"
        rows={2}
        className="w-full border border-line-2 bg-surface rounded-btn px-4 py-3 text-[14px] leading-normal text-ink outline-none resize-none transition-all focus:border-brand focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-ink-5"
      />
      <div className="flex gap-2 justify-end mt-2">
        <button
          onClick={onCancel}
          className="text-[13px] font-semibold text-ink-3 hover:text-ink px-3 py-1.5 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            const t = text.trim();
            if (t) {
              onPost(t);
              setText("");
            }
          }}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold bg-ink text-white px-4 py-1.5 rounded-btn hover:bg-brand transition-colors cursor-pointer"
        >
          <Send size={12} strokeWidth={2.4} />
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
      <Avatar src={reply.avatar} alt={reply.name} size={32} ring />
      <div className="min-w-0">
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

  const isAnonymous = comment.name.toLowerCase().startsWith("anonymous");

  return (
    <article className="py-5 border-b border-line-2 last:border-0">
      <div className="flex gap-3.5">
        <Avatar
          src={comment.avatar}
          alt={comment.name}
          size={44}
          ring
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[15px] font-bold text-ink">{comment.name}</span>
            {isAnonymous && (
              <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.6px] text-ink-3 bg-surface-warm border border-line-2 px-1.5 py-0.5 rounded-full">
                <Shield size={9} strokeWidth={2.5} />
                Anon
              </span>
            )}
            <span className="text-[12px] text-ink-5">{comment.time}</span>
          </div>

          <p className="text-[15px] leading-[1.7] text-ink-2 mt-1.5">{comment.body}</p>

          <div className="flex items-center gap-4 mt-2.5">
            <button
              onClick={() => setLiked((l) => !l)}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${
                liked ? "text-brand" : "text-ink-4 hover:text-brand"
              }`}
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

          {replying && (
            <ReplyForm
              onPost={(text) => {
                onReply(comment.id, text);
                setReplying(false);
              }}
              onCancel={() => setReplying(false)}
            />
          )}

          {comment.replies.length > 0 && (
            <div className="mt-2 space-y-1">
              {comment.replies.map((r) => (
                <ReplyItem key={r.id} reply={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string; Icon: React.ElementType }[] = [
  { id: "anonymous", label: "Anonymous", Icon: Shield },
  { id: "guest", label: "Guest", Icon: UserCircle2 },
  { id: "login", label: "Login", Icon: LogIn },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function CommentsSection({
  initialComments,
}: {
  initialComments: ArticleComment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [tab, setTab] = useState<Tab>("anonymous");
  const [authed, setAuthed] = useState<AuthedUser | null>(null);
  const [sort, setSort] = useState<SortMode>("newest");

  // Guest form
  const [guestName, setGuestName] = useState("");
  const [draft, setDraft] = useState("");

  // Login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const activeName =
    tab === "anonymous" && !authed
      ? "Anonymous Reader"
      : authed?.name ?? guestName.trim();

  const postComment = () => {
    const text = draft.trim();
    if (!text) return;
    const name = tab === "anonymous" && !authed ? "Anonymous Reader" : activeName;
    if (!name) return;
    setComments((prev) => [
      {
        id: `c-${Date.now()}`,
        name,
        avatar: authed ? "" : "",
        time: "just now",
        likes: 0,
        body: text,
        replies: [],
      },
      ...prev,
    ]);
    setDraft("");
    if (!authed && tab === "guest") setGuestName("");
  };

  const handleLogin = () => {
    const email = loginEmail.trim();
    const pass = loginPass.trim();
    if (!email || !pass) return;
    // Mock login: name derived from email local-part
    const name = email.split("@")[0].replace(/[._-]/g, " ");
    setAuthed({ name: name.replace(/\b\w/g, (c) => c.toUpperCase()), email });
    setLoginEmail("");
    setLoginPass("");
  };

  const handleReply = (commentId: string, text: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: [
                ...c.replies,
                {
                  id: `r-${Date.now()}`,
                  name: activeName || "You",
                  avatar: "",
                  time: "just now",
                  body: text,
                },
              ],
            }
          : c
      )
    );
  };

  const canPost =
    draft.trim().length > 0 &&
    (!!authed || tab === "anonymous" || (tab === "guest" && guestName.trim().length > 0));
  const canLogin = loginEmail.trim().length > 0 && loginPass.trim().length > 0;

  const sorted = [...comments].sort((a, b) =>
    sort === "top" ? b.likes - a.likes : 0
  );

  return (
    <section id="comments" className="pt-10 border-t border-line-2">
      {/* Header + sort */}
      <div className="flex items-center justify-between gap-3 mb-7 flex-wrap">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} strokeWidth={2} className="text-brand" />
          <h2 className="font-newsreader text-[26px] font-semibold tracking-[-0.4px] text-ink">
            Comments{" "}
            <span className="text-ink-5 font-normal text-[22px]">({comments.length})</span>
          </h2>
        </div>
        <button
          onClick={() => setSort((s) => (s === "newest" ? "top" : "newest"))}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-2 bg-surface border border-line-2 rounded-full px-3 py-1.5 hover:bg-surface-warm cursor-pointer transition-colors"
        >
          <ArrowUpDown size={12} strokeWidth={2.4} />
          {sort === "newest" ? "Newest" : "Top rated"}
        </button>
      </div>

      {/* Composer card */}
      <div className="bg-surface border border-line rounded-card-lg overflow-hidden mb-8">
        {/* Authed banner */}
        {authed && (
          <div className="flex items-center gap-3 p-4 border-b border-line-2 bg-linear-to-r from-brand-tint/50 to-transparent">
            <Avatar src="" alt={authed.name} size={40} ring />
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-bold text-ink truncate">
                Signed in as {authed.name}
              </p>
              <p className="text-[12px] text-ink-3 truncate">{authed.email}</p>
            </div>
            <button
              onClick={() => setAuthed(null)}
              className="text-[12px] font-semibold text-ink-3 hover:text-brand transition-colors cursor-pointer shrink-0"
            >
              Sign out
            </button>
          </div>
        )}

        {/* Mode tabs (hidden when authed) */}
        {!authed && (
          <div className="grid grid-cols-3 border-b border-line-2 bg-surface-warm">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`py-3 text-[13px] font-bold transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  tab === id
                    ? "text-brand bg-surface border-b-2 border-brand -mb-px"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                <Icon size={13} strokeWidth={2.4} />
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          {/* Anonymous notice */}
          {!authed && tab === "anonymous" && (
            <div className="flex items-start gap-2.5 mb-4 p-3 bg-surface-warm/60 border border-line-2 rounded-btn">
              <Shield size={14} className="text-ink-3 mt-0.5 shrink-0" strokeWidth={2.4} />
              <p className="text-[12.5px] leading-[1.6] text-ink-3">
                Posting anonymously — your comment appears as{" "}
                <strong className="text-ink">Anonymous Reader</strong>. No name required.
              </p>
            </div>
          )}

          {/* Guest name input */}
          {!authed && tab === "guest" && (
            <div className="mb-3">
              <IconInput
                icon={User}
                placeholder="Your display name (required)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
              />
            </div>
          )}

          {/* Login form */}
          {!authed && tab === "login" && (
            <div className="space-y-3 mb-1">
              <IconInput
                icon={Mail}
                placeholder="Email address"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <IconInput
                icon={Lock}
                placeholder="Password"
                type="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
              />
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <a href="#" className="text-[12.5px] text-brand font-semibold hover:underline">
                  Forgot password?
                </a>
                <button
                  onClick={handleLogin}
                  disabled={!canLogin}
                  className="inline-flex items-center gap-1.5 bg-ink text-white text-[13px] font-bold px-4 py-2 rounded-btn transition-colors hover:bg-brand cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <LogIn size={13} strokeWidth={2.4} />
                  Sign in to comment
                </button>
              </div>
              <p className="text-[11.5px] text-ink-5 text-center pt-1">
                New here?{" "}
                <a href="#" className="text-brand font-semibold hover:underline">
                  Create an account
                </a>
              </p>
            </div>
          )}

          {/* Comment textarea (all modes except login when not authed) */}
          {(authed || tab !== "login") && (
            <div className="space-y-3">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  tab === "anonymous" && !authed
                    ? "Share your thoughts anonymously…"
                    : "Share your thoughts…"
                }
                rows={3}
                className="w-full border border-line-2 bg-surface-2 rounded-btn px-4 py-3 text-[15px] leading-normal text-ink outline-none resize-y transition-all focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-ink-5"
              />
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-[12px] text-ink-5">
                  {authed
                    ? `Posting as ${authed.name}`
                    : tab === "anonymous"
                    ? "Posting anonymously · moderated"
                    : "Guest comment · moderated before publishing"}
                </p>
                <button
                  onClick={postComment}
                  disabled={!canPost}
                  className="inline-flex items-center gap-1.5 bg-brand text-white text-[14px] font-bold px-5 py-2.5 rounded-btn transition-colors hover:bg-brand-strong cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={13} strokeWidth={2.4} />
                  Post Comment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments list */}
      {sorted.length === 0 ? (
        <div className="text-center py-14 text-ink-5 border border-dashed border-line-2 rounded-card-lg">
          <MessageSquare size={36} className="mx-auto mb-3 opacity-30" />
          <p className="text-[15px] font-medium">No comments yet — be the first!</p>
        </div>
      ) : (
        <div>
          {sorted.map((c) => (
            <CommentItem key={c.id} comment={c} onReply={handleReply} />
          ))}
        </div>
      )}
    </section>
  );
}
