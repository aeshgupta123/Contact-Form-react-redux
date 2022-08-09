const initialState=[
    
    {
        id:1,
        fname:"Aesh",
        lname:"gupta",
        phoneNumber:"123456789",
        email:"aesh@gmail.com",
        company:"TCS"
    },
    {
        id:2,
        fname:"Ashu",
        lname:"parashar",
        phoneNumber:"1234567890",
        email:"ashu@gmail.com",
        company:"TCS"
    }
]

const ContactReducer=(state=initialState,action)=>{
    switch(action.type){
        case "ADD_CONTACT":
            state=[...state,action.payload]
            return state
        case "UPDATE_CONTACT":
            const updatedState=state.filter((contact)=>
                contact.id===action.payload.id ? action.payload : contact
            )
            state=updatedState
            return state
        case "DELETE_CONTACT":
            state=state.filter((s)=>s.id!==action.payload)
            return state
        default:
            return state
    }
};

export default ContactReducer;