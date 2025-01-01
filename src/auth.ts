import NextAuth from "next-auth";
import GitLab from "next-auth/providers/gitlab";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitLab],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log(token);
      if (account && profile && user) {
        console.log("INITIAL JWT");
        return {
          ...token,
          status: "INITIAL",
        };
      } else {
        console.log("SUBSQUENT JWT");

        return { ...token, status: "REFRESH" };
      }
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
    status: "INITIAL" | "REFRESH";
  }
}
