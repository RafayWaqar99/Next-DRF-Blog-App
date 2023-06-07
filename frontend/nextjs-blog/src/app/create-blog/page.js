import React from 'react';
import styles from "./create-blog.module.css";
import CreateBlogForm from '../components/CreateBlogForm';
import withAuth from '../components/Auth';

const CreateBlog = () => {
    return (
        <>
            <div className={styles.container}>
                <section className={styles.create_blog_section}>
                    <CreateBlogForm/>
                </section>
            </div>
        </>
    );
};

export default CreateBlog;