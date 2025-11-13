import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#061e35ff',
      color: 'white',
      padding: '20px 0',
      textAlign: 'center',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>BookMySlot </h3>
        <p style={{ margin: '0 0 5px 0' }}>Your smart parking solution</p>
        <p style={{ fontSize: '0.9rem', margin: '5px 0' }}>
          Contact: support@bookmyslot.com | +91 98765 43210
        </p>
        <p style={{ fontSize: '0.8rem', margin: '10px 0 0 0' }}>
          &copy; {new Date().getFullYear()} BookMySlot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

