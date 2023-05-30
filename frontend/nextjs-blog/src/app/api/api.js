
import axios from "axios";
import React from "react";
import { getLocalStorageItem } from "../utils/utils";

const baseURL = "http://127.0.0.1:8000"


const fetchBlogs = async () => {
    const headers = {
        Accept: "application/json",
        Authorization: `JWT ${getLocalStorageItem()}`
    }
  try {
    const response = await axios.get(`${baseURL}` + `/blogs/`, {headers});
    if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Authentication failed");
      }
  }catch(error){
    console.log("throwing error in catch", error)
    throw  error; 
  } 
};

const fetchSingleBlog = async (id) => {
    const headers = {
        Accept: "application/json",
        Authorization: `JWT ${getLocalStorageItem()}`
      }
      try{
        const response = await axios.get(`${baseURL}` + `/blog/${id}/`, {headers})
        if (response.status === 200){
            return response.data
        }else{
            throw new Error("Something went wrong")
        }        
      }catch(error){
        throw error;
      }
}

const authenticateUser = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/user/login/`, {username: data.username, password: data.password})
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      throw  error.response.data.non_field_errors[0];
    }
  };

const createBlog = async(data) => {
    const headers = {
        Accept: "application/json",
        Authorization: `JWT ${getLocalStorageItem()}`
      }
    try {
        const response = await axios.post(`${baseURL}/blogs/`, {title: data.title, content: data.content, tags: data.tags}, {headers})
        if (response.status === 201) {
          return response.data;
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        throw  error;
      }
}

const deleteBlog = async(id) => {
    const headers = {
        Accept: "application/json",
        Authorization: `JWT ${getLocalStorageItem()}`
      }
    try {
        const response = await axios.delete(`${baseURL}/blog/${id}/`, {headers})
        if (response.status === 204) {
          return "Blog successfully deleted"
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        throw  error;
      }
}

const updateBlog = async(id, data) => {
    const headers = {
        Accept: "application/json",
        Authorization: `JWT ${getLocalStorageItem()}`
      }
    try {
        const response = await axios.patch(`${baseURL}/blog/${id}/`,{title:data.title, content: data.content}, {headers})
        if (response.status === 200) {
          return "Blog successfully updated"
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        throw  error;
      }
}


export const BlogServices = {
    fetchBlogs,
    fetchSingleBlog,
    createBlog,
    deleteBlog,
    updateBlog
};

export const AuthServices = {
    authenticateUser
}

