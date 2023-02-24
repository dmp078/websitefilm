import { createContext, useContext } from "react";

const authContext = createContext();

function GetAuthContext () {
    return useContext(authContext);
};

export {authContext, GetAuthContext};