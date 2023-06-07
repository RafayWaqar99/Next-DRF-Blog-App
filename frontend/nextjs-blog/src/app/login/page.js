'use client';
import React, { useEffect, useState } from "react"
import "./style.css"
import { AuthServices } from "../api/api"
import { useRouter } from "next/navigation"
import { getLocalStorageItem } from "../utils/utils";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Login = () => {

    const router = useRouter();
  const [data, setData] = useState({
    username: "",
    password: "",
  })
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
      if (data?.username && data?.password) {
      try {
        const token = await AuthServices.authenticateUser({
          username: data.username,
          password: data.password
        });
        localStorage.setItem('token', token.access)
        router.push('/blog')
      } catch (error) {
        alert(errorMsg)
        setData({username: "", password: ""})
      }
  }else {
    alert("Username and password required")
    return
  }
  };

  return (
    <div className="main">
      <div className="card login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Username</label>
            <input
            value={data.username}
            onChange={e => handleChange("username", e.target.value)}
            type="text"
              className="form-control shadow-none input"
              placeholder="Username"
            />
          </div>

          <div className="form-group">
            <label className="label">Password</label>
            <div className="password_input">
              <input
                value={data.password}
                onChange={e => handleChange("password", e.target.value)}
                type="password" 
                className="form-control shadow-none input"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="btn-submit">
            <button
              type="submit"
              className="btn border-0"
           >
              Sign in
            </button>
          </div>
        </form>

        <p className="end-btn">
          Don’t have an account?
          <Link className="link-success m-1" href='/signup' >Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
