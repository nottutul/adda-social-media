import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { CircleUserRound } from 'lucide-react'


const SuggestedFriends = () => {
  return (
    <div className='flex flex-col bg-card rounded-md p-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <span className='font-bold text-md'>Suggestions</span>
        <Button variant="link"  asChild><Link href="/friends">See All</Link></Button>
      </div>

      {/* Suggestions */}
      <div className='flex flex-col gap-4 mt-4'>
         <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
                <CircleUserRound className='w-5 h-5'/>
                <span>User Name</span> 
            </div> 
            <Button variant="secondary" className='cursor-pointer rounded-full' asChild><Link href="">Follow</Link></Button>
         </div>   
         <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
                <CircleUserRound className='w-5 h-5'/>
                <span>User Name</span> 
            </div> 
            <Button variant="secondary" className='cursor-pointer rounded-full' asChild><Link href="">Follow</Link></Button>
         </div> 
         <div className='flex items-center justify-between gap-2'>
            <div className='flex items-center gap-2'>
                <CircleUserRound className='w-5 h-5'/>
                <span>User Name</span> 
            </div> 
            <Button variant="secondary" className='cursor-pointer rounded-full' asChild><Link href="">Follow</Link></Button>
         </div> 
      </div>
    </div>
  )
}
 
export default SuggestedFriends