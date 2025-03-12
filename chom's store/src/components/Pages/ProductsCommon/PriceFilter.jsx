import { Divider, Grid, Typography, Box, Slider, TextField, Button } from '@mui/material'
import React from 'react'
import { useState } from 'react';


function valuetext(value) {
    return `${value}°C`;
}

export default function PriceFilter() {
    const [value, setValue] = useState([0, 100]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Grid>
                <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>MỨC GIÁ</Typography>
                <Box sx={{ width: 260, ml: 1 }}>
                    <Slider
                        size="small"
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        getAriaValueText={valuetext}
                        sx={{ color: '#112637' }}
                    />
                </Box>
                <Grid display={'flex'} alignItems={'center'} gap={2}>
                    <TextField size="small" value={value[0]} sx={{ width: 80 }} /> - <TextField sx={{ width: 80 }} size="small" value={value[1]} />
                </Grid>
                <Button variant="contained" sx={{ ...styleButton }}>Lọc giá</Button>
            </Grid>
            <Grid sx={{ mr: 5, mt: 4 }} >
                <Divider />
            </Grid>
        </>
    )
}

const styleTitle = {
    fontWeight: 'bold',
    fontSize: 18
}

const styleButton = {
    mt: 2,
    borderRadius: 20,
    bgcolor: '#112637',
    '&:hover': {
        bgcolor: '#112637',
    },
}
