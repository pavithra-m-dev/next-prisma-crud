"use client";

import { useEffect, useState } from "react";
// import Image from "next/image";
// import { Roboto } from "next/font/google";

type Post = {
  id: number;
  title: string;
  content?: string;
  published: boolean;
};

// const roboto = Roboto({ subsets: ["latin"] });

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
  };

    fetchData();
  }, []);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
    console.log("posts----->",posts)
  };

  const handleSubmit = async () => {
      console.log("editingId - above",editingId)

    if (editingId) {

      console.log("editingId - below",editingId)
      await fetch(`/api/posts/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, published: true })
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) => 
          post.id === editingId ? { ...post, title, content } : post
        )
      );
      
      setEditingId(null);
    } else {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
      });
    }
    setTitle(""); setContent("");
  };

  const handleEdit = (post: Post) => {
    setTitle(post.title);
    setContent(post.content || "");
    setEditingId(post.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Posts CRUD App</h1>
      {/* <div className={roboto.className}>
        <h1>Hello Next.js</h1>
        <p>This text uses optimized Roboto font</p>
      </div> */}
      {/* <Image
        src="https://camo.githubusercontent.com/5e45bc648dba68520ce949a53690af6bcef2880f84a1d46cbb1636649afd6d84/68747470733a2f2f796176757a63656c696b65722e6769746875622e696f2f73616d706c652d696d616765732f696d6167652d313032312e6a7067"
        alt="Photo"
        width={200}
        height={200}
      /> */}

      {/* Form */}
      <div className="mb-6 p-4 border rounded shadow">
        <input
          type="text" placeholder="Title" value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Content" value={content}
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

      {/* Posts List */}
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="border p-4 mb-2 rounded shadow flex justify-between items-center">
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
