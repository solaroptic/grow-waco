import { FaPen } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowUpWideShort } from "react-icons/fa6";
import {
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useUpdateCommentMutation,
  useUpdateLikesMutation,
} from "../api/commentsApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import styles from "../css/comment.module.css";

const CommentBox = ({ proposalId }) => {
  const userName = useSelector((state) => state.user?.user?.userName);
  const userId = useSelector((state) => state.user?.user?._id);
  const userLikes = useSelector((state) => state.user?.user?.likes);
  const [editComment, setEditComment] = useState(null);
  const { data = [], isLoading, isError } = useGetCommentsQuery(proposalId);
  const [mutateDelete] = useDeleteCommentMutation();
  const [mutateUpdate] = useUpdateCommentMutation();
  const [mutateLike] = useUpdateLikesMutation();

  const sendLike = (commentId) => {
    if (!userName) {
      toast("Please log in to like comments", {
        duration: 3000,
        position: "top-center",
        style: { color: "#4cb944", border: "4px solid #246eb9" },
        icon: "📨",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      return;
    }
    const payload = { userId, commentId };
    mutateLike(payload);
  };
  return (
    <div className={styles["comments-container-div"]}>
      {/* <Toaster /> */}
      {data?.map((comment) => (
        <div
          className={styles["singleComment-container-div"]}
          key={comment._id}
        >
          {editComment !== comment._id && (
            <p className={styles["comment-content-p"]}>{comment.content}</p>
          )}
          {editComment === comment._id && (
            <input
              type="text"
              className={styles["comment-edit-input"]}
              defaultValue={comment.content}
              onBlur={(e) => {
                const updatedContent = e.target.value;
                const payload = { comment, content: updatedContent };
                if (updatedContent !== comment.content) {
                  mutateUpdate(payload);
                }
                setEditComment(null);
              }}
            />
          )}
          <div className={styles["comment-info-div"]}>
            <p className={styles["comment-user-p"]}>{comment.name}</p>
            <p className={styles["comment-time-p"]}>{comment.time}</p>
            <FaArrowUpWideShort />
            <p className={styles["comment-like-count-p"]}>
              {comment.totalLikes}
            </p>
            <p
              className={`${styles["comment-like-p"]} ${
                userLikes?.includes(comment._id) ? styles["comment-liked"] : ""
              }`}
              onClick={() => sendLike(comment._id)}
            >
              Like
            </p>
            {userName === comment.name && (
              <FaPen
                className={styles["comment-edit-icon"]}
                onClick={() => setEditComment(comment._id)}
              />
            )}
            {userName === comment.name && (
              <RiDeleteBin6Line
                className={styles["comment-delete-icon"]}
                onClick={() => mutateDelete(comment._id)}
              />
            )}
          </div>
        </div>
      ))}
      {data.length < 1 && <p>No comments yet...</p>}
    </div>
  );
};

export default CommentBox;
