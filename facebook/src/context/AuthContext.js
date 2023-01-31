import { createContext, useEffect, useReducer } from "react"
import { AuthReducer } from "./AuthReducer";

const initialState = {
    user :JSON.parse(localStorage.getItem("user")) || null,
    // user: {
    //     _id: "63d31bcd3dd73cfd50fbb6f5",
    //     username:"",
    //     email:"userOne@gmail.com",
    //     followers:[
    //         "63d31bcd3dd73cfd50fbb6f5",

    //     ],
    //     following:1,
    //     isAdmin:false,
    //     createdAdt:"2023-01-27T00:33:17.986Z",
    //     profilePicture:"",
    //     coverPicture:"",

    // },
    isFetching:false,
    error:false,
    
}


export const AuthContext = createContext(initialState);


const AuthProvider = ({children})=>{

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])

    return(
        <AuthContext.Provider 
            value={{
                user:state.user,
                isFetching:state.isFetching,
                error:state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider