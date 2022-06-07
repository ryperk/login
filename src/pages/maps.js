import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Typography } from '@mui/material';

export default function Maps() {
    const API_KEY = "AIzaSyBvjDqfLz82gJb7MY62KVBvzWvxcA4Yf1o";
    const [getLatitude, setLatitude] = useState(0)
    const [getLongitude, setLongitude] = useState(0)
    const [getPostalCode, setPostalCode] = useState(0)
    const [open, setOpen] = React.useState(false);

    const Item = styled(Paper)(({ theme }) => ({
        boxShadow: 'none',
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        // padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary
    }));

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

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
                            setPostalCode(googleGeocodePostalCode);
                            setOpen(true);
                        }
                    }
                }
            }
        })
    }

    return (
        <>
            <Box>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Item><Button variant='contained' onClick={getPosition}>Get Location</Button></Item>
                    </Grid>
                    <Grid item xs={6}>
                        <Item>Postal Code : {getPostalCode}</Item>
                    </Grid>
                    
                </Grid>
                {/* <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    message={getPostalCode}
                    onClose={handleClose}
                    action={action}
                /> */}

            </Box>

        </>
    )
}