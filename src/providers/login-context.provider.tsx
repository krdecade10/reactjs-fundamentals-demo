import { FC, useState } from "react";
import { createContext } from "react";
import { LoginContextState, LoginProfile } from "../models/login-context.model";

const loginContextDefaultValues: LoginContextState = {
    profile: {
        isLogin: false,
        name: "",
        userId: -1
    },
    saveLoginProfile: () => { return; },
    deleteLoginProfile: () => { return; }
};

const LoginContext = createContext<LoginContextState>(loginContextDefaultValues);

const LoginContextProvider: FC = ({ children }) => {
    const [profile, setLoginProfile] = useState<LoginProfile>(loginContextDefaultValues.profile);
    
    const saveLoginProfile = (newProfile: LoginProfile) => {
        setLoginProfile(newProfile);
    }

    const deleteLoginProfile = () => {
        setLoginProfile(loginContextDefaultValues.profile);
    }

    return (
        <LoginContext.Provider value={{
            profile,
            saveLoginProfile,
            deleteLoginProfile
        }}>
            { children }
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginContextProvider }