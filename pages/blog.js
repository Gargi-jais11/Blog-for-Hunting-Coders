import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as fs from 'fs';

const Blog = (props) => {
  const [blogs, setBlogs] = useState(props.allBlogs);
  const [count, setCount] = useState(5);

  const fetchData = async () => {
    let response = await fetch(`http://localhost:3000/api/blogs/?count=${count + 2}`);
    setCount(count + 2);
    let data = await response.json();
    setBlogs(data);
  };

  return (
    <div className="container-fluid my-5">
      <main>
        <InfiniteScroll
          dataLength={blogs.length}
          next={fetchData}
          hasMore={props.allCount !== blogs.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="row">
            {blogs.map((blogsitem) => (
              <div key={blogsitem.slug} className="col-md-6 mb-4">
                <div className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <Link href={`blogpost/${blogsitem.slug}`}>
                      <h2 className="card-title h5">{blogsitem.title}</h2>
                    </Link>
                    <p className="card-text flex-grow-1">
                      {blogsitem.metadesc.substr(0, 150)}...
                    </p>
                    <Link href={`blogpost/${blogsitem.slug}`} className="mt-3" style={{ color: 'blue', fontSize: '0.875rem' }}>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  let data = await fs.promises.readdir('blogdata');
  let allCount = data.length;
  let myfile;
  let allBlogs = [];
  for (let index = 0; index < 5; index++) {
    const element = data[index];
    myfile = await fs.promises.readFile('blogdata/' + element, 'utf-8');
    allBlogs.push(JSON.parse(myfile));
  }
  return {
    props: { allBlogs, allCount },
  };
}

export default Blog;
