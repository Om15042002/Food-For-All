export const initialstate={type:"",logged:false}



export const reducer = (state, action) => {
    switch (action.act) {
      case "loggedin":
        return { type: action.type, logged: true};
      case "loggedout":
        return { type: action.type, logged: false }
      default:
        return state
    }
  }