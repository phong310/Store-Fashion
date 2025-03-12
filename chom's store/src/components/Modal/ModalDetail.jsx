import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Backdrop, Box, Button, Divider, Fade, FormControl, Grid, IconButton, Modal, Rating, Select, Typography, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import '../../CSS/BtnNavigation.css';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    bgcolor: 'background.paper',
    boxShadow: 24,
};


export default function ModalDetail({ open, setOpen, id }) {
    const [DataDetail, setDataDetail] = useState()
    const [Size, setSize] = useState('');
    const [selectedImage, setSelectedImage] = useState()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');


    const handleChange = (event) => {
        setSize(event.target.value);
    };

    const handleSelectImg = (item) => {
        setSelectedImage(item)
    }

    const getDataDetail = async () => {
        try {
            let endpoint = '';
            switch (type) {
                case 'clothing':
                    endpoint = `http://localhost:3001/clothing-collection/${id}`;
                    break;
                case 'shoe':
                    endpoint = `http://localhost:3001/shoe-collection/${id}`;
                    break;
                case 'accessories':
                    endpoint = `http://localhost:3001/accessories-collection/${id}`;
                    break;
                default:
                    break;
            }
            if (endpoint) {
                const res = await axios.get(endpoint);
                setDataDetail(res.data);
                setSelectedImage(res.data.img[0])
            }
        } catch (e) {
            console.log('Err', e);
        }
    }

    useEffect(() => {
        if (id) {
            getDataDetail()
        }
    }, [id])

    useEffect(() => {
        if (DataDetail && DataDetail.size.length > 0) {
            setSize(DataDetail.size[0]);
        }
    }, [DataDetail]);


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                m: 1,
                                color: 'text.primary',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Grid container justifyContent={'center'} gap={6} alignItems={'flex-start'} sx={{ my: 4, }}>
                            <Grid item sm={6} sx={{ textAlign: 'center' }}>
                                <img src={selectedImage} style={{ width: 360, height: 400 }} />
                                <Grid sx={{ mt: 2 }}>
                                    <Swiper
                                        slidesPerView={4}
                                        className="mySwiper"
                                    // modules={[Navigation]}
                                    // navigation={true}

                                    >
                                        {DataDetail?.img.map((item, idx) => {
                                            return (
                                                <SwiperSlide key={idx}>
                                                    <Box onClick={() => handleSelectImg(item)} sx={{ ...styleSlideImg }}>
                                                        <img style={{ width: 90, height: 100, }} src={item} />
                                                    </Box>
                                                </SwiperSlide>
                                            )
                                        })}
                                    </Swiper>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontWeight: 'bold', mb: 2, }}>{DataDetail?.name}</Typography>
                                <Grid display={'flex'} alignItems={'center'} gap={1} sx={{ mb: 1 }}>
                                    <Rating name="no-value" value={DataDetail?.rating} />
                                    <Typography sx={{ color: '#80BB35', fontSize: 14 }}>Viết đánh giá của bạn</Typography>
                                </Grid>
                                <Typography sx={{ mb: 2, fontSize: 14 }}>Tình trạng:
                                    <span style={{ color: '#898989' }}> Chỉ còn {DataDetail?.quantity} sản phẩm</span> | Mã SP:
                                    <span style={{ color: '#898989' }}>{DataDetail?.code}</span>
                                </Typography>
                                <Divider />
                                <Typography variant='h4' sx={{ my: 6 }}>{DataDetail?.price}</Typography>
                                <Link to={`/products/${DataDetail?._id}?type=${type}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography sx={{ fontWeight: 'bold', mb: 4, fontSize: 14 }}>... Xem chi tiết</Typography>
                                </Link>
                                {DataDetail?.size.length > 0 ? <Grid display={'flex'} alignItems={'center'} sx={{ my: 2 }} >
                                    <Typography sx={{ minWidth: 100, fontSize: 14 }}>Kích thước:</Typography>
                                    <FormControl fullWidth>
                                        <Select
                                            size='small'
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Size}
                                            onChange={handleChange}
                                            sx={{ borderRadius: 20 }}
                                        >
                                            {DataDetail?.size.map((item, idx) => {
                                                return (
                                                    <MenuItem key={idx} value={item}>{item}</MenuItem>
                                                )
                                            })}
                                        </Select>
                                    </FormControl>
                                </Grid> : ''}

                                <Grid container alignItems={'center'} gap={2} sx={{ mb: 4 }}>
                                    <Grid item display="flex" gap={1} alignItems="center" sx={{ border: '1px solid #ddd', borderRadius: 20, }}>
                                        <IconButton>
                                            <ArrowLeftIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                        <Typography>1</Typography>
                                        <IconButton>
                                            <ArrowRightIcon sx={{ fontSize: 20 }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{ ...styleBtnAdd }}>THÊM VÀO GIỎ HÀNG</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>

                </Fade>
            </Modal>
        </>
    )
}

const styleBtnAdd = {
    borderRadius: 20,
    p: 1,
    px: 8,
    bgcolor: '#112637',
    color: 'white',
    '&:hover': {
        bgcolor: '#112637',
    },
}

const styleSlideImg = {
    '&:hover': {
        cursor: 'pointer'
    },
}