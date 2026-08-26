import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function CommentsModal({ post, onClose, onAddComment }) {
  const [comment, setComment] = useState("");

  if (!post) return null;

  const submit = () => {
    if (!comment.trim()) return;
    onAddComment(post.id, comment);
    setComment("");
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal comments-modal">
        <div className="modal-header">
          <div>
            <h2>Comments</h2>
            <p>Join the conversation</p>
          </div>
          <button className="modal-close" onClick={onClose}><X size={19} /></button>
        </div>

        <div className="comment-original">
          <b>{post.name}</b>
          <p>{post.text}</p>
        </div>

        <div className="comments-list">
          {post.commentList.length === 0 && (
            <div className="no-comments">
              <MessageCircle size={25} />
              <span>No comments yet.</span>
              <small>Be the first to say something kind.</small>
            </div>
          )}
          {post.commentList.map((item, index) => (
            <div className="comment" key={index}>
              <div className="comment-avatar">{index % 2 === 0 ? "A" : "M"}</div>
              <div>
                <b>Anonymous</b>
                <p>{item}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
            placeholder="Write a kind comment..."
          />
          <button onClick={submit} disabled={!comment.trim()}><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}
