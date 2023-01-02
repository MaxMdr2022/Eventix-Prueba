import {useForm, } from 'react-hook-form'
import DatePicker from "react-datepicker";
import { useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import {useDispatch} from 'react-redux'
import { createEvent } from '../../Redux/actions';




export default function CreateEvent() {
  const {register, setValue, handleSubmit, reset, formState: {errors}} = useForm()
  const [selectedDate, setSelectedDate] = useState(null);
  const [price, setPrice] = useState([]);
  const dispatch = useDispatch()



  

  const handleAddItem = (e) => {
    e.preventDefault();
    setPrice([...price, { tipoDeTicket: '', precio: '' }]);
    setValue('price', [...price, { tipoDeTicket: '', precio: '' }]);
    
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setValue("date", formattedDate);
  }

  const onSubmit = (data) => {
      dispatch(createEvent(data))
      reset()
  }
  
  return (
    <div>
    <h2>Create Event</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input type="text" {...register('name', {
          // required: true,
          // maxLength: 100
        })} />
        {/* {errors.name?.type === 'required' && <p>required</p>}
        {errors.name?.type === 'maxLength' && <p>up to 100 characters</p>} */}
      </div>
      <div>
        <label>Date</label>
        <DatePicker 
        id="date"
        selected={selectedDate}
        onChange={handleDateChange}/>
      </div>
      <div>
        <label>Image</label>
        <input type="file" {...register('image')} />
      </div>
      <div>
        <label>Location</label>
        <input type="text" {...register('location')} />
      </div>
      <div>
      <button type="button" onClick={handleAddItem}>Add Price type</button>
      {price.map((item, index) => (
        <div key={index}>
          <div>
            <label>Ticket Type</label>
            <input
            name={`price[${index}].tipoDeTicket`}
            {...register(`price[${index}].tipoDeTicket`)}
            defaultValue={item.tipoDeTicket}
          />
          </div>
          <div>
            <label>Price</label>
          <input
            name={`price[${index}].precio`}
            {...register(`price[${index}].precio`)}
            defaultValue={item.precio}
          />
          </div>
          
        </div>
      ))}
      </div>
      <div>
        <label>Description</label>
        <input type="text" {...register('description')} />
      </div>
      <input type="submit" value='Create'/>
    </form>
  </div>
  )
}
