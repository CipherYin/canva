import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import {JWT} from "next-auth/jwt"
import { db } from "@/db/drizzle"
import Credentials from "next-auth/providers/credentials"
declare module "next-auth/jwt" {
  
  interface JWT {
    id: string | undefined
  }
    
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: DrizzleAdapter(db,{
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }),
  adapter: DrizzleAdapter(db),
  
  providers: [Credentials({
    credentials: {
      email: {label: "邮箱",type: "email"},
      password : {label: "密码",type: "password"}
      }
    
  }),GitHub,Google],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if(token.id){
        session.user.id = token.id
      } 
      return session
    },
  },
  
})