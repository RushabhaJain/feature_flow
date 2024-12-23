"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const SelectPostState = ({
  boardId,
  postId,
  status,
}: {
  boardId: string;
  postId: string;
  status: string;
}) => {
  const [postStatus, setPostStatus] = useState(status);
  // Make an API call to update the post state
  const updatePostState = async (state: string) => {
    setPostStatus(state);
    try {
      await axios.patch(
        `/api/board/${boardId}/post/${postId}`,
        { status: state },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error ||
        error.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      onChange={(e) => {
        updatePostState(e.target.value);
      }}
      value={postStatus}
    >
      <option value="NEW">⭐️ New</option>
      <option value="IN_PROGRESS">🏗️ Work In Progress</option>
      <option value="COMPLETED">✅ Shipped</option>
      <option value="CANCELLED">❌ Cancelled</option>
    </select>
  );
};

export default SelectPostState;
