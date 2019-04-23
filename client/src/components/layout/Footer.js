import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
     &copy; {new Date().getFullYear()} INSTAGRAM
    </footer>
  )
}

 