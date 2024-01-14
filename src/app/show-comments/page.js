import { redis } from "@/lib/redis";

export default async function ShowComments() {
    const commentsLength=await redis.llen("comments")
    console.log("commentsLength",commentsLength)
    const commentIds = await redis.lrange("comments", 0, commentsLength);
    const comments = await Promise.all(
        commentIds.map(async commentId => {
            const details = await redis.hgetall(`comment_details:${commentId}`);
            const tags = await redis.smembers(`tags:${commentId}`);
            return {
                commentId,
                details,
                tags
            };
        })
    );
    return (
        <div className="p-3 h-screen">
            {comments.map((comment) => {
                return (
                    <div class="my-2 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                      <p class="font-normal text-gray-700 dark:text-gray-400">
                            commentId: {comment.commentId}
                        </p>
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {comment.details.content}
                        </h5>
                        <p class="font-normal text-gray-700 dark:text-gray-400">
                            Author:{comment.details.user}
                        </p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">
                            published at: {comment.details.timestamp}
                        </p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">
                            tags: {comment.details.tags}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
