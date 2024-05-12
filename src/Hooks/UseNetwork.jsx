import React, { useEffect, useState } from 'react'

export default function UseNetwork() {
    const [isOnline, setIsOnline] = useState(true)

    function detectOnline() {
        window.addEventListener('online' , function(){
            setIsOnline(true)
        })

        window.addEventListener( 'offline', function(){
            setIsOnline(false)
        })
    }

    useEffect(() => {
     detectOnline()
    },[])
    
  return <>
        {isOnline?<div className='network'>You Are Online</div>:<div className='network'> <i className='fas fa-wifi mx-2'></i> You Are Offline</div>}
    </>

  
}
