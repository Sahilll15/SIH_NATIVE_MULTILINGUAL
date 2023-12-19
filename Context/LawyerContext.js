import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'


const LawyerContext = createContext();


const LawyerProvider = ({ children }) => {


    const [currentLawyer, setCurrentLawyer] = useState(null);

    const setCurrentLawyerFunction = (Lawyer) => {
        setCurrentLawyer(Lawyer)
    }


    useEffect(() => {
        console.log('currentLawyer', currentLawyer)
    }, [currentLawyer])

    return (
        <LawyerContext.Provider value={{ currentLawyer, setCurrentLawyerFunction }}>
            {children}
        </LawyerContext.Provider>
    );
};

const useLawyer = () => {
    return useContext(LawyerContext);
};

export { LawyerProvider, useLawyer };

