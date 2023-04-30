function Redux(state, action) {
    switch(action.type) {
        case "weather" : return {weatherValue: action.value}


        
        default: return state
    }
}
    
   
export default Redux;