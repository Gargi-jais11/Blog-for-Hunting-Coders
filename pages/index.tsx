import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className={`container my-5 ${styles.homeContainer}`}>
      <Head>
        <title>Hunting Coder</title>
        <meta name="description" content="A blog for hunting coders by a hunting coder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-8">
            <div className="mb-4">
              <Image className={`${styles.profileImage}`} src="/coders_img.jpg" alt="photo" width={240} height={240} />
            </div>
            <h1 className={`mb-4 fw-bold display-4 ${styles.mainTitle}`}>&lt;Hunting Coder/&gt;</h1>
            <p className="mb-5 lead text-light fs-4">
              A blog for hunting coders by a hunting coder
            </p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className={`mb-4 fw-bold text-center ${styles.subTitle}`}>Latest Blogs</h2>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {['How to learn Javascript in 2024?', 'Understanding React in 2024', 'Mastering CSS for Modern Web Design', 'Backend Development with Node.js'].map((title, index) => (
              <div className="col" key={index}>
                <div className="card h-100 shadow-sm border-0 bg-dark text-light">
                  <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate modi excepturi mollitia autem saepe accusamus dolorem illum nemo maxime officiis?
                    </p>
                    <button className="btn btn-outline-warning">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
