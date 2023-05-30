'use client';
import React, { useState } from "react";
import BlogCard from "../components/BlogCard";
import styles from "@/app/styles/common.module.css";
import fetchBlogs, { BlogServices } from "../api/api";
import { useRouter } from "next/navigation"


const Blogs = async() => {
const router = useRouter();
    let results=[]
    try {
        results = await BlogServices.fetchBlogs()
      } catch (error) {
        if (error.response && error.response.status === 401){
            alert("You need to log in first")
            router.push('/login')
        }else{
            alert("An error ocurred please try again ")
            router.push('/login')
        }
}
    

        return ( 
        <>
        <section className={styles.blogSection}>
            <div className={styles.container}>
                <h2>All Blogs</h2>
                <div className={styles.card_section}>
                { results.map((blog)=> {
                    return <BlogCard key={blog.id} {...blog}  />
                })
                }
                </div>
            </div>
        </section>
        </>
    )
            }

export default Blogs;