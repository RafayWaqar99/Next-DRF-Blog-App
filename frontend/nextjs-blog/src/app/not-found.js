import React from "react";
import styles from "@/app/styles/common.module.css"
import Link from "next/link";
const NotFound = () => {
    return (
        <section className={styles.container}>
            <div className={styles.error_page}>
                <h1>404 Not Found</h1>
                <p>The requested page is not found</p>
                <Link href="/" >
                    <button>Go to home page</button>
                </Link>
            </div>
        </section>
    )
}

export default NotFound;