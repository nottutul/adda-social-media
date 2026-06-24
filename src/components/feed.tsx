import React from 'react'
import Post from './post'

const Feed = () => {
  return (
    <div className='rounded-lg flex flex-col gap-4'>
      <div className='bg-card rounded-md p-4 shadow-md'><Post/></div>
      <div className='bg-card rounded-md p-4 shadow-md'><Post/></div>
      <div className='bg-card rounded-md p-4 shadow-md'><Post/></div>
      <div className='bg-card rounded-md p-4 shadow-md'><Post/></div>
    </div>
  )
}

export default Feed