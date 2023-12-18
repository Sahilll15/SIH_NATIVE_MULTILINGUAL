import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'


const FirContext = createContext();


const FirProvider = ({ children }) => {
    const [FirData, setFirData] = useState([

    ]
    )

    const fetchfir = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/fir/getFirByUser', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmMmFkMWFmY2Y1ZmNjNjk1NmY4YmUiLCJhZGRoYXJDYXJkIjoiNjA2My0zMjExLTg2OTQiLCJpYXQiOjE3MDI4MzQ1NDZ9.kMAdRnYe3oBB_hUbC5cpv_guOMG4zxBx36vMlccjHfo`
                }
            })


            if (response.status === 200) {
                console.log(response.data)
                setFirData(response.data.Fir)
            } else {
                Alert.alert('error fetching')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = async () => {
        await fetchfir()
    }

    useEffect(() => {
        fetchData
    }, [])


    return (
        <FirContext.Provider value={{ fetchfir, FirData }}>
            {children}
        </FirContext.Provider>
    );
};

const useFir = () => {
    return useContext(FirContext);
};

export { FirProvider, useFir };

