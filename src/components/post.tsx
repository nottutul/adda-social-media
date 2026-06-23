import React from 'react'
import Image from 'next/image'
import { CircleUserRound, Ellipsis, Forward, Heart, ImageOff, MessageCircle, Share2 } from 'lucide-react'

const Post = () => {
  return (
    <div className='flex flex-col'>
        {/* User  */}
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
                {/* avatar */}
                <CircleUserRound className='w-8 h-8' />

                {/* User info */}
                <span className=''>User Name</span>
            </div>
            
            <div className='p-2 cursor-pointer hover:bg-secondary rounded-full'>
                <Ellipsis />
            </div>

        </div>



        {/* Post Description  */}
        <div className='flex flex-col gap-4'>
            <div className='w-full min-h-80 relative'>
                <ImageOff className='w-full min-h-80'/>
            </div> 
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim, consectetur facere. Eaque deserunt minus praesentium illo voluptas officiis vel voluptatibus, quasi labore, eveniet, sed fuga perspiciatis corporis rem ipsa. Natus?</p>
 
        </div>


        {/* Interactions */}
        <div className='flex items-center justify-between'>
            {/* Left side */}
            <div className='flex items-center gap-4'>
                {/* Like button */}
                <button className='flex items-center gap-2 cursor-pointer bg-accent rounded-full px-4 py-1'>
                    <Heart className='w-5 h-5'/>
                    <span>Likes</span>
                </button>
                
                {/* Comment button */}
                <button className='flex items-center gap-2 cursor-pointer bg-accent rounded-full px-4 py-1'>
                    <MessageCircle className='w-5 h-5'/>
                    <span>Comment</span>
                </button>
            </div>

            {/* Right side */}
            <div className='flex items-center gap-4 bg-accent rounded-full px-4 py-1 cursor-pointer'>
                {/* Share button */}
                <button className='flex items-center gap-2'>
                    <Forward className='w-5 h-5 '/>
                    <span>Share</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Post