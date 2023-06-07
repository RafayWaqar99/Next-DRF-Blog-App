import React from "react";
import hero from '@/app/styles/herosection.module.css'
import commonStyles from "@/app/styles/common.module.css"
import Link from "next/link";
import Image from "next/image";
import { Mulish } from "next/font/google";
import { getLocalStorageItem } from "../utils/utils";

const mulish  = Mulish({
    weight: '500',
    subsets: ['latin'],
    display: 'swap'
  })

  
const HeroSection = ({title, imageUrl}) => {
    return (
        <main className={hero.main_section}>
            <div className={commonStyles.container}>
                <div className={commonStyles.grid_two_section}>
                    <div className={hero.hero_content}>
                        <h1>{title}</h1>
                        <Link href='/blog'>
                            <button className={mulish.className}>Explore Blogs</button>
                        </Link>
                        <Link href='/create-blog'>
                            <button className={mulish.className}>Write your own Blog</button>
                        </Link>
                    </div>
                    <div className={hero.hero_image}>
                        <Image src={imageUrl } alt="blogs " width={600} height={150}  /> 
                    </div>

                </div>

            </div>
        </main>
    )
}

export default HeroSection;