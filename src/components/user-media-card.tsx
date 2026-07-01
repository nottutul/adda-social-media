import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const UserMediaCard = ({userId}: {userId: string}) => {
  return (
    <div className='flex flex-col bg-card rounded-md p-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <span className='font-bold text-md'>User Media</span>
        <Button variant="link"  asChild><Link href="#">See All</Link></Button>
      </div> 

      <div className='flex items-center justify-between mt-4'>
        <div className='flex gap-2 flex-wrap justify-between'>
            {Array.from({length: 9}).map((_,index) => {
              return <img key={index} src="https://images.pexels.com/photos/733864/pexels-photo-733864.jpeg" alt="" className='h-20 w-20 object-cover'/>
            })}
        </div>
      </div>


    </div>
  )
}

export default UserMediaCard