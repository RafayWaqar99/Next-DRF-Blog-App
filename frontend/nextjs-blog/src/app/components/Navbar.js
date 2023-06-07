'use client';
import React, { useEffect, useState } from "react";
import styles from '@/app/styles/navbar.module.css'
import Link from "next/link";
import { getLocalStorageItem, removeLocalStorageItem } from "../utils/utils";
import { useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export const Navbar = () => {
    const [token, setToken] = useState(getLocalStorageItem())
    const router = useRouter();
    
    return (
        <nav className={styles.navbar}>
            <div>
                <ul  className={styles.navbarList}>
                    <li className={styles.navbarItem}>
                        <Link className={styles.navbarLink} href='/' >Home</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link className={styles.navbarLink} href='/about' >About</Link>
                    </li>
                    <li className={styles.navbarItem}>
                        <Link className={styles.navbarLink} href='/blog' >Blogs</Link>
                    </li>
                    { !!token ? 
                    <button onClick={() => {
                        setToken(removeLocalStorageItem())
                        router.push("/")
                        }}
                    >
                        Logout 
                    </button> :
                    <>
                        <li className={styles.navbarItem}>
                            <button onClick={()=>router.push('/login')}>Login</button>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink} href='/signup' >Sign Up</Link>
                        </li>
                    </>
                       
                    }

                </ul>

            </div>
        </nav>
    )
}