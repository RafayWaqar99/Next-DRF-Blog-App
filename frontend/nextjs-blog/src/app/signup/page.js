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
    confirm_password: ""
  })
  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
  }

const handleSubmit = async(e) => {
    e.preventDefault()
    if(data?.username && data?.password){
        if(data?.password === data?.confirm_password){
            try {
                const user = await AuthServices.registerUser(data)
                alert("User successfully registered")
                router.push("/login")
            } catch(error) {
              alert(error)
              router.push("/signup")
            }
        }else {
            alert("Password and confirm password didn't matched")
            return
        }
    } else {
        alert("Username and Password must be required")
        return
    }
}

  return (
    <div className="main">
      <div className="card login">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="text_input">
            <label className="label">Username</label>
            <input
            value={data.username}
            onChange={e => handleChange("username", e.target.value)}
            type="text"
            className="form-control shadow-none input"
            placeholder="Username"
            />
            </div>
          </div>

          <div className="form-group">
            <div className="password_input">
            <label className="label">Password</label>
              <input
                value={data.password}
                onChange={e => handleChange("password", e.target.value)}
                type="password" 
                className="form-control shadow-none input"
                placeholder="Password"
              />
              <label className="label">Confirm Password</label>
               <input
                value={data.confirm_password}
                onChange={e => handleChange("confirm_password", e.target.value)}
                type="password" 
                className="form-control shadow-none input"
                placeholder="Confirm Password"
              />
             
            </div>
          </div>
          <div className="btn-submit">
            <button
              type="submit"
              className="btn border-0"
           >
              Sign Up
            </button>
          </div>
        </form>

        <p className="end-btn">
          Already have an account?
          <Link className="link-primary m-1" href='/login' >login</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
