import React from "react"
import "../styles/Post.css"
import ProtectedRoute from "./ProtectedRoute";

function Post({post, onDelete, user}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US");
    
    return <div className="post-container">
        <p className="post-title">{post.title}</p>
        <p className="post-content">{post.content}</p>
        <p className="post-date">{formattedDate}</p>
        <ProtectedRoute user={user}>
            <button className="delete-button" onClick={() => onDelete(post.id)}>Delete</button>
        </ProtectedRoute>
    </div>
}

export default Post