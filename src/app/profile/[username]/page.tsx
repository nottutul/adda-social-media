import Feed from '@/components/feed'
import LeftMenu from '@/components/left-menu'
import RightMenu from '@/components/right-menu'
import { Button } from '@/components/ui/button'
import { Camera, ImageIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import UserProfile from '@/components/user-profile'
import { db } from '@/index'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'


const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  const user = await db.select().from(usersTable).where(eq(usersTable.username, username)).then(res => res[0]) || null;

  if(!user) return notFound();
  
  return (
    <div className="">
      <div className="flex gap-3 max-w-(--breakpoint-xl) mx-auto px-2">
        <div className="hidden xl:block w-[15%]"><LeftMenu type="profile"/></div>
          <div className="w-full lg:w-[70%] xl:w-[65%]">
            <div className='flex flex-col gap-6'> 
              <UserProfile user={user}/>
              <Feed/>
            </div>
          </div>
          <div className="hidden lg:block w-[30%]"><RightMenu userId="test"/></div> 
      </div>
    </div>
  )
}

export default ProfilePage