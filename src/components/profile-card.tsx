"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

interface ProfileCardProps {
  user: {
    id: string;
    username: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
    bio: string | null;
    location: string | null;
    work: string | null;
    school: string | null;
  } | null;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  if (!user) return null;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username;
  
  return (
    <div className='flex flex-col bg-card rounded-md p-4 shadow-md items-center gap-3'>
        <div className="h-10 w-10 rounded-full bg-linear-to-tr from-primary/20 to-primary/5 border border-border shrink-0 overflow-hidden shadow-xs">
            {user.avatar ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.avatar}
                alt="profile.png"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`;
                }} 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center font-semibold text-primary/75 text-sm bg-muted">
                {(user.firstName || user.username || "U")[0]}
              </div>
            )}
          </div>
          
          <div className='flex flex-col gap-1 items-center'>
            <span className='font-semibold text-md'>{fullName}</span>
            <span className='text-sm text-muted-foreground'>2000 Followers</span>
            <Button size="sm" variant="outline" asChild className='text-blue-300'>
              <Link href={`/profile/${user.username}`}>My Profile</Link>
            </Button> 
          </div>
    </div>
  )
}

export default ProfileCard