"use client";

import { signInAction } from "@/serveractions/authactions";
import { dummyAction } from "@/serveractions/dummyAction";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function SuperButtons() {
  const [clickCount, setClickCount] = useState(0);

  /*
  const { data: session } = useSession();
*/
  const handleLoginClick = async () => {
    await signInAction();
  };
  const handleLogoutClick = async () => {
    signOut();
  };

  const handleDummyClick = async () => {
    const result = await dummyAction(clickCount);
    setClickCount(result);
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

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDummyClick}
      >
        Click me {/* session?.user?.name */}: {clickCount}
      </button>
    </div>
  );
}
