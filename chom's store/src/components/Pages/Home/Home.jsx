import { Box, Divider, Grid, ImageList, ImageListItem, Tabs, Typography } from '@mui/material'
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import '../../../CSS/Home.css'
import React from 'react'
import TopFeature from './TopFeature';
import NewArrivals from './NewArrivals';
import TopTrending from './TopTrending';
import BestSeller from './BestSeller';
import News from './News';
import CustomerFB from './CustomerFB';
import { useMediaQuery, useTheme } from '@mui/material'


export default function Home() {
    const theme = useTheme();
    const hidden = useMediaQuery(theme.breakpoints.up('md'))

    const imgCover = [
        {
            stt: 1,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner4.jpg?1702732161008'
        },
        {
            stt: 2,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner5.jpg?1702732161008',
        }
    ]

    const imgFeature = [
        {
            stt: 1,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner4.jpg?1702732161008'
        },

        {
            stt: 2,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner2.jpg?1702732161008'
        },
        {
            stt: 3,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner3.jpg?1702732161008'
        },
        {
            stt: 4,
            src: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/promo-banner5.jpg?1702732161008',
        }
    ]


    return (
        <Box sx={{ mb: 6, mt: 12 }}>
            <Swiper
                slidesPerView={1}
                className="mySwiper"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}

            >
                {imgCover.map((item, idx) => {
                    return (
                        <SwiperSlide key={idx}>
                            <img src={item.src} style={styleImgCover} />
                        </SwiperSlide>
                    )
                })}
            </Swiper>

            <Grid container justifyContent={'center'} spacing={4} alignItems={'center'} sx={{ ...styleGridPolicy }}>
                <Grid item>
                    <LocalShippingIcon sx={{ ...styleIcon }} />
                    <Typography sx={{ ...styleColor }}>MIỄN PHÍ VẬN CHUYỂN</Typography>
                    <Typography sx={{ ...styleText }}>Trong bán kính 2km với mọi đơn hàng trên 2.500.000 VNĐ</Typography>
                </Grid>
                {hidden ? <Grid item>
                    <Divider orientation="vertical" flexItem sx={{ ...styleDivider }} />
                </Grid> : ''}

                <Grid item>
                    <AutorenewIcon sx={{ ...styleIcon }} />
                    <Typography sx={{ ...styleColor }}>ĐỔI TRẢ SẢN PHẨM NGANG HOẶC HƠN GIÁ</Typography>
                    <Typography sx={{ ...styleText }}>Đổi trả hàng nhanh trong 24 giờ với các sản phẩm lỗi</Typography>
                </Grid>
                {hidden ? <Grid item>
                    <Divider orientation="vertical" flexItem sx={{ ...styleDivider }} />
                </Grid> : ''}
                <Grid item>
                    <HeadphonesIcon sx={{ ...styleIcon }} />
                    <Typography sx={{ ...styleColor }}>HỖ TRỢ MIỄN PHÍ 24/7</Typography>
                    <Typography sx={{ ...styleText }}>Gọi 0586558886 để được tư vấn</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} spacing={6} sx={{ ...styleGridPolicy }}>
                <Grid item sm={8}>
                    <ImageList variant="masonry" gap={20} cols={2} >
                        {imgFeature.map((item) => (
                            <ImageListItem key={item.stt} sx={{ ...styleImgZoom }}>
                                <div className='shineEffet'>
                                    <figure>
                                        <img
                                            src={item.src}
                                            style={{ width: '100%', transition: 'transform 1s ease', }}
                                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        />
                                    </figure>
                                </div>
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
            {/* TOP NỔI BẬT */}
            <TopFeature />
            {/* NEW ARRIVALS */}
            <NewArrivals />
            {/* TRENDINGS */}
            <TopTrending />
            {/* BEST SELLER */}
            <BestSeller />
            {/* TIN TỨC MỚI */}
            <News />
            {/* ON INSTAGRAM */}
            <CustomerFB />
        </Box>
    )
}

const styleGridPolicy = {
    textAlign: "center",
    my: 1
}

const styleIcon = {
    fontSize: 40
}

const styleColor = {
    color: '#333333'
}

const styleText = {
    fontSize: 14,
    color: '#777777'
}

const styleImgCover = {
    width: '100%',
    height: 600,
    objectFit: 'cover'
}

const styleDivider = {
    height: 100,
    mt: 4
}

const styleImgZoom = {
    position: 'relative',
    overflow: 'hidden'
}