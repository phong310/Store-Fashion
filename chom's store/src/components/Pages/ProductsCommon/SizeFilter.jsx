import { Divider, Grid, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material'
import React from 'react'


export default function SizeFilter() {

    const SizeArr = [
        {
            id: 1,
            label: '4.5',
        },
        {
            id: 2,
            label: '5',
        },
        {
            id: 3,
            label: '5.5',
        },
        {
            id: 4,
            label: '6',
        },
        {
            id: 5,
            label: '6.5',
        },
        {
            id: 6,
            label: '7',
        },
        {
            id: 7,
            label: '7.5',
        },
        {
            id: 8,
            label: '8',
        },
        {
            id: 9,
            label: '8.5',
        },
        {
            id: 10,
            label: '9',
        },
        {
            id: 11,
            label: '9.5',
        },
        {
            id: 12,
            label: '10',
        },
        {
            id: 13,
            label: '10.5',
        },
        {
            id: 14,
            label: '11',
        },
        {
            id: 15,
            label: '11.5',
        },
        {
            id: 16,
            label: '12',
        },
        {
            id: 17,
            label: '12.5',
        },
        {
            id: 18,
            label: '13',
        },
    ]

    return (
        <>
            <Grid>
                <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>KÍCH THƯỚC</Typography>
                <Box sx={{ ...styleScrollBar, maxHeight: 200, maxWidth: 260, overflowY: 'auto' }}>
                    <FormGroup>
                        {SizeArr.map((item, idx) => {
                            return (
                                <FormControlLabel key={idx} control={<Checkbox color="default" size="small" />} label={item.label} />
                            )
                        })}
                    </FormGroup>
                </Box>
            </Grid>
            <Grid sx={{ mr: 5, mt: 4 }} >
                <Divider />
            </Grid>
            {/* <Grid sx={{mt: 4, mb: 2}}>
                <img src='https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/aside_banner.png?1702732161008' style={{height:'auto', width: 260}}/>
            </Grid>
            <Grid sx={{ mr: 5, mt: 4 }} >
                <Divider />
            </Grid> */}
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