import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameEvent } from '../../Redux/actions'
import styles from './searchbar.module.css'
import search from '../../assets/search.svg'
import Sort from '../Sort/Sort'


export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleChange = (e)=>{
        setName(e.target.value)
        
    }

    const handleSubmit = (e)=>{
      if(name === ''){
        e.preventDefault()
        alert('Insert a event')
      } 
      else{
        e.preventDefault()
        dispatch(getNameEvent(name))
        setName('')
      }
    }

    


  return (

    <div>

      <div>
        {/* <Sort/>*/}
      </div>


      <div>

        <form className={styles.container}>
          <input onChange={handleChange} value={name} onSubmit={handleSubmit} className={styles.searchBar} type="text" placeholder='search...'/>
          <button  onClick={handleSubmit} className={styles.btn}>
            <img className={styles.searchimage} src={search} alt="" />
          </button>
        </form>

      </div>

    </div>
    
    
  )
}
