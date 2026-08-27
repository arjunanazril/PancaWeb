"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function redirectToLogin() {
  redirect("/auth");
}
