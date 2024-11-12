import { useEffect, useState } from "react"
import api from "../api"
import PublicPost from "../components/PublicPost"
import ProtectedRoute from "../components/ProtectedRoute"
import { Link } from "react-router-dom"

function Home(){
    const [posts, setPosts] = useState([])
    const [currentUser, setCurrentUser] = useState("")
    useEffect(() => {
        getAllPosts();
        getCurrentUser();
    }, [])

    const getCurrentUser = async() => {
        api.get("api/currentuser/").then((res) => res.data).then((data) => {setCurrentUser(data.username)}).catch((err) => alert(err))
    }

    const getAllPosts = () => {
        api.get(`/api/home`).then((res) => res.data).then((data) => {setPosts(data)}).catch((err) => alert(err));
    }

    return <>
        {(currentUser == "") ? <div><Link to="/login">Login</Link><br/><br/><Link to="/register">Register</Link></div> : <div><Link to={"/" + currentUser}>Profile</Link><br/><br/><Link to="/logout">Logout</Link></div>}
        {(posts.length > 0) ? posts.map((post) => <PublicPost post={post} key={post.id} />) : <h3>No posts yet.</h3>}

    </>
}

export default Home;