import axios from 'axios'

const token = localStorage.getItem('Token')

const apiCaller = axios.create({
    // baseURL:'http://localhost:8000/api',
    baseURL:'https://kuragaram-backend.onrender.com/api',
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
})

export default apiCaller

