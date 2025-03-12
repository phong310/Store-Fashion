import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export default function FooterLicense() {
    return (
        <>
            <Grid sx={{ ...gridContainer }}>
                <Grid container justifyContent={'center'} gap={2} alignItems={'center'}>
                    <Grid item>
                        <Typography variant='h6' sx={{ ...styleRegister }}>Đăng ký nhận tin</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField size='small' fullWidth label="Nhập email..." sx={{ ...styleTextField }} />
                    </Grid>
                    <Grid>
                        <Button variant="contained" sx={{ ...styleButton }}>Đăng ký</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} gap={2} alignItems={'center'} sx={{ pt: 2 }}>
                <Typography variant='h6' sx={{ ...styleTypo }}>
                    Bản quyền thuộc về <span style={{ ...colorText }}>Chôm's Store</span> | Cung cấp bởi <span style={{ ...colorText }}>TheWind</span>
                </Typography>
            </Grid>
            <Grid container justifyContent={'center'} sx={{ py: 2 }}>
                <img src='https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/payment_logos.png?1702732161008' />
            </Grid>
        </>
    )
}

const styleTextField = {
    '& label': {
        color: 'gray',
        fontWeight: 'bold',
    },
    '& label.Mui-focused': {
        color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'gray',
            border: '1px solid gray'
        },
        '&:hover fieldset': {
            borderColor: 'gray',
            border: '1px solid gray'
        },
        '&.Mui-focused fieldset': {
            borderColor: 'gray',
            border: '1px solid gray'
        },
    }
}

const gridContainer = {
    my: 4,
    py: 2,
    mx: { xs: 'unset', lg: 43 },
    backgroundColor: '#00000033'
}


const styleButton = {
    // borderRadius: 50,
    bgcolor: '#112637',
    width: 130,
    mr: 4,
    '&:hover': {
        bgcolor: '#112637',
    },
}

const colorText = {
    color: '#ECBE88'
}

const styleTypo = {
    color: 'white',
    fontSize: 14
}

const styleRegister = {
    color: 'white',
    fontWeight: 'bold'
}