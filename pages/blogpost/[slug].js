import React ,{useEffect,useState} from "react";
import { useRouter } from "next/router";
import styles from "@/styles/BlogPost.module.css";
//step 1:find the file corresponding to the slug
//step 2: populate them inside the page
const slug = (props) => {

  function createMarkup(content)
  {
    return {__html: content};
  }

  const [blog,setBlog] = useState(props.blogData);
  const router = useRouter();

  return (
 
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{blog && blog.title}</h1>
        <hr />
        
        {blog && <div dangerouslySetInnerHTML={createMarkup(blog.content)} style={{margin:"2rem",alignContent:"center"}}></div>}
          {/* {blog && blog.content}this is done because fetching api will take some time so inoder to first fetch api we ensure that the blog is defined then blog.title is taken */}
        
      </main>
    </div>
  );
};

export async function getServerSideProps(context){
    const { slug } = context.query;
  
    let data = await fetch(`http://localhost:3000/api/getblog?slug=${slug}`);
    let blogData = await data.json();
  
  return {
    props : {blogData},
  }
}
export default slug;
