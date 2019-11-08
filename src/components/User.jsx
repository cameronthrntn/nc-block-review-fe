import React, {useContext} from 'react'
import UserContext from './UserContext';


export default function User({username}) {
  const user = useContext(UserContext);
  return (
    <div>
      {username}
    </div>
  )
}
