import React from "react";
import styles from "@/app/styles/common.module.css";
import Image from "next/image";
import Link from "next/link";
import withAuth from "./Auth";

const BlogCard = (blog) => {
    const {id, title, content} = blog;
    return (
        <>
            <div className={styles.card}>
                <div className={styles.card_image}>
                    <Image src='/blogs_logo.jpg' alt={title} width={350} height={150}/>
                </div>
                <div className={styles.card_data}>
                <h3>{title.substring(0,18)}</h3>
                <p>{content.substring(0,66)}</p>
                    <Link href={`/blog/${id}`}>
                        <button>Read More</button>
                    </Link>
                </div>
            </div>        
        </>
    )
}

export default withAuth(BlogCard);