'use client'

import styles from "@/app/create-blog/create-blog.module.css"
import {Mulish} from "next/font/google";
import {useEffect, useState} from "react";
import { BlogServices } from "../api/api";
import { useRouter } from "next/navigation";

const mulish = Mulish({
    subsets: ['latin'],
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900']
})


const CreateBlogForm = () => {
    const router = useRouter();
    const[blogData, setBlogData] = useState({
        title:"",
        content:"",
        tags:[]
    })
    const [tags, setTags] = useState("")
    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
         setBlogData((prev) => ({...prev, [name] : value}));
        }

    const handleSubmit = async (e) => {
        e.preventDefault();            
        let blogTags = tags.split(" ");
        const tagObjects = blogTags.map(tag => ({ name: tag }));
        setBlogData((prev) => ({...prev, tags: [tagObjects]}))
        let response = []
        try {
            response = await BlogServices.createBlog(blogData)
            alert("Blog created successfully")
            setBlogData({})
            router.push("/blog")
        }catch (error) {
            console.log("Error is", error)
            if (error.response && error.response.status === 401){
                alert("You need to log in first")
                router.push('/login')
            }else{
                alert("An error ocurred please try again")
                setBlogData({})
                router.push('/create-blog')
            }

    }


}
    return (
        <form className={styles.create_blog_form} onSubmit={handleSubmit}>
            <div className={styles.input_field}>
                <label htmlFor="username" className={styles.label}>
                    {/* Blog Title  */}
                    <input type="text" name="title" id="title"
                        placeholder="Enter Blog Title"
                           className={mulish.className}
                           value={blogData.title}
                           onChange={handleChange}
                           required
                    />
                </label>
            </div>

            <div className={styles.input_field}>
                <label htmlFor="content" className={styles.label}>
                    {/* Content */}
                    <input type="text" name="content" id="content"
                           placeholder="Write content here."
                           className={mulish.className}
                           value={blogData.content}
                           onChange={handleChange}
                           required
                           autoComplete="off"
                    />
                </label>
            </div>
            <div className={styles.input_field}>
                <label htmlFor="tags" className={styles.label}>
                    {/* Tags */}
                    <input type="text" name="tags" id="tags"
                           placeholder="Write tags here"
                           className={mulish.className}
                        //    value={blogData.tags}
                           value={tags}
                        //    onChange={handleChange}
                           onChange={(e)=> {
                            setTags(e.target.value)           
                        }}
                           required
                           autoComplete="off"
                    />
                </label>
                <button type="submit" className={mulish.className}>Create</button>
            </div>

            {/* <div>
                {status === 'success' && <p className={styles.success_msg}>Thank you for your message!</p>}
                {status === 'error' && <p className={styles.error_msg}>There was an error submitting your message. Please try again.</p>}

                <button type="submit" className={mulish.className}>Send Message</button>
            </div> */}
        </form>
    );
};

export default CreateBlogForm;