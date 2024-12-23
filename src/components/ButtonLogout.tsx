"use client";

import { signOut } from "next-auth/react";

export const ButtonLogout = () => {
  return (
    <button className="btn btn-ghost" onClick={() => signOut()}>
      Logout
    </button>
  );
};
