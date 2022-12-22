import axios from "axios";

//-------------------------------------------------
export const GET_ALL_EVENTS = "GET_ALL_EVENTS";

export const ERROR = "ERROR";

export const ORDER_BY_NAME = "ORDER_BY_NAME";

export const FILTER = "FILTER";

export const GET_EVENT_ID = "GET_EVENT_ID";

export const GET_NAME_EVENT = "GET_NAME_EVENT";

export const CREATE_EVENT = "CREATE_EVENT";

export const SORT = "SORT";

export const GET_ALL_EVENT_LIST = 'GET_ALL_EVENT_LIST';

export const PAY_CRYPTO = "PAY_CRYPTO";
//-------------------------------------------------
const URL = "http://localhost:3001";
//-------------------------------------------------



export const getAllEvents = (page) => {

  return async function (dispatch) {

    try {

      const event = await axios.get(`${URL}/events/page/${page}`);

      dispatch({

        type: GET_ALL_EVENTS,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
};

export const getAllEventList = () => {
  return async function (dispatch) {

    try {

      const event = await axios.get(`${URL}/events/allevents`);

      dispatch({

        type: GET_ALL_EVENT_LIST,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
}

export const getNameEvent = (name) => {

  return async function (dispatch) {

    try {

      const event = await axios.get(`${URL}/events/page/:page?name=${name}`);

      dispatch({

        type: GET_NAME_EVENT,
        payload: event.data
      });

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      });
    };
  };
};

export const orderByName = (order) => {

  return async function (dispatch) {

    try {

      const eventOrder = await axios.get(`${URL}/order`, order);

      dispatch({

        type: ORDER_BY_NAME,
        payload: eventOrder.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    };
  };
};

export const filter = (date) => {   

  return async function (dispatch) {

    try {
      // console.log("action",date);
      const eventDate = await axios.post(`${URL}/filters`, date);

      dispatch({

        type: FILTER,
        payload: eventDate.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    };
  };
};

export const searchEventById = (id) => {
  return async function (dispatch){
    try {
    
      const eventDetailed = await axios.get(URL + `/events/${id}`)
      console.log(eventDetailed.data)
      dispatch({
        type: GET_EVENT_ID,
        payload: eventDetailed.data
      })

    } catch (error) {
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  }
}

export const createEvent = (data) => {

  return async function(dispatch){

    try {
      
      const event = await axios.post(`${URL}/events`, data);

      dispatch({

        type: CREATE_EVENT,
        payload: event.data
      })

    } catch (error) {

      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const sort = (value) =>{

  return async function (dispatch){

    try {
      
      const eventSort = await axios.get(`${URL}/events/order/`+ value);

      dispatch({

        type: SORT,
        payload: eventSort.data
      })

    } catch (error) {
  
      dispatch({

        type: ERROR,
        payload: error.message
      })
    }
  };
};

export const payCrypto = (data) =>{

  return async function (dispatch){

    try {
      console.log("action", data);
      // const {precio,cantidad,total,name,date,img} = data
      await axios.post(`${URL}/paycrypto/create-charge`,data );

    } catch (error) {
     
      dispatch({
        type: ERROR,
        payload: error.message
      })
    }
  };
};