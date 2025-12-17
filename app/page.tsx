"use client";

import { useEffect, useState, useCallback } from "react";

type Post = {
  id: number;
  title: string;
  content?: string;
  published: boolean;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSubmit = async () => {
    const payload = { title, content, published: true };

    try {
      if (editingId) {
        await fetch(`/api/posts/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        setPosts((prev) =>
          prev.map((post) =>
            post.id === editingId ? { ...post, title, content } : post
          )
        );

        setEditingId(null);
      } else {
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        fetchPosts();
      }

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content ?? "");
    setEditingId(post.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}`, { method: "DELETE" });
      fetchPosts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Posts CRUD App</h1>

      <div className="mb-6 p-4 border rounded shadow">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </div>

      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            className="border p-4 mb-2 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.content}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="bg-blue-400 px-2 py-1 rounded hover:bg-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-orange-600 text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
