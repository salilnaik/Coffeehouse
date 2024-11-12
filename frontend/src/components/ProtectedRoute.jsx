import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import {useState, useEffect} from "react"

function ProtectedRoute({children, user}){
    const [isAuthorized, setIsAuthorized] = useState(null)
    const [currentUser, setCurrentUser] = useState("")
    const [reqUser, setReqUser] = useState(user)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [currentUser])

    const getCurrentUser = async() => {
        api.get("api/currentuser/").then((res) => res.data).then((data) => {setCurrentUser(data.username)}).catch((err) => alert(err))
    }

    const refreshToken = async() => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken})
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                await getCurrentUser()
                if(currentUser == reqUser)
                    setIsAuthorized(true)
                else
                    setIsAuthorized(false)
            }else{
                setIsAuthorized(false)
            }
        }catch(error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
                return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if(tokenExpiration < now){
            await refreshToken()
        }else{
            await getCurrentUser()
            if(currentUser == reqUser)
                setIsAuthorized(true)
            else
                setIsAuthorized(false)
        }
    }

    if(isAuthorized === null){
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <></>
}

export default ProtectedRoute