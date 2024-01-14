import { nextRequest, nextResponse } from "next/server";
import { nanoid } from "nanoid";
import { redis } from "@/lib/redis";

export const POST = async req => {
    try {
        const body = await req.json();
        const { email, message, tags } = body;
        //console.log({ email, message, tags });
        const commentId = nanoid();
        const commentDetails = {
            userId: req.cookies.get("userId")?.value,
            user: email,
            content: message,
            tags,
            timestamp: new Date()
        };
        //add commentId to list
        // await redis.rpush("comments", commentId);
        //add email and tags to set
        // await redis.sadd(`tags:${commentId}`, tags);
        //await redis.sadd(`users`, email);
        //retrive and store comment detailz
        // await redis.hset(`comment_details:${commentId}`, commentDetails);

        await Promise.all([
            redis.rpush("comments", commentId),
            redis.sadd(`tags:${commentId}`, tags),
            redis.sadd(`users`, email),
            //redis.json.set(`comment_details:${commentId}`, '$', commentDetails),
            redis.hset(`comment_details:${commentId}`, commentDetails)
        ]);

        return nextResponse.json(
            {
                status: 200,
                message: "ok"
            },
            {
                status: 200
            }
        );
    } catch (error) {
        console.log(error);
    }
};
