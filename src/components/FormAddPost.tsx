"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormAddPost = ({ boardId }: { boardId: string }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      // Create new post
      await axios.post(`/api/board/${boardId}/post`, {
        title,
        description,
      });
      setTitle("");
      setDescription("");
      toast.success("Post created!");
      router.refresh();
    } catch (e: any) {
      // 1. Display error message
      const errorMessage =
        e.response?.data?.error || e.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      // Stop loading spinner
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8 w-full md:w-96 shrink-0 md:sticky top-6"
      onSubmit={handleSubmit}
    >
      <p className="text-lg font-bold">Suggest a feature</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Short, descriptive title</span>
        </div>
        <input
          type="text"
          placeholder="Add dark theme"
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="input input-bordered w-full"
          maxLength={100}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Add dark theme to the application for better user experience."
          required
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={1000}
        ></textarea>
      </label>
      <button
        className="btn btn-primary w-full"
        disabled={isLoading}
        type="submit"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Post
      </button>
    </form>
  );
};

export default FormAddPost;
