"use client";

import { signInAction } from "@/serveractions/authactions";
import { signOut } from "next-auth/react";

export default function SuperButtons() {
  const handleLoginClick = async () => {
    await signInAction();
  };
  const handleLogoutClick = async () => {
    signOut();
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLoginClick}
      >
        Login
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </div>
  );
}
