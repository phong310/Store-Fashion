import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Button, Divider, FormControl, Grid, IconButton, MenuItem, Rating, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Navigation } from 'swiper';
import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import '../../../CSS/BtnNavigation.css';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import EvaluateDetail from './EvaluateDetail';
import RelatedProducts from './RelatedProducts';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axiosInstance';
import { stringToNumber } from '../../../lib/transform';
import { addToCartSuccess } from '../../../redux/actionCartSlice';
import { formatCurrencyVND } from '../../../lib/common';

export default function ProductsDetail() {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.login?.currentUser)
  const [DataDetail, setDataDetail] = useState()
  const [selectedImage, setSelectedImage] = useState();
  const [breadcumbs, setBreadcumbs] = useState('')
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const getDataDetail = async () => {
    try {
      let endpoint = '';
      switch (type) {
        case 'clothing':
          endpoint = `http://localhost:3001/clothing-collection/${id}`;
          setBreadcumbs('Clothing')
          break;
        case 'shoe':
          endpoint = `http://localhost:3001/shoe-collection/${id}`;
          setBreadcumbs('Shoe')
          break;
        case 'accessories':
          endpoint = `http://localhost:3001/accessories-collection/${id}`;
          setBreadcumbs('Accessories')
          break;
        default:
          break;
      }
      if (endpoint) {
        const res = await axios.get(endpoint);
        setDataDetail(res.data);
        setSelectedImage(res.data.img[0]);
      }
    } catch (e) {
      console.log('Err', e);
    }
  }

  const plusQuantity = () => {
    setQuantity(quantity + 1)
  }
  const excpetQuantity = () => {
    setQuantity(quantity - 1)
    if (quantity === 1) {
      setQuantity(1)
    }
  }

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };


  const handleChange = (event) => {
    setSize(event.target.value);
  };

  const handleAddToCart = async () => {
    const newItem = {
      userId: user?.user._id,
      product: DataDetail?.name,
      img: DataDetail?.img[0],
      quantity: quantity,
      size: size,
      notes: '',
      price: DataDetail?.price,
      subtotal: DataDetail?.price * quantity,
      description: ''
    }

    try {
      const res = await axiosInstance.post('/cart/addItemCart', newItem);
      if (res) {
        toast.success("Thêm vào giỏ hàng thành công !")
        dispatch(addToCartSuccess(res.data))
        navigate('/cart')
      }
    } catch (err) {
      console.log({ Err: err })
      if (err.request.status === 500) {
        toast.warn('Vui lòng đăng nhập trước khi mua !')
      } else {
        toast.error("Thêm thất bại !")
        dispatch(addToCartFailed())
      }
    }
  }

  useEffect(() => {
    getDataDetail()
  }, [])

  useEffect(() => {
    if (DataDetail && DataDetail.size.length > 0) {
      setSize(DataDetail.size[0]);
    }
  }, [DataDetail]);

  return (
    <>
      <BreadCumbs pageName={breadcumbs} itemPage={DataDetail?.name} />
      <Grid container
        spacing={2}
        sx={{
          mt: 6,
          mb: 6,
          padding: { xs: '0 10px', lg: '0 63px' },
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          alignItems: {
            xs: 'center',
            md: 'flex-start'
          },
          justifyContent: 'center'
        }}>
        <Grid item order={{ xs: 1, md: 2 }} xs={12} md={4}>
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "",
                isFluidWidth: true,
                src: selectedImage,
                sizes:
                  "(min-width: 600px) 30.5vw, (min-width: 415px) 50vw, 100vw"
              },
              largeImage: {
                alt: "",
                src: selectedImage,
                width: 900,
                height: 1200
              },
              isHintEnabled: false,
              style: { zIndex: 1 },
            }}
          />
        </Grid>
        <Grid item order={{ xs: 2, md: 1 }} xs={12} md={'auto'} sx={{ textAlign: 'center', mt: { xs: 4, md: 14 } }}>
          <Swiper
            slidesPerView={3}
            spaceBetween={1}
            className="mySwiper"
            modules={[Navigation]}
            navigation={true}
            direction={'vertical'}
            style={{
              width: '100%',
              height: '400px',
            }}
          >
            {DataDetail?.img.map((item, idx) => (
              <SwiperSlide key={idx}>
                <Box sx={{ border: '1px solid #e1e1e1', cursor: 'pointer' }} onClick={() => handleImageClick(item)}>
                  <img src={item} style={{ width: 90 }} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item order={{ xs: 3, md: 3 }} xs={12} md={4}>
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
          <Typography variant='h4' sx={{ my: 6 }}>{formatCurrencyVND(DataDetail?.price)}</Typography>
          <Typography sx={{ color: '#898989', mb: 4, fontSize: 14 }}>Thông tin sản phẩm đang được cập nhật</Typography>
          {DataDetail?.size.length > 0 ? <Grid display={'flex'} alignItems={'center'} sx={{ my: 2 }} >
            <Typography sx={{ minWidth: 100, fontSize: 14 }}>Kích thước:</Typography>
            <FormControl fullWidth>
              <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
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
              <IconButton onClick={excpetQuantity}>
                <ArrowLeftIcon sx={{ fontSize: 20 }} />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton onClick={plusQuantity}>
                <ArrowRightIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ ...styleBtnAdd }} onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</Button>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems={'center'} sx={{ my: 2 }}>
            <Grid item>
              <Typography sx={{ fontSize: 14 }}>Chia sẻ:</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <FacebookIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
              <IconButton>
                <GoogleIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </Grid>
      <EvaluateDetail />
      <RelatedProducts />
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