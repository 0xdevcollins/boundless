"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth.config";

export const isAdmin = async (): Promise<boolean> => {
    const session = await getServerSession(authOptions);
    return session?.user?.role === "ADMIN";
};