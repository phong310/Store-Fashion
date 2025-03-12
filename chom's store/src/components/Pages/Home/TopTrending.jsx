import { Grid, IconButton, Rating, Typography } from '@mui/material'
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import "../../../CSS/ShoesItem.css"
import { ArrShoes } from '../../ProductItems/ShoeItem';


export default function TopTrending() {
    return (
        <>
            <Typography variant='h4' sx={{ ...styleTitle }}>TRENDING</Typography>
            <Grid container justifyContent={'center'} spacing={4} sx={{
                textAlign: 'center',
                px:10
            }}>
                <Swiper
                    slidesPerView={5}
                    // centeredSlides={true}
                    className="mySwiper"
                    modules={[Navigation]}
                    navigation={true}
                >
                    {ArrShoes.map((item, idx) => {
                        return (
                            <SwiperSlide>
                                <Grid item key={idx} sx={{ position: 'relative' }}>
                                    <div className="shoe-container">
                                        <img src={item.img} style={styleImg} />
                                        <div className="overlay"></div>
                                        <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                                            <IconButton sx={{ ...iconButtonHover }}>
                                                <ShoppingCartIcon />
                                            </IconButton>
                                            <IconButton sx={{ ...iconButtonHover }}>
                                                <ZoomInIcon />
                                            </IconButton>
                                        </Grid>
                                    </div>
                                    <Typography>{item.name}</Typography>
                                    <Rating name="no-value" value={item.rating} />
                                    <Typography>{item.price}</Typography>
                                </Grid>
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </Grid>

        </>
    )
}

const styleTitle = {
    textAlign: 'center',
    mt: 4,
    mb: 8,
    fontWeight: 'bold'
}

const styleImg = {
    width: '100%',
    height: 300,
    maxWidth: 300,
    objectFit: 'cover'
}


const iconButtonHover = {
    backgroundColor: 'white',
    color: 'black'
}
iconButtonHover[':hover'] = {

    backgroundColor: 'black',
    color: 'white'
}