import React from 'react';
import '../App.css'

const Contact: React.FC = () => {
  return (
    <div className='page'>
      <h1>Contact</h1>
    <div >
      <a href="https://github.com/taeyoung8/crypto" target="_blank" rel="noopener noreferrer">
        <h2>Github</h2>
      </a>
    </div>
    <div >
      <a href="mailto:taeyoung.kim970@gmail.com"><h2>Send an Email</h2></a>
    </div>
      <a href="https://www.linkedin.com/in/tae-young-kim-639874258/" target="_blank" rel="noopener noreferrer">
        <h2>LinkedIn</h2>
      </a>
    </div>
  );
};

export default Contact;
