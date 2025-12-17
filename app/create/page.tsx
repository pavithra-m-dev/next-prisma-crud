"use client";

import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between mb-6">
          <h1 className="text-gray-600 text-3xl font-bold">Posts</h1>
        </header>

        {loading && (
          <p className="text-gray-500 text-center py-10">Loading posts...</p>
        )}

        {!loading && (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-6 bg-white shadow rounded-lg hover:shadow-md transition"
              >
                <h2 className="text-gray-600 text-xl font-semibold">
                  {post.title}
                </h2>

                <p className="text-gray-600 mt-1">
                  {post.content?.slice(0, 120) || "No content"}
                </p>
              </div>
            ))}

            {posts.length === 0 && (
              <p className="text-gray-500 text-center py-10">
                No posts created yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
