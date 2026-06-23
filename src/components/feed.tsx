import React from 'react'
import Post from './post'

const Feed = () => {
  return (
    <div className='p-4 bg-card rounded-lg flex flex-col gap-12'>
      <Post/>
      <Post/>
      <Post/>
      <Post/>
    </div>
  )
}

export default Feed