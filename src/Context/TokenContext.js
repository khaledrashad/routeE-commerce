import { createContext, useState } from "react";

export let TokenContext = createContext()

export default function TokenContextProvider (props){
    const [Token, setToken] = useState(false)

    return <TokenContext.Provider value={{Token , setToken}}>
        {props.children}
    </TokenContext.Provider>
}

