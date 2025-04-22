import { Divider, Grid, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material'
import React, { useState } from 'react'

export default function SizeFilter({ onSizeChange, type }) {
    const [selectedSize, setSelectedSize] = useState();

    const SizeArr = [
        { id: 1, label: '4.5' },
        { id: 2, label: '5' },
        { id: 3, label: '5.5' },
        { id: 4, label: '6' },
        { id: 5, label: '6.5' },
        { id: 6, label: '7' },
        { id: 7, label: '7.5' },
        { id: 8, label: '8' },
        { id: 9, label: '8.5' },
        { id: 10, label: '9' },
        { id: 11, label: '9.5' },
        { id: 12, label: '10' },
        { id: 13, label: '10.5' },
        { id: 14, label: '11' },
        { id: 15, label: '11.5' },
        { id: 16, label: '12' },
        { id: 17, label: '12.5' },
        { id: 18, label: '13' },
    ]

    const sizeClo = [
        { id: 1, label: 'S' },
        { id: 2, label: 'M' },
        { id: 3, label: 'L' },
        { id: 4, label: 'XL' },
    ]

    const handleCheckboxSize = (event, value) => {
        if (selectedSize === value) {
            setSelectedSize();
            onSizeChange();
        } else {
            setSelectedSize(value);
            onSizeChange(value);
        }
    }

    return (
        <>
            <Grid>
                {type === 'accessories' ? '' : <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>KÍCH THƯỚC</Typography>}
                <Box sx={{ ...styleScrollBar, maxHeight: 200, maxWidth: 260, overflowY: 'auto' }}>
                    <FormGroup>
                        {type === 'clothing' ? sizeClo.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Checkbox
                                        color="default"
                                        size="small"
                                        checked={selectedSize === item.label}
                                        onChange={(e) => handleCheckboxSize(e, item.label)}
                                    />
                                }
                                label={item.label}
                            />
                        )) : type === 'accessories' ? '' : SizeArr.map((item, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={
                                    <Checkbox
                                        color="default"
                                        size="small"
                                        checked={selectedSize === item.label}
                                        onChange={(e) => handleCheckboxSize(e, item.label)}
                                    />
                                }
                                label={item.label}
                            />
                        ))}
                    </FormGroup>
                </Box>
            </Grid>
            {type === 'accessories' ? '' : <Grid sx={{ mr: 5, mt: 4 }} >
                <Divider />
            </Grid>}

        </>
    )
}

const styleTitle = {
    fontWeight: 'bold',
    fontSize: 18
}

const styleScrollBar = {
    scrollbarWidth: 'thin',
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
