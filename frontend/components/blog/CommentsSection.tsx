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
      <Icon size={14} strokeWidth={2} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0AEB6]" />
      <input
        className="w-full pl-10 pr-4 py-2.75 border border-[#EAE8E2] rounded-[11px] text-[14px] text-[#16151A] bg-white outline-none transition-all focus:border-[#E63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-[#C4C2CA]"
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
        className="w-full border border-[#EAE8E2] bg-white rounded-[11px] px-4 py-3 text-[14px] leading-normal text-[#16151A] outline-none resize-none transition-all focus:border-[#E63946] focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-[#C4C2CA]"
      />
      <div className="flex gap-2 justify-end mt-2">
        <button onClick={onCancel} className="text-[13px] font-semibold text-[#8E8D94] hover:text-[#16151A] px-3 py-1.5 transition-colors cursor-pointer">
          Cancel
        </button>
        <button
          onClick={() => { const t = text.trim(); if (t) { onPost(t); setText(""); } }}
          className="text-[13px] font-bold bg-[#16151A] text-white px-4 py-1.5 rounded-[9px] hover:bg-[#E63946] transition-colors cursor-pointer"
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
    <div className="flex gap-3 mt-4 pl-4 border-l-2 border-[#EAE8E2]">
      <Avatar src={reply.avatar} alt={reply.name} size={30} className="border border-[#EFEDE7] mt-0.5 shrink-0" />
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[13.5px] font-bold text-[#16151A]">{reply.name}</span>
          <span className="text-[11.5px] text-[#C4C2CA]">{reply.time}</span>
        </div>
        <p className="text-[14px] leading-[1.6] text-[#3C3B42] mt-0.75">{reply.body}</p>
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
    <div className="py-5 border-b border-[#EAE8E2] last:border-0">
      <div className="flex gap-3.5">
        <Avatar src={comment.avatar} alt={comment.name} size={44} className="border-2 border-[#EFEDE7] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          {/* Name + time */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[15px] font-bold text-[#16151A]">{comment.name}</span>
            <span className="text-[12px] text-[#C4C2CA]">{comment.time}</span>
          </div>

          {/* Body */}
          <p className="text-[15px] leading-[1.7] text-[#3C3B42] mt-1.5">{comment.body}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-2.5">
            <button
              onClick={() => setLiked((l) => !l)}
              className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors cursor-pointer ${liked ? "text-[#E63946]" : "text-[#B0AEB6] hover:text-[#E63946]"}`}
            >
              <ThumbsUp size={13} strokeWidth={2} fill={liked ? "currentColor" : "none"} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            <button
              onClick={() => setReplying((r) => !r)}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#B0AEB6] hover:text-[#16151A] transition-colors cursor-pointer"
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
    <section className="mt-16 pb-20 pt-10 border-t border-[#EAE8E2]">
      {/* Section heading */}
      <div className="flex items-center gap-3 mb-7">
        <MessageSquare size={20} strokeWidth={2} className="text-[#E63946]" />
        <h2 className="font-newsreader text-[26px] font-semibold tracking-[-0.4px] text-[#16151A]">
          Comments{" "}
          <span className="text-[#C4C2CA] font-normal text-[22px]">({comments.length})</span>
        </h2>
      </div>

      {/* ── Composer card ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-[#EFEDE7] rounded-[18px] overflow-hidden mb-8">

        {/* Tab switcher — hidden when signed in */}
        {!authed && (
          <div className="grid grid-cols-2 border-b border-[#EAE8E2]">
            {(["guest", "signup"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-3.5 text-[13.5px] font-bold transition-colors cursor-pointer ${
                  tab === t
                    ? "text-[#E63946] border-b-2 border-[#E63946] -mb-px bg-white"
                    : "text-[#8E8D94] bg-[#F6F4EE] hover:text-[#16151A]"
                }`}
              >
                {t === "guest" ? "Comment as Guest" : "Create Account"}
              </button>
            ))}
          </div>
        )}

        <div className="p-5">
          {/* Signed-in banner */}
          {authed && (
            <div className="flex items-center gap-3 mb-4 p-3 bg-[#F6F4EE] rounded-[12px]">
              <Avatar src="" alt={authed.name} size={36} />
              <div className="min-w-0">
                <p className="text-[13.5px] font-bold text-[#16151A] truncate">{authed.name}</p>
                <p className="text-[12px] text-[#8E8D94] truncate">{authed.email}</p>
              </div>
              <button
                onClick={() => setAuthed(null)}
                className="ml-auto text-[12px] text-[#8E8D94] hover:text-[#E63946] transition-colors cursor-pointer shrink-0"
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
                className="w-full border border-[#EAE8E2] bg-[#FAFAF9] rounded-[11px] px-4 py-3 text-[15px] leading-normal text-[#16151A] outline-none resize-y transition-all focus:border-[#E63946] focus:bg-white focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] placeholder:text-[#C4C2CA]"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] text-[#C4C2CA]">
                  {authed ? `Posting as ${authed.name}` : "Guest comment · moderated before publishing"}
                </p>
                <button
                  onClick={postComment}
                  disabled={!canPost}
                  className="bg-[#E63946] text-white text-[14px] font-bold px-5 py-2.25 rounded-[10px] transition-colors hover:bg-[#C71F2E] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
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
                className="w-full bg-[#16151A] text-white text-[14px] font-bold py-3 rounded-[11px] transition-colors hover:bg-[#E63946] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Create Account &amp; Start Commenting
              </button>
              <p className="text-[12px] text-center text-[#C4C2CA]">
                Your email stays private and is never shared.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── Comment list ──────────────────────────────────────────────────── */}
      {comments.length === 0 ? (
        <div className="text-center py-14 text-[#C4C2CA]">
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
