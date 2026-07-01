"use client"
import React from 'react'
import { Button } from './ui/button'
import { ImageIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const UserProfile = () => {
    const {user} = useUser()
  return (
    <div className='bg-card rounded-md p-4 shadow-md'>
                 {/* cover photo */}
                 <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                    {/* Edit button overlay for cover photo */}
                    <div className="absolute top-2 right-2">
                        <Button 
                            className="bg-white text-primary hover:bg-gray-100 h-8 w-8 p-0 rounded-full shadow-sm flex items-center justify-center"
                            title="Edit Cover Photo"
                        >
                            <ImageIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                 {/* profile photo */}
                <div className="px-4">
                    {/* user image */}
                    <div className="h-24 w-24 rounded-full overflow-hidden relative -mt-12 border-4 border-card shadow-lg">
                        {user?.imageUrl ? (
                            <img src={user.imageUrl} alt="User" className="h-full w-full object-cover" />
                        ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center font-semibold text-primary/75 text-xl">
                                {(user?.firstName || "U")[0]} 
                            </div>
                        )}
                    </div> 
                    <div>
                      {/* name, followers, following */}
                      <div className='mt-3'>
                        <h1 className='text-2xl font-bold'>{user?.fullName}</h1>
                        <p className='text-muted-foreground'>@{user?.username}</p>
                        <div className='flex gap-4 mt-2'>
                          <div className='flex items-center gap-1'>
                            <span className='font-semibold'>2000</span>
                            <span className='text-muted-foreground'>Followers</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <span className='font-semibold'>2000</span>
                            <span className='text-muted-foreground'>Following</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                 </div>

                    
                

               </div>
  )
}

export default UserProfile 