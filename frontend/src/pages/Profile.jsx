import { useState, useEffect } from "react"
import api from "../api"
import Post from "../components/Post"
import "../styles/Home.css"
import ProtectedRoute from "../components/ProtectedRoute";
import { useParams, Link } from "react-router-dom";

function Profile(){
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    let { user } = useParams();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api.get(`/api/posts/${user}/`).then((res) => res.data).then((data) => {setPosts(data)}).catch((err) => alert(err));
    };

    const deletePost = (id) => {
        api.delete(`/api/posts/delete/${id}/`).then((res) => {
            if (res.status === 204) alert("Post deleted!")
            else alert("Failed to delete post")
            getPosts();
        }).catch((err) => alert(err))
    };

    const createPost = (e) => {
        e.preventDefault()
        let username = user
        api.post("/api/posts/", {content, title, username}).then((res) => {
            if(res.status === 201) alert("Post created!");
            else alert("Failed to make post!");
            getPosts();
        }).catch((err) => alert(err))
    };

    return <div>
        <div>
            <Link to="/">Home</Link>
            <h1>{user}</h1>
            <h2>Posts</h2>
            {(posts.length > 0) ? posts.map((post) => <Post post={post} onDelete={deletePost} user={user} key={post.id} />) : <h3>No posts yet.</h3>}
        </div>
        <ProtectedRoute user={user}>
            <h2>Create a Post</h2>
            <form onSubmit={(e) => {createPost(e); setTitle(""); setContent("");}}>
                <label htmlFor="title">Title:</label>
                <br />
                <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea id="content" name="content" required value={content} onChange={(e) => setContent(e.target.value)} />
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </ProtectedRoute>
    </div>
}

export default Profile