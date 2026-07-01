import React from 'react'
import { Button } from './ui/button'
import Button10 from './ui/button-10'

import Link from 'next/link'
import { Briefcase, GraduationCap, MapPinHouse } from 'lucide-react'

const UserInfoCard = ({userId}: {userId: string}) => {
  return (
    <div className='flex flex-col bg-card rounded-md p-4 shadow-md'>
      <div className='flex items-center justify-between'>
        <span className=' font-semibold text-md'>User Information</span>
        
      </div> 

      <div className='flex flex-col gap-3 mt-4'>
        <div className=' flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
              <span className='text-sm font-semibold'>John Doe</span>
              <span className='text-sm font-semibold text-muted-foreground'>@jones</span>
          </div>
          
          <span className='text-xs text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, laborum.</span>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <MapPinHouse className='w-4 h-4 text-muted-foreground'/>
            <span className='text-sm  text-muted-foreground'>From <Link href="#" className='text-blue-500'>Dhaka</Link></span>
          </div>
            
          <div className='flex items-center gap-2'>
            <Briefcase className='w-4 h-4 text-muted-foreground'/>
            <span className='text-sm  text-muted-foreground'>Works at <Link href="#" className='text-blue-500'>Google</Link></span>
          </div>

          <div className='flex items-center gap-2'>
            <GraduationCap className='w-4 h-4 text-muted-foreground'/>
            <span className='text-sm  text-muted-foreground'>Studied at <Link href="#" className='text-blue-500'>DU</Link></span>
          </div>

        </div>

        <div>
          <span className='text-sm  text-muted-foreground'>Joined on November 2023</span>
        </div>

        <div>
          <Button className="w-full bg-transparent bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 [background-size:200%_auto] [background-position:0%_center] text-white hover:bg-transparent hover:[background-position:100%_center] transition-[background-position] duration-500 ease-out focus-visible:ring-sky-600/20 dark:from-sky-400 dark:via-sky-300 dark:to-sky-400 dark:focus-visible:ring-sky-400/40">
            Following
          </Button>
        </div>


      </div>
    </div>
  )
}

export default UserInfoCard