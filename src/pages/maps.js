import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Maps() {
    const API_KEY = "AIzaSyBvjDqfLz82gJb7MY62KVBvzWvxcA4Yf1o";
    const [getLatitude, setLatitude] = useState(0)
    const [getLongitude, setLongitude] = useState(0)
    
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        });
        let latlng = getLatitude + "," + getLongitude;
        let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${API_KEY}`
        axios.get(url).then(res => {
            for (let i = 0; i < res.data.results.length; i++) {
                if (res.data.results[i].types[0] === "postal_code") {
                    let address_components = res.data.results[i].address_components;
                    for (let j = 0; j < address_components.length; j++) {
                        if (address_components[j].types[0] === "postal_code") {
                            let googleGeocodePostalCode = address_components[j].long_name;
                            console.log("Google geocode postalcode loaded for viewer : ", googleGeocodePostalCode);
                        }
                    }
                }
            }
        })
    }

    return (
        <>
            <Button onClick={getPosition}>Get Location</Button>
        </>
    )
}