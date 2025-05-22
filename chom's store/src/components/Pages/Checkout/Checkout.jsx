import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import theWindod from '../.././../assets/thewind2/thewindod.png';
import { formatCurrency } from '../../../lib/transform'
import { calculateTotal } from '../../../lib/common'
import Badge from '@mui/material/Badge';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutSchema } from '../../../lib/validation';
import axiosInstance from '../../../config/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { resetCart } from '../../../redux/cartSlice';
import persistStore from 'redux-persist/es/persistStore';
import { store } from '../../../redux/store';


const Checkout = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [provinceList, setProvinceList] = useState()
  const [districtsList, setDistrictList] = useState()
  const [wardsList, setWardsList] = useState()
  const [query, setQuery] = useState("");
  const [districtQuery, setDistrictQuery] = useState("");
  const [wardQuery, setWardQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectDistrict, setSelectDistrict] = useState(null)
  const dataCart = useSelector((state) => state.cart.cartList?.allCart)
  const user = useSelector((state) => state.auth.login?.currentUser)
  const userId = user?.user._id
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CheckoutSchema),
  });
  const getProvinceList = async (searchQuery = "") => {
    try {
      const data = await axios.get(`https://open.oapi.vn/location/provinces?query=${searchQuery}`)
      setProvinceList(data.data.data)
    } catch (err) {
      console.log(err);
    }
  }

  const getDistrictList = async (searchQuery = "") => {
    try {
      const data = await axios.get(`https://open.oapi.vn/location/districts/${selectedProvince?.id}?query=${searchQuery}`)
      setDistrictList(data.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getWardList = async (searchQuery = "") => {
    try {
      const data = await axios.get(`https://open.oapi.vn/location/wards/${selectDistrict?.id}?query=${searchQuery}`)
      setWardsList(data.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  const clearAllCart = async () => {
    try {
      await axiosInstance.post('cart/clear-cart', { userId });
    } catch (error) {
      console.log(error);
    }
  }


  const onSubmit = async (data) => {
    const newOrder = {
      userId: userId,
      order_products: dataCart,
      customer_name: data.fullName,
      customer_phone: data.phoneNumber,
      customer_address: data.address,
      customer_province: data.province?.name,
      customer_district: data.district?.name,
      customer_wards: data.wards?.name,
      order_description: data.description,
      order_pay: data.paymentMethod,
      order_status: ['order']
    };

    try {
      const res = await axiosInstance.post('/order/addNewOrder', newOrder)
      if (res) {
        toast.success('Đặt hàng thành công !')
        // reset lại cart
        await clearAllCart()
        dispatch(resetCart())
        persistStore(store).purge();
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Thất bại")
    }
  };


  // Gọi API khi vào trang & khi `query` thay đổi (kể cả khi rỗng)
  useEffect(() => {
    const fetchData = setTimeout(() => getProvinceList(query), 300);
    return () => clearTimeout(fetchData);
  }, [query]);

  useEffect(() => {
    const fetchData = setTimeout(() => getDistrictList(query), 300);
    return () => clearTimeout(fetchData);
  }, [query]);

  useEffect(() => {
    if (selectedProvince) {
      const fetchData = setTimeout(() => getDistrictList(districtQuery), 300);
      return () => clearTimeout(fetchData);
    }
  }, [districtQuery, selectedProvince]);

  useEffect(() => {
    if (selectDistrict) {
      const fetchData = setTimeout(() => getWardList(wardQuery), 300);
      return () => clearTimeout(fetchData);
    }
  }, [wardQuery, selectDistrict]);




  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Bên trái */}
        <Grid item xs={12} md={7} sx={{ bgcolor: '#e2f0fb', pt: 4, px: { xs: 2, md: 10 }, pl: { md: 'unset', lg: '221px' } }}>
          <Grid display='flex' alignItems='center' sx={{ mb: 4 }} gap={1}>
            <img src={theWindod} width={90} height={90} />
            <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>The Wind Store</Typography>
          </Grid>
          <Grid container sx={{ justifyContent: 'flex-start' }} gap={6}>
            <Grid item sx={{ width: '400px' }}>
              <Grid display='flex' justifyContent='space-between' alignItems='center'>
                <Typography sx={{ ...styleTitle }}>Thông tin nhận hàng</Typography>
              </Grid>
              <Grid display={'flex'} direction={'column'} gap={2} sx={{ mt: 2 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      size="small"
                      sx={{
                        bgcolor: errors.email ? '#e2f0fb' : 'white'
                      }}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Họ và Tên"
                      variant="outlined"
                      size="small"
                      sx={{
                        bgcolor: errors.fullName ? '#e2f0fb' : 'white'
                      }}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Box>
                      <PhoneInput
                        country={'vn'}
                        value={value}
                        onChange={(phone) => onChange(phone)}
                        inputStyle={{
                          width: '100%',
                          height: '40px',
                          backgroundColor: 'white',
                          borderColor: errors.phoneNumber ? 'red' : '#ccc',
                        }}
                      />
                      {errors.phoneNumber && (
                        <Typography sx={{ color: 'red', fontSize: '12px', mt: 0.5 }}>
                          {errors.phoneNumber.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Địa chỉ"
                      variant="outlined"
                      size='small'
                      sx={{
                        bgcolor: errors.address ? '#e2f0fb' : 'white'
                      }}
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
                <Controller
                  name="province"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      size="small"
                      options={provinceList || []}
                      getOptionLabel={(option) => option.name}
                      onInputChange={(e, value) => getProvinceList(value || "")}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        setSelectedProvince(newValue);
                        setSelectDistrict(null);
                        setWardsList([]);
                      }}
                      value={value || null}
                      sx={{
                        bgcolor: errors.province ? "#e2f0fb" : "white",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tỉnh thành"
                          error={!!errors.province}
                          helperText={errors.province?.message}
                        />
                      )}
                    />
                  )}
                />

                <Controller
                  name="district"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      size="small"
                      disabled={!selectedProvince}
                      options={districtsList || []}
                      getOptionLabel={(option) => option.name}
                      onInputChange={(e, value) => getDistrictList(value || "")}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        setSelectDistrict(newValue);
                        setWardsList([]);
                      }}
                      value={value || null}
                      sx={{
                        bgcolor: errors.district ? "#e2f0fb" : "white",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Quận huyện"
                          error={!!errors.district}
                          helperText={errors.district?.message}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name="wards"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <Autocomplete
                      size="small"
                      disabled={!selectDistrict}
                      options={wardsList || []}
                      getOptionLabel={(option) => option.name}
                      onInputChange={(e, value) => getWardList(value || "")}
                      onChange={(event, newValue) => onChange(newValue)}
                      value={value || null}
                      sx={{
                        bgcolor: errors.wards ? "#e2f0fb" : "white",
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Phường xã"
                          error={!!errors.wards}
                          helperText={errors.wards?.message}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="outlined-basic"
                      label="Ghi chú (tùy chọn)"
                      variant="outlined"
                      size='small'
                      multiline
                      rows={3} sx={{ bgcolor: 'white' }}
                    />
                  )}
                />

              </Grid>
            </Grid>
            <Grid item>
              <Grid sx={{ mb: 6 }}>
                <Typography sx={{ mb: 1, ...styleTitle }}>Vận chuyển</Typography>
                <Box sx={{ px: 4, py: 2, bgcolor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb', }}>
                  Vui lòng nhập thông tin giao hàng
                </Box>
              </Grid>
              <Controller
                name="paymentMethod"
                defaultValue=''
                control={control}
                render={({ field }) => (
                  <Grid sx={{ mb: 2 }}>
                    <Typography sx={{ mb: 1, ...styleTitle }}>Thanh toán</Typography>
                    {!selectedValue && errors.paymentMethod && (
                      <Box sx={{ px: 4, py: 2, my: 2, bgcolor: '#FFDDDD', color: 'red', borderColor: '#FFDDDD', }}>
                        {errors.paymentMethod.message}
                      </Box>
                    )}
                    <Grid sx={{ display: 'flex', alignItems: 'center', border: '1px solid #cecdcd', borderBottom: 'none', px: 2, bgcolor: 'white' }} gap={1}>
                      <Radio
                        {...field}
                        checked={field.value === 'cod'}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setSelectedValue(e.target.value);
                        }}
                        value="cod"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 4, }}>
                        <Typography sx={{ fontSize: 14 }}>Thanh toán khi giao hàng (COD)</Typography>
                      </Box>
                      <LocalAtmIcon sx={{ color: '#357ebd' }} />
                    </Grid>
                    {selectedValue === 'cod' && (
                      <Box sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                        <Typography sx={{ fontSize: 13, width: '300px', mt: 1, ml: 2 }}>Bạn chỉ phải thanh toán khi nhận được hàng (Khách hàng mua giày vui lòng cọc trước từ 50% thông qua thanh toán chuyển khoản)</Typography>
                      </Box>
                    )}
                    <Grid sx={{ display: 'flex', alignItems: 'center', border: '1px solid #cecdcd', px: 2, bgcolor: 'white', }} gap={1}>
                      <Radio
                        {...field}
                        checked={field.value === 'bank'}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          setSelectedValue(e.target.value);
                        }}
                        value="bank"
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 4 }}>
                        <Typography sx={{ fontSize: 14 }}>Thanh toán chuyển khoản</Typography>
                      </Box>
                      <LocalAtmIcon sx={{ color: '#357ebd' }} />
                    </Grid>
                    {selectedValue === 'bank' && (
                      <Box sx={{ p: 2, bgcolor: '#f8f9fa', mt: '-1px' }}>
                        <Typography sx={{ fontSize: 13, width: '300px', mt: 1, ml: 2 }}>Quý Khách vui lòng thanh toán tiền đơn hàng qua tài khoản
                          0301000402455 - VIETCOMBANK - LONG CHINH NGHIA
                          Sau đó, quý khách chụp bill giao dịch thành công và gửi qua liên qua ZALO 0586558886 để được xác nhận đơn hàng. Phí ship quý khách sẽ thanh toán với shipper sau khi nhận hàng
                          Xin cảm ơn !</Typography>
                      </Box>
                    )}

                  </Grid>
                )}
              />
            </Grid>
          </Grid>
        </Grid>


        {/* Bên phải */}
        <Grid item xs={12} md={5} sx={{ bgcolor: 'white', p: { xs: 2, md: 4 } }}>
          <Typography sx={{ fontWeight: 'bold' }}>Đơn hàng ({dataCart?.length} sản phẩm)</Typography>
          <Divider sx={{ my: 2 }} />
          {dataCart?.map((item, idx) => (
            <Grid sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }} gap={2} key={idx}>
              <Badge badgeContent={item.quantity} color="primary">
                <img src={item.img} width={60} height={60} />
              </Badge>
              <Typography>{item.product}</Typography>
              <Typography sx={{ ...styleColorText }}>{formatCurrency(item.subtotal)}</Typography>
            </Grid>
          ))}
          <Divider sx={{ my: 2 }} />
          <Grid display={'flex'} alignItems={'center'} gap={1}>
            <TextField id="outlined-basic" label="Nhập mã giảm giá" variant="outlined" size='small' sx={{ width: '330px' }} disabled />
            <Button variant="contained" disabled>Áp dụng</Button>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 2 }}>
            <Typography sx={{ ...styleColorText }}>Tạm tính</Typography>
            <Typography sx={{ ...styleColorText }}>{formatCurrency(calculateTotal(dataCart))}</Typography>
          </Grid>
          <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography sx={{ ...styleColorText }}>Phí vận chuyển</Typography>
            <Typography>-</Typography>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography sx={{ ...styleColorText, fontSize: 24 }}>Tổng cộng</Typography>
            <Typography sx={{ fontSize: 24, color: '#2a9dcc' }}>{formatCurrency(calculateTotal(dataCart))}</Typography>
          </Grid>
          <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'} sx={{ mt: 4 }}>
            <Grid display={'flex'} alignItems={'center'}>
              <ArrowBackIosIcon sx={{ fontSize: '12px', color: '#357ebd' }} />
              <Link href="/cart" underline="none">Quay về giỏ hàng</Link>
            </Grid>
            <Button variant="contained" sx={{ p: 2 }} type="submit">Đặt hàng</Button>
          </Grid>
        </Grid>

      </Grid>
    </form>
  )
}

export default Checkout

const styleTitle = {
  fontWeight: 'bold',
  fontSize: '20px'
};

const styleColorText = {
  color: '#717171'
};
