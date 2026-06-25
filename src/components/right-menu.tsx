import React from 'react'
import SuggestedFriends from './suggested-friends'
import UpcomingEvents from './upcoming-events'
import Ads from './ads'

const RightMenu = ({userId}: {userId?: string}) => {
  return (
    <div className='flex flex-col gap-6'>
      <SuggestedFriends/>
      <UpcomingEvents/>
      <Ads/>
    </div>
  )
}

export default RightMenu


