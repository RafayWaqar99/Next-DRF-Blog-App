'use client'
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import styles from "@/app/styles/common.module.css";
import { BlogServices } from "../api/api";
import { useRouter } from "next/navigation";
import withAuth from "../components/Auth";

const Blogs = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [disableNext, setDisableNext] = useState(true)
  const [disablePrevious, setDisablePrevious] = useState(true)

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await BlogServices.fetchBlogs(currentPage);
        setBlogs(data.results);
        setDisablePrevious(currentPage === 1);
        setDisableNext(!data.next);
      } catch (error) {
        console.log(error)
      }
    };

    loadBlogs();
  }, [currentPage]);

  const handlePreviousChange = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleNextChange = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <h2>All Blogs</h2>
        <div className={styles.card_section}>
          {blogs?.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      </div>
      <div>
        <button className="btn btn btn-primary btn-lg m-2" onClick={handlePreviousChange} disabled={disablePrevious}>Previous</button>
        <button className="btn btn-primary btn-lg m-2" onClick={handleNextChange} disabled={disableNext}>Next</button>
      </div>
    </section>
  );
};

export default withAuth(Blogs);
