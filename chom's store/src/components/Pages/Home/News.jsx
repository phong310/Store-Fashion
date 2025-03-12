import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import InfoIcon from '@mui/icons-material/Info';
import React from 'react'

export default function News() {

    const newsArr = [
        {
            id: 1,
            img: 'https://bizweb.dktcdn.net/thumb/grande/100/427/393/articles/1-fb450a9d-27ac-489b-9f70-929419a1cf6a.png?v=1658981838063',
            author: 'Admin space-jumpzz',
            title: 'KYRIE LOW 5 ĐIỆU ĐÀ TRONG SẮC HỒNG PHIÊN BẢN "ORCHID"',
            date: '28/07/2022',
        },
        {
            id: 2,
            img: 'https://bizweb.dktcdn.net/thumb/grande/100/427/393/articles/1-e6b03432-aeff-4f04-a1d2-9cf01351b7f0.png?v=1658978431957',
            author: 'Admin space-jumpzz',
            title: 'KYRIE INFINITY CỰC CHÁY TRONG BỘ SƯU TẬP "1 WORLD 1 PEOPLE" MỚI NHẤT"',
            date: '28/07/2022',
        },
        {
            id: 3,
            img: 'https://bizweb.dktcdn.net/thumb/grande/100/427/393/articles/nb-kawhi-2-1-optimized.png?v=1655452554620',
            author: 'Admin space-jumpzz',
            title: 'NHỮNG HÌNH ẢNH CHÍNH THỨC CỦA LEBRON 19 "LEBRONIVAL""',
            date: '28/07/2022',
        },
        {
            id: 4,
            img: 'https://bizweb.dktcdn.net/thumb/grande/100/427/393/articles/nb-kawhi-2-optimized.png?v=1655450635987',
            author: 'Admin space-jumpzz',
            title: 'NEW BALANCE KAWHI II "CONVERSATIONS AMONGST US" - SỰ KẾT HỢP THÚ VỊ GIỮA JOE FRESHGOODS VÀ KAWHI LEONARD',
            date: '17/06/2022',
        },
    ]

    return (
        <>
            <Typography variant='h4' sx={{ ...styleTitle }}>TIN TỨC MỚI</Typography>
            <Grid container justifyContent={'center'} sx={{ px: 2 }}>
                <Grid item xs={12} sm={8}>
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        className="mySwiper"
                        modules={[Navigation]}
                        navigation={true}
                    >
                        <ImageList variant="masonry" cols={2} gap={8} sx={{ ...imgList }}>
                            {newsArr.map((item, idx) => (
                                <SwiperSlide>
                                    <ImageListItem key={idx} sx={{ ...imgListItem }}>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            loading="lazy"
                                            style={{ width: '100%', transition: 'transform 1s ease', }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                        <ImageListItemBar position="bottom" subtitle={item.author} title={item.title} actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${item.title}`}
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                        } />
                                    </ImageListItem>
                                </SwiperSlide>

                            ))}
                        </ImageList>
                    </Swiper>

                </Grid>
            </Grid>
        </>
    )
}

const styleTitle = {
    textAlign: 'center',
    mt: 6,
    mb: 4,
    fontWeight: 'bold',
}

const imgList = {
    position: 'relative',
    zIndex: 0,
}

const imgListItem = {
    position: 'relative',
    overflow: 'hidden'
}