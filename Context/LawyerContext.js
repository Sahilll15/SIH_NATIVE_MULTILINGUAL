import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'


const LawyerContext = createContext();


const LawyerProvider = ({ children }) => {


    const [currentLawyer, setCurrentLawyer] = useState(null);

    const [currentClient, setCurrentClient] = useState(null);

    const setCurrentLawyerFunction = (Lawyer) => {
        setCurrentLawyer(Lawyer)
    }


    const setCurrentClientFunction = (client) => {
        setCurrentClient(client)
    }


    useEffect(() => {
        console.log('currentLawyer', currentLawyer)
    }, [currentLawyer])

    useEffect(() => {
        console.log('currentclient', currentClient)
    })

    return (
        <LawyerContext.Provider value={{ currentLawyer, setCurrentLawyerFunction, setCurrentClientFunction, currentClient }}>
            {children}
        </LawyerContext.Provider>
    );
};

const useLawyer = () => {
    return useContext(LawyerContext);
};

export { LawyerProvider, useLawyer };

