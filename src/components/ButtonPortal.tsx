"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ButtonPortal() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCustomerPortal = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("/api/billing/create-portal", {
        returnUrl: window.location.href,
      });

      const portalUrl = response.data.url;
      window.location.href = portalUrl;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleCustomerPortal}>
      {isLoading ?? (
        <span className="loading loading-spinner loading-xs"></span>
      )}
      Billing
    </button>
  );
}