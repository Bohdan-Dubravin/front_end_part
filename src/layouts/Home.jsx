import React from 'react'
import { Link } from 'react-router-dom'
import Corusel from '../components/Corusel'

const Home = () => {
  return (
    <section className='w-[100%] flex-col items-center justify-center'>
      <Link
        className=' w-[150px] text-sky-500 ml-[auto] block p-[15px] hover:underline'
        to='/desktops'
      >
        See all products
      </Link>
      <div>
        <Corusel />
      </div>
    </section>
  )
}

export default Home
