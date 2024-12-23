"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/billing/create-checkout", {
        success_url: window.location.href + "/success",
        cancel_url: window.location.href,
      });

      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleSubscribe}>
      {isLoading ?? (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Subscribe
    </button>
  );
}
