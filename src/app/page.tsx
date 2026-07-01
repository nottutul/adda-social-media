import AddPost from '@/components/add-post'
import Feed from '@/components/feed'
import LeftMenu from '@/components/left-menu'
import RightMenu from '@/components/right-menu'
import { div } from 'motion/react-client'
import React from 'react'

const Home = () => {
  return (
    <div className="">
      <div className="flex gap-3 max-w-(--breakpoint-xl) mx-auto px-2">
        <div className="hidden xl:block w-[15%]"><LeftMenu type='home'/></div>
          <div className="w-full lg:w-[65%] xl:w-[65%]">
            <div className='flex flex-col'>
              <AddPost/>
              <Feed/>
            </div>
          </div> 
          <div className="hidden lg:block w-[30%]"><RightMenu/></div> 
      </div>
    </div>
    
  )
}  

export default Home


