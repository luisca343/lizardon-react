import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import { config } from '../../constants'

export default function Auth () {
  const [searchParams] = useSearchParams()
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {
    const cookies = new Cookies()
    if (cookies.get('twitch_token')) {
      setRedirect(true)
    }
    console.log(`${config.API_URL}/twitch/auth?&code=${searchParams.get('code')}&scope=${searchParams.get('scope')}`)
    Axios.get(`${config.API_URL}/twitch/auth?&code=${searchParams.get('code')}&scope=${searchParams.get('scope')}`)
      .then(res => {
        if (res.data.hash) {
          cookies.set('twitch_token', res.data.hash, { path: '/', maxAge: 60 * 60 * 24 * 30 })
          console.log('COOKIE: ' + cookies.get('twitch_token'))
        } else {
          console.log('debug error')
        }
      })
      .catch(error => console.log(error))
  }, [])
  if (redirect) {
    return <Navigate replace to='/twitch/perfil' />
  }
  return (
    <div className='container'>
      <h1>Cargando...</h1>
    </div>
  )
}
