import { createContext, useState } from "react";

export let TokenContext = createContext()

export default function TokenContextProvider(props) {
    const [Token, setToken] = useState(null)

    return <TokenContextProvider value={{ Token, setToken }}>
            {props.children}
        </TokenContextProvider>

}