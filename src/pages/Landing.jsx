import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Landing() {
  return (
    <>
      <div className="landing-page">
      <Header />

      {/* Centered content */}
      <div
  className="overlay d-flex flex-column align-items-center justify-content-center text-center"
  style={{
    position: 'relative',
    backgroundImage: "url('https://standway.in/wp-content/uploads/2025/11/f2b9ee07-cb3d-4aec-b05d-efc05c45d62c.png')",
    backgroundSize: 'cover',
    minHeight: '100vh',
  }}
>
  {/* Dark overlay */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'  
  }}></div>

  {/* Content */}
  <div style={{position: 'relative', margin: '150px', zIndex: 2}}>
    <h1 className="display-4 fw-bold mb-4 text-white">Welcome to BookMySlot</h1>
    <Link to='/booking'>
      <button className="btn btn-primary btn-lg px-4 py-2 mt-5">
        Book A Slot
      </button>
    </Link>
  </div>
</div>

    </div>
    <Footer/>
    </>
  );
}

export default Landing;
