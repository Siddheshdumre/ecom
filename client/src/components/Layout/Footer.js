import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className="footer">
        <h4 className='text-center'>All Rights Reserved &copy; Hyperbolicdesigns.com</h4>
        <p className="text-center mt-3">
        <Link to="/about"className="text-light"> About </Link>
        |
        <Link to="/contact"className="text-light"> Contact </Link>
        |
        <Link to="/policy"className="text-light"> Privacy Policy </Link>

        </p>


        

      
       
        </div>

  );
};

export default Footer