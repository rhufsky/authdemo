import { log } from "console";
import NextAuth from "next-auth";
import GitLab from "next-auth/providers/gitlab";
import { init } from "next/dist/compiled/webpack/webpack";

const GITLAB_OAUTH_SCOPES = "read_user";
const GITLAB_AUTH_URL = "https://gitlab.com/oauth/authorize";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitLab({
      authorization: {
        url: GITLAB_AUTH_URL,
        params: { scope: GITLAB_OAUTH_SCOPES },
      },
      //    allowDangerousEmailAccountLinking: true,
    }),
  ],

  session: {
    strategy: "jwt", // ✅ Ensures JWT updates persist
  },

  callbacks: {
    async jwt({ token, account }) {
      console.log("############# JWT() #############");
      console.log("current JWT");
      console.log(token);
      console.log("#############");

      if (account) {
        console.log("adding INITIAL status to JWT");
        const initialToken = { ...token, status: "INITIAL", refreshCount: 0 };
        return initialToken;
      } else {
        console.log(
          `current JWT status: ${token.status} / ${token.refreshCount}`
        );

        console.log("adding REFRESH status / count to JWT");

        const refreshCount = (token.refreshCount as number) || 0;

        const refreshedToken = {
          ...token,
          status: "REFRESH",
          refreshCount: refreshCount + 1,
          lastRefresh: new Date().toISOString().slice(0, 19).replace("T", " "),
        };
        return refreshedToken;
      }
    },

    async session({ session, token }) {
      console.log("############# Session() #############");
      session.status = token?.status as "INITIAL" | "REFRESH";
      session.refreshCount = token?.refreshCount;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError";
    status: "INITIAL" | "REFRESH";
    refreshCount: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    error?: "RefreshTokenError";
    status: "INITIAL" | "REFRESH";
    refreshCount: number;
  }
}
