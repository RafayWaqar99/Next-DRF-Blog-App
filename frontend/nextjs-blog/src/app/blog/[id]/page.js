'use client';
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/common.module.css"
import  { BlogServices } from "@/app/api/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

 const Page = ({params}) => {

    const router = useRouter()    
    const id =params.id
    const [blogData, setBlogData] = useState({})
    const [updateBlogData, setUpdateBlogData] = useState({})

    useEffect(() => {
        const fetchData = async () => {
          try {
            const blog = await BlogServices.fetchSingleBlog(id);
            setBlogData((prevBlogData) => ({
                ...prevBlogData,
                id: blog.id,
                author: blog.author,
                title: blog.title,
                content: blog.content,
                tags:blog.tags
              }));
              setUpdateBlogData(blog)
          } catch (error) {
            if (error.response && error.response.status === 401) {
              alert("You need to log in first");
              router.push("/login");
            } else {
              alert("An error occurred. Please try again.");
              router.push("/login");
            }
          }
        };
    
         fetchData();        
      }, [id, router]);

    const handleDeleteBlog = async(id) => {
        let res = null;
        try {
            res = await BlogServices.deleteBlog(id) 
            alert(res)
            router.push("/")

             } catch (error) {
           if (error.response && error.response.status === 401){
               alert("You need to log in first")
               router.push('/login')
           }else{
               alert("You don't have the permission to perform this action. Only author can do this")
               router.push('/')
           }
   
   }
    }


    const handleUpdateBlog = async() => {
        let res = null;
        try {
            res = await BlogServices.updateBlog(blogData.id, updateBlogData) 
            alert(res)  
            router.push("/")

             } catch (error) {
           if (error.response && error.response.status === 401){
               alert("You need to log in first")
               router.push('/login')
           }else{
            console.log("Error", error)
               alert("You don't have the permission to perform this action. Only author of blog can do this")
               router.push('/')
           }
   }
    }


    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.blog_title}> Blog by <span>{blogData.author}</span> </h2>
                <div className={styles.card_section}>
                </div>
                <div className={styles.card_data}>
                    <h2>Title: {blogData.title}</h2>
                    <p><h2>Content:</h2> {blogData.content}</p>
                </div>
                <div>
                    <button type="button" className="btn btn-danger btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    > Update 
                    </button>
                </div>
                <button className="btn btn-success btn-lg mt-1" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
            </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update your blog here</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form>
                <div class="mb-3">
                    <label htmlFor="blog-title" className="col-form-label">Title: </label>
                    <input type="text" name="blog-title" class="form-control" id="blog-title" value={updateBlogData.title} 
                    onChange={(e)=>{setUpdateBlogData((prev) => ({...prev, title : e.target.value}))}}/>
                   
                </div>
                <div class="mb-3">
                    <label htmlFor="blog-content" className="col-form-label">Content:</label>
                    <textarea class="form-control" name="blog-content" id="blog-content" value={updateBlogData.content}
                    onChange={(e)=>{setUpdateBlogData((prev) => ({...prev, content : e.target.value}))}}
                    >
                    </textarea>

                </div>
            </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={handleUpdateBlog}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
    }

 export default Page;