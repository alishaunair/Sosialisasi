import environment from "@/config/environment";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";
import NextAuth from "next-auth";

type AxiosErrorWithResponse = { response?: { data?: { message?: string } } };

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const result = await authServices.login({
            email,
            password,
          });
          const accessToken = result.data.data;
          const me = await authServices.getProfileWithToken(accessToken);
          const userApi = me.data.data;

          if (
            // accessToken &&
            // result.status === 200 &&
            // userApi._id &&
            me.status === 200
          ) {
            const user: UserExtended = {
              id: userApi._id,
              name: userApi.fullName,
              email: userApi.email,
              image: userApi.profilePicture,
              role: userApi.role,
              jurusan: userApi.jurusan,
              universitas: userApi.universitas,
              status: userApi.status,
              accessToken: accessToken,
            };
            return user;
          } else {
            throw new Error("Failed to fetch profile data.");
          }
        } catch (error) {
          const err = error as Error & AxiosErrorWithResponse;

          const errorMessage =
            err.response?.data?.message || err.message || "Failed to login";

          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
