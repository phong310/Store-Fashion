import { Box, Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'

export default function CustomerFB() {

    const imgArrFeedBack = [
        {
            id: 1,
            img: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/insta-1.jpg?1702732161008',
        }, 
        {
            id: 2,
            img: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/insta-2.jpg?1702732161008'
        },
        {
            id: 3,
            img:'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/insta-3.jpg?1702732161008'
        },
        {
            id: 4,
            img:'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/insta-4.jpg?1702732161008'
        },
        {
            id: 5,
            img:'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/insta-5.jpg?1702732161008'
        }
    ]

    return (
        <>
            <Box sx={{ bgcolor:'#F8F8F8'}}>
                <Typography variant='h4' sx={{ ...styleTitle }}>CHÔM'S STORE ON INSTAGRAM</Typography>
                <Typography sx={{ textAlign: 'center', fontSize:14, mb: 6 }}>
                    Follow us {""}
                    <span style={{fontWeight:'bold'}}>
                        @chomstore.official
                    </span>
                </Typography>
                <Grid container justifyContent={'center'} sx={{pb: 4}}>  
                    <Grid item xs={12} sm={8}>
                        <ImageList variant="masonry" cols={5} gap={10}>
                            {imgArrFeedBack.map((item, idx) => (
                                <ImageListItem key={idx}>
                                    <img
                                        src={item.img}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}


const styleTitle = {
    textAlign: 'center',
    mt: 10,
    mb: 2,
    pt:4,
    fontWeight: 'bold'
}