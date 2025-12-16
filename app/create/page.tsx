// import Link from "next/link";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [posts, setPosts] = useState([]);

//   async function load() {
//     const res = await fetch("/api/posts");
//     setPosts(await res.json());
//   }

//   useEffect(() => { load(); }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <header className="flex justify-between mb-6">
//           <h1 className="text-3xl font-bold">📘 Posts</h1>
//           <Link href="/create">
//             <a className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
//               + Create
//             </a>
//           </Link>
//         </header>

//         <div className="grid gap-4">
//           {posts.map((post) => (
//             <div key={post.id} className="p-6 bg-white shadow rounded-lg hover:shadow-md transition">
//               <div className="flex justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">{post.title}</h2>
//                   <p className="text-gray-600 mt-1">{post.content?.slice(0, 120) || "No content"}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className={`text-sm ${post.published ? "text-green-600" : "text-yellow-600"}`}>
//                     {post.published ? "Published" : "Draft"}
//                   </p>

//                   <div className="mt-2 space-x-3">
//                     <Link href={`/edit/${post.id}`}>
//                       <a className="text-blue-600 hover:text-blue-800">Edit</a>
//                     </Link>

//                     <button
//                       onClick={async () => {
//                         await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
//                         load();
//                       }}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {posts.length === 0 && (
//             <p className="text-gray-500 text-center py-10">No posts created yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }