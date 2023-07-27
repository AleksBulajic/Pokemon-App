// Import React module
import React from 'react';
import './Pagination.css';


// Define the Pagination functional component
export default function Pagination({ gotoNextPage, gotoPreviusPage }) {
  return (
    <div className='button-container'>
      {gotoPreviusPage && <button className='previus-button' onClick={gotoPreviusPage}>Previous Page</button>}
      {gotoNextPage && <button className='next-button'onClick={gotoNextPage}>Next Page</button>}
    </div>
  );
}
