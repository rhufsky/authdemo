"use server";
const { signIn } = await import("@/auth");

export async function signInAction() {
  return signIn("gitlab");
}
