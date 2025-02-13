import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import { useData } from '../Context/AppContext'

const Layout = ({children,show,isRoom}) => {

  const navigate = useNavigate()

  const {IsAuthorized} = useData()

  const [Loading, setLoading] = useState(true)
  useEffect(()=>{
    const path = location.pathname
    if(!show){
      if(!IsAuthorized){
        navigate('/login')
      }
    }
    setLoading(false)
  },[IsAuthorized])
  if(Loading) return <></>
  return (
    <div>
      <div className='fixed z-30 top-0 left-0 right-0'>
      <Navbar isRoom={isRoom} show={show}/>
      </div>
        {
            children
        }
    </div>
  )
}

export default Layout