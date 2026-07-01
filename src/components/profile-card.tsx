"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from './ui/button'

const ProfileCard = () => {
    const {user} = useUser()
    

  return (
    <div className='flex flex-col bg-card rounded-md p-4 shadow-md items-center gap-3'>
        <div className="h-10 w-10 rounded-full bg-linear-to-tr from-primary/20 to-primary/5 border border-border shrink-0 overflow-hidden shadow-xs">
            {user?.imageUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.imageUrl}
                alt={user.fullName || "User Avatar"}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.fullName || "User")}`;
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center font-semibold text-primary/75 text-sm bg-muted">
                {(user?.firstName || "U")[0]}
              </div>
            )}
          </div>
          
          <div className='flex flex-col gap-1 items-center'>
            <span className='font-semibold text-md'>{user?.fullName}</span>
            <span className='text-sm text-muted-foreground'>2000 Followers</span>
            <Button size="sm" variant="outline" asChild className='text-blue-300'><Link href="/profile">My Profile</Link></Button> 
          </div>
    </div>
  )
}

export default ProfileCard