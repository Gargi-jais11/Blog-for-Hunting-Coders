import React, {useEffect, useState} from 'react'
import styles from "@/styles/Blog.module.css";
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as fs from 'fs'

const blog = (props) => {
  const [blogs,setBlogs] = useState(props.allBlogs);
  const [count,setCount] = useState(5);

  const fetchData = async() => {
    let d =  await fetch(`http://localhost:3000/api/blogs/?count=${count+2}`)
    setCount(count+2);
    let data= await d.json()
    setBlogs(data)
  
  }
  return (
    <div className={styles.container} >
      <main className={styles.main} >
      <InfiniteScroll
  dataLength={blogs.length} //This is important field to render the next data
  next={fetchData}
  hasMore={props.allCount !== blogs.length}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }

>
{blogs.map((blogsitem)=>{
          return <div key={blogsitem.slug}>
  <Link href={`blogpost/${blogsitem.slug}`}>
  <h2 className={styles.blogItem}>{blogsitem.title}</h2>
  </Link>
    <p className={styles.blogItemp}>{blogsitem.metadesc.substr(0,300)}...</p>
  </div>
        })}
  
</InfiniteScroll>

     
  
  </main>
</div>
  )
};

export async function getServerSideProps(context){
  let data=await fs.promises.readdir("blogdata");
  let allCount=data.length;
  let myfile;
  let allBlogs = []
  for (let index = 0; index < 5; index++) {
    const element = data[index];
    myfile=await fs.promises.readFile(('blogdata/'+element),'utf-8')
    allBlogs.push(JSON.parse(myfile))
  }
  return {
    props : {allBlogs, allCount},
  }
}

export default blog;
