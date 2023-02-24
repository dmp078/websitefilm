import { createContext, useContext } from "react";

const APIContext = createContext();

function GetAPI () {
    return useContext(APIContext)
}

export {GetAPI, APIContext};