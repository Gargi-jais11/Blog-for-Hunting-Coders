import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

const Navbar = () => {
  useEffect(() => {
    const bootstrap = typeof window !== 'undefined' ? require('bootstrap') : null;
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item me-4">
              <Link href="/">
                <span className="nav-link cursor-pointer fw-bold fs-5 text-white">Home</span>
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link href="/about">
                <span className="nav-link cursor-pointer fw-bold fs-5 text-white">About Us</span>
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link href="/blog">
                <span className="nav-link cursor-pointer fw-bold fs-5 text-white">Blog Post</span>
              </Link>
            </li>
            <li className="nav-item me-4">
              <Link href="/contact">
                <span className="nav-link cursor-pointer fw-bold fs-5 text-white">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
