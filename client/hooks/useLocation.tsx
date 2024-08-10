import * as Location from "expo-location"
import { FC, useEffect, useState } from "react";

interface Params {
    longitude: number,
    latitude: number,
    response: any,
}

const useLocation = (): Params => {
    const [latitude, setLatitude] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);
    const [response, setResponse] = useState<any>()
    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.log("Permission to location was nor granted");

        }

        const { coords } = await Location.getCurrentPositionAsync();

        const { latitude, longitude } = coords
        setLatitude(latitude)
        setLongitude(latitude)


        if (coords) {
            console.log(coords.latitude, coords.longitude);
        }

        const response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
        })

        console.log(response);


        setResponse(response)
    }

    useEffect(() => {
        getCurrentLocation()
    }, [])

    return {
        latitude: latitude,
        longitude: longitude,
        response: response
    }
}

export default useLocation