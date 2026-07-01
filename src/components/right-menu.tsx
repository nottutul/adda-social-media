import React from 'react'
import SuggestedFriends from './suggested-friends'
import UpcomingEvents from './upcoming-events'
import Ads from './ads'
import UserInfoCard from './user-info-card'
import UserMediaCard from './user-media-card'

const RightMenu = ({userId}: {userId?: string}) => {
  return (
    <div className='flex flex-col gap-6 '>
      {userId ? 
      <>
        <UserInfoCard userId="test"/>
        <UserMediaCard userId="test"/>

      </> : null }

      <SuggestedFriends/>
      <UpcomingEvents/>
      <Ads/>
    </div>
  )
}

export default RightMenu


