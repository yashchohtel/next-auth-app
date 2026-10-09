import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/model/user.modal";
import bcrypt from "bcryptjs";

const authOptions: NextAuthOptions = {

    providers: [

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
    ],

    callbacks: {

    },

    session: {

    },

    pages: {

    },

    secret: "kjdfhapoy"

}

export default authOptions;