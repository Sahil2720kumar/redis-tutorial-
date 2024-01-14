"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CommentsForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async formData => {
        try {
            console.log(formData);
            const { data } = await axios.post("api/comments", formData);
            console.log(data);
            toast.success("Comment added successfully.");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto p-5"
        >
            <h1 className="py-2 px-1 text-stone-100 font-bold rounded underline bg-gray-900 uppercase my-3 ">
                CommentForm Project -redis{" "}
            </h1>
            <div className="mb-5">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                    name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                />
            </div>
            <div className="mt-2">
                <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Your message
                </label>
                <textarea
                    id="message"
                    {...register("message")}
                    name="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Leave a comment..."
                ></textarea>
            </div>
            <div className="mt-2">
                <label
                    htmlFor="tags"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    select your category
                </label>
                <select
                    id="tags"
                    {...register("tags")}
                    name="tags"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option>typescript</option>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>Javascript</option>
                </select>
            </div>
            <div className="flex flex-row gap-2">
                <button
                    type="submit"
                    className="h-10 px-3 py-2 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    submit comment
                </button>
                <button
                    type="button"
                    className="h-10 px-3 py-2 mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    <Link href="/show-comments/"> show comments</Link>
                </button>
            </div>
        </form>
    );
}
