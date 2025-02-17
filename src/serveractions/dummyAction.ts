"use server";

import { auth } from "@/auth";

export async function dummyAction(value: number) {
  console.log(`dummyAction called for value: ${value} `);
  console.log("call await auth()");
  const session = await auth();
  console.log(`dummyAction called for user: ${session?.user?.name}`);
  console.log("called await auth()");

  return value + 1;
}
