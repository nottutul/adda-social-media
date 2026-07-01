import React from 'react'
import ProfileCard from './profile-card'
import Link from 'next/link'
import { GraduationCap, ImageMinus, Newspaper, Settings, SquareActivity, Store } from 'lucide-react'
import Ads from './ads'

const LeftMenu = ({type}: {type: 'home' | 'profile'}) => {
  return (
    <div className='flex flex-col gap-6'>
      {type === 'home' && <ProfileCard/>}

      <div className='flex flex-col gap-2 bg-card rounded-md p-4 shadow-md'>
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <ImageMinus className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>My Posts</span> 
        </Link>
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <SquareActivity className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>Activity</span> 
        </Link>
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <Store className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>Market</span> 
        </Link> 
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <Newspaper className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>News</span> 
        </Link>
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <GraduationCap className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>Courses</span> 
        </Link> 
        <Link href="#" className='flex items-center gap-2 p-2 hover:bg-muted rounded-md'>
          <Settings className='w-4 h-4 text-muted-foreground'/>
          <span className='text-sm font-semibold text-muted-foreground'>Settings</span> 
        </Link>

        
      </div>
      <Ads/>
    </div>
  )
}

export default LeftMenu

