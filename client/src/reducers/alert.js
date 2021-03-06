import { 
  SHOW_ALERT, CLEAR_ALERT
}from '../actions/types'


const initialState = {
  msg:'',
  color:'',
  timeoutId: null,
  showAlert:false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
 case SHOW_ALERT:
   return{
     ...state,
     ...payload,
     showAlert:true,
   }
  case CLEAR_ALERT:    
    return{
      ...state,
      timeoutId: null,
      showAlert:false,
    }
  default:
    return state
  }
}
