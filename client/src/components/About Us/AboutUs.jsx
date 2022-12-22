import React from 'react'
import './aboutUs.css'
import { Link } from 'react-router-dom'

export default function aboutUs() {
  return (
        <div>
          <div>
            <h1 className='title'>About Us</h1>
            <p className='aboutUs'>Eventix is ​​an event marketplace with better features, cheaper services, and ease of use. Feel free to search, filter, and create events</p>
          </div>
          <div>
          <h1 className='title'>Used Technologies</h1>
          <h2 className='aboutUs'>React</h2>
          <img className='images' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/800px-React.svg.png' alt='' />
          <h2 className='aboutUs'>Redux</h2>
          <img className='images' src='https://img.icons8.com/color/480/redux.png' alt='' />
          <h2 className='aboutUs'>Sequelize</h2>
          <img className='images' src='https://assets.stickpng.com/images/58482ee4cef1014c0b5e4a75.png' alt='' />
          <h2 className='aboutUs'>Node.js</h2>
          <img className='images' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png' alt='' />
          </div>
          <div>
            <h1 className='title'>Members</h1>
            <p className='members'>Nico</p>
            <p className='members'>Marcos</p>
            <p className='members'>Celeste</p>
            <p className='members'>Maxi</p>
          </div>
          <Link to="/"><button>Back</button></Link>
        </div> 
  )
}
