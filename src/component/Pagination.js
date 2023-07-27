import React from 'react'

export default function Pagination({gotoNextPage, gotoPreviusPage}) {
  return (
    <div>
       {gotoPreviusPage && <button onClick={gotoPreviusPage}>Previus Page</button>}
       {gotoNextPage && <button onClick={gotoNextPage}>Next Page</button>}
    </div>
  )
}
