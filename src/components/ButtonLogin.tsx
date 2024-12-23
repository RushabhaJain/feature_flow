"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

const ButtonLogin = ({
  session,
  extrastyle,
}: {
  session: any;
  extrastyle?: string;
}) => {
  const dashboardUrl = "/dashboard";
  if (session) {
    return (
      <Link
        href={dashboardUrl}
        className={`btn btn-primary ${extrastyle ? extrastyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}{" "}
      </Link>
    );
  }
  return (
    <button
      className={`btn btn-primary ${extrastyle ? extrastyle : ""}`}
      onClick={() => {
        signIn(undefined, { redirectTo: dashboardUrl });
      }}
    >
      Login
    </button>
  );
};

export default ButtonLogin;
