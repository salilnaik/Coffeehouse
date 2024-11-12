import React from "react"
import "../styles/Post.css"
import { Link } from "react-router-dom"

function PublicPost({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString("en-US");
    return <div className="post-container">
        <Link to={"/" + post.username}>{post.username}</Link>
        <p className="post-title">{post.title}</p>
        <p className="post-content">{post.content}</p>
        <p className="post-date">{formattedDate}</p>
    </div>
}

export default PublicPost