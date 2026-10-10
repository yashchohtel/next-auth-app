import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/model/user.modal";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {

    // Configure one or more authentication providers
    providers: [

        // login through credentials
        Credentials({

            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {

                // 1. Check credentials
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // 2. Connect database
                await connectDB();

                // 3. Find user
                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    return null;
                }

                // 4. Compare password
                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isPasswordValid) {
                    return null;
                }

                // 5. Return user
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),

        // login through google 
        

    ],

    // Add more NextAuth options here as needed
    callbacks: {

        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        }

    },

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },

    pages: {
        signIn: "/login",
        error: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,

}

export default authOptions;



