"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ButtonVote({
  postId,
  initialVotesCounter,
}: {
  postId: string;
  initialVotesCounter: number;
}) {
  const localStorageKeyName = `vote-${postId}`;
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [votesCounter, setVotesCounter] = useState(initialVotesCounter);
  useEffect(() => {
    setVoted(localStorage.getItem(localStorageKeyName) === "true");
  }, []);
  const handleVote = async () => {
    if (loading && voted) return;
    setLoading(true);

    try {
      if (voted) {
        await axios.delete(`/api/vote?postId=${postId}`);
        setVoted(false);
        setVotesCounter((prev) => prev - 1);
        localStorage.removeItem(localStorageKeyName);
        toast.success("Vote removed!");
      } else {
        await axios.post(`/api/vote?postId=${postId}`);
        setVoted(true);
        setVotesCounter((prev) => prev + 1);
        localStorage.setItem(localStorageKeyName, "true");
        toast.success("Voted!");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`border rounded-xl text-lg px-4 py-2 group duration-150 ${
        voted
          ? "bg-primary text-primary-content border-transparent"
          : "bg-base-100 text-base-content hover:border-base-content/25"
      }`}
      disabled={loading}
      onClick={handleVote}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 group-hover:-translate-y-0.5 duration-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 15.75 7.5-7.5 7.5 7.5"
        />
      </svg>
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <div>{votesCounter}</div>
      )}
    </button>
  );
}
