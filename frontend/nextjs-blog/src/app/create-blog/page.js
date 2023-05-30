import React from 'react';
import styles from "./create-blog.module.css";
import CreateBlogForm from '../components/CreateBlogForm';

const CreateBlog = () => {
    return (
        <>
            <div className={styles.container}>
                <section className={styles.contact_section}>
                    <CreateBlogForm/>
                </section>
            </div>
        </>
    );
};

export default CreateBlog;