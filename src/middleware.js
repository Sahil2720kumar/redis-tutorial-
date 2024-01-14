import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export function middleware(req) {
    const userId = req.cookies.get("userId");
    const res = NextResponse.next();
    if (!userId) {
        res.cookies.set("userId", nanoid());
    }
    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|img/|favicon.ico).*)"]
};
