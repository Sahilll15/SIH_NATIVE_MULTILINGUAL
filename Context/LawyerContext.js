import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'


const LawyerContext = createContext();


const LawyerProvider = ({ children }) => {


    const [currentLawyer, setCurrentLawyer] = useState(null);

    const [currentClient, setCurrentClient] = useState(null);

    const [currentCourtCase, setCurrentCourtCase] = useState(null)
    const setCurrentLawyerFunction = (Lawyer) => {
        setCurrentLawyer(Lawyer)
    }


    const setCurrentClientFunction = (client) => {
        setCurrentClient(client)
    }

    const setCurrentCourtCaseFunction = (casee) => {
        setCurrentCourtCase(casee)
    }


    useEffect(() => {
        console.log('currentCourtCase', currentCourtCase)
    }, [currentCourtCase])

    useEffect(() => {
        console.log('currentLawyer', currentLawyer)
    }, [currentLawyer])

    useEffect(() => {
        console.log('currentclient', currentClient)
    })

    return (
        <LawyerContext.Provider value={{ currentLawyer, setCurrentLawyerFunction, setCurrentClientFunction, currentClient, setCurrentCourtCaseFunction, currentCourtCase }}>
            {children}
        </LawyerContext.Provider>
    );
};

const useLawyer = () => {
    return useContext(LawyerContext);
};

export { LawyerProvider, useLawyer };

