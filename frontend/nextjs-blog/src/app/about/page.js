const { default: HeroSection } = require("../components/HeroSection")

const About = () => {
    return (
        <>
       <HeroSection title= {"Our new Blogs"} imageUrl={"/blogs_logo.jpg"} />
        </>
    )
}
export default About;