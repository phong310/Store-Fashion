import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Divider, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import ShoesItem from '../../ProductItems/ShoeItem';

export default function TopFeature() {
    const [value, setValue] = useState('1');
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const tabList = [
        { label: "BASKETBALL SHOES", value: "1" },
        { label: "KYRIE IRVING", value: "2" },
        { label: "JORDAN SHOES", value: "3" },
        { label: "PAUL GEORGE", value: "4" },
        { label: "DAME LILLARD", value: "5" },
    ];

    const swiperRef = useRef(null);

    const handleSlideChange = (swiper) => {
        const newIndex = swiper.activeIndex;
        setValue(tabList[newIndex].value);
    };

    const currentIndex = tabList.findIndex(tab => tab.value === value);

    return (
        <>
            <Typography variant='h4' sx={{ textAlign: 'center', mt: 6, fontWeight: 'bold' }}>TOP NỔI BẬT</Typography>

            <Grid container justifyContent={'center'} alignItems="center" sx={{ mt: 2 }}>
                <Grid item>
                    {isMdDown ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
                            <IconButton onClick={() => swiperRef.current?.slidePrev()}>
                                <ArrowBackIos fontSize="small" />
                            </IconButton>

                            <Swiper
                                slidesPerView={1}
                                onSlideChange={handleSlideChange}
                                initialSlide={currentIndex}
                                onSwiper={(swiper) => (swiperRef.current = swiper)}
                                style={{ width: '100%' }}
                            >
                                {tabList.map((tab) => (
                                    <SwiperSlide key={tab.value}>
                                        <Typography
                                            onClick={() => setValue(tab.value)}
                                            sx={{
                                                textAlign: 'center',
                                                py: 1,
                                                fontWeight: value === tab.value ? 'bold' : 'normal',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {tab.label}
                                        </Typography>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <IconButton onClick={() => swiperRef.current?.slideNext()}>
                                <ArrowForwardIos fontSize="small" />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center">
                            {tabList.map((tab, index) => (
                                <Box key={tab.value} display="flex" alignItems="center">
                                    <Typography
                                        onClick={() => setValue(tab.value)}
                                        sx={{
                                            mx: 2,
                                            fontWeight: value === tab.value ? 'bold' : 'normal',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {tab.label}
                                    </Typography>
                                    {index !== tabList.length - 1 && (
                                        <Divider orientation="vertical" flexItem sx={{ ...dividerTab }} />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Grid>
            </Grid>

            <TabContext value={value}>
                <TabPanel value="1"><Grid sx={{ px: { md: 0, lg: 30 }, mt: 2 }}><ShoesItem /></Grid></TabPanel>
                <TabPanel value="2" sx={{ textAlign: 'center' }}>Tab 2 content</TabPanel>
                <TabPanel value="3" sx={{ textAlign: 'center' }}>Tab 3 content</TabPanel>
                <TabPanel value="4" sx={{ textAlign: 'center' }}>Tab 4 content</TabPanel>
                <TabPanel value="5" sx={{ textAlign: 'center' }}>Tab 5 content</TabPanel>
            </TabContext>
        </>
    )
}

const dividerTab = {
    height: 20,
    mx: 2
}