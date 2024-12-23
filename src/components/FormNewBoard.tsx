"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormNewBoard = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;

    setIsLoading(true);

    try {
      const newBoardData = await axios.post("/api/board", { name });
      setName("");
      toast.success("Board created!");
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
      className="bg-base-100 p-8 rounded-3xl space-y-8 w-full shrink-0 md:w-96 md:sticky top-6"
      onSubmit={handleSubmit}
    >
      <p className="font-bold text-lg">Create a new feedback board</p>

      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Board name</span>
        </div>
        <input
          required
          type="text"
          placeholder="Future Unicorn Inc. 🦄"
          className="input input-bordered w-full"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
