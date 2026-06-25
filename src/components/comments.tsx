import { CircleUserRound, Forward, Heart, MessageCircle, SendHorizontal } from 'lucide-react'
import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Input } from './ui/input'

const Comments = () => {
  return (
    <div className='flex flex-col gap-2'>
        {/* write */}
        <div className='flex flex-row gap-1'>
            <Input placeholder='Write a comment...' className=''></Input>
            <Button className='cursor-pointer'><SendHorizontal /></Button>
        </div>

        {/* comments */}
        <div className='flex flex-col'>
            <div className='flex items-center gap-2'>
                <CircleUserRound className='w-5 h-5 text-blue-400'/>
                <span>user name</span>
            </div>
            <div className='ml-7'>
                <p>Lorem ipsum dolor sit amet.</p> 
            </div>
            
        </div>

        
    </div>
  )
}

export default Comments