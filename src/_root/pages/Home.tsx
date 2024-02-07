import { account } from '@/lib/appwrite/config'
import { useEffect } from 'react'

const Home = () => {

  useEffect(() => {
    console.log(account)
  }, [])
  return (
    <div>Home</div>
  )
}

export default Home