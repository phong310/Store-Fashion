import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';


const PriceArr = [
    {
        id: 1,
        label: 'Giá dưới 100.000đ'
    },
    {
        id: 2,
        label: '100.000đ - 200.000đ'
    },
    {
        id: 3,
        label: '200.000đ - 300.000đ'
    },
    {
        id: 4,
        label: '300.000đ - 500.000đ'
    },
    {
        id: 5,
        label: '500.000đ - 1.000.000đ'
    },
    {
        id: 6,
        label: '1.000.000đ - 1.500.000đ'
    },
    {
        id: 7,
        label: '1.500.000đ - 2.000.000đ'
    },
    {
        id: 8,
        label: '2.000.000đ - 2.500.000đ'
    },
    {
        id: 9,
        label: '2.500.000đ - 3.000.000đ'
    },
    {
        id: 10,
        label: '3.000.000đ - 3.500.000đ'
    },
    {
        id: 11,
        label: '3.500.000đ - 4.000.000đ'
    },
    {
        id: 12,
        label: '4.000.000đ - 4.500.000đ'
    },
    {
        id: 13,
        label: '4.500.000đ - 5.000.000đ'
    },
    {
        id: 14,
        label: '5.000.000đ - 5.500.000đ'
    },
    {
        id: 15,
        label: '5.500.000đ - 6.000.000đ'
    },
    {
        id: 16,
        label: 'Giá trên 6.000.000đ'
    },
]

export default function PriceFilter({ onPriceChange }) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleCheckboxChange = (event, value) => {
        if (event.target.checked) {
            setSelectedValue([value]);
            onPriceChange([value]);
        } else {
            setSelectedValue([]);
            onPriceChange([]);
        }
    };


    return (
        <>
            <Grid>
                <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>MỨC GIÁ</Typography>
                <Box sx={{ ...styleScrollBar, maxHeight: 200, maxWidth: 260, overflowY: 'auto' }}>
                    <FormGroup>
                        {PriceArr.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Checkbox
                                        color="default"
                                        size="small"
                                        checked={selectedValue.includes(item.label)}
                                        onChange={(e) => handleCheckboxChange(e, item.label)}
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </FormGroup>
                </Box>
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

const styleScrollBar = {
    scrollbarWidth: 'thin',
    // scrollbarColor: 'rgba(0,0,0,.1) rgba(0,0,0,0)',
    '::-webkit-scrollbar': {
        width: '0.4em'
    },
    '::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        outline: '1px solid slategrey'
    }
}