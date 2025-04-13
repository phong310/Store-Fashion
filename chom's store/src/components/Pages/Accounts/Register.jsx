import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axiosInstance';
import { RegisterSchema } from '../../../lib/validation';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import InputField from '../../Field/InputField';

export default function Register() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    const newUser = {
      username: data.fullName,
      email: data.email,
      password: data.password,
      confirm: data.confirmPassword,
    }
    try {
      const res = await axiosInstance.post('/auth/register', newUser);
      if (res) {
        toast.success('Đăng ký thành công')
        navigate('/account/login')
      } else {
        toast.error('Đăng ký thất bại !')
      }
    } catch (e) {
      console.log({ Err: e });
    }
  };

  return (
    <>
      <BreadCumbs pageName="Đăng ký" />
      <Grid sx={{ ml: { md: 38, sm: 'unset' } }}>
        <Typography sx={{ my: 4, fontWeight: 'bold', fontSize: 28 }}>ĐĂNG KÝ TÀI KHOẢN</Typography>
        <Typography sx={{ mb: 2 }}>Nếu chưa có tài khoản vui lòng đăng ký tại đây</Typography>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container justifyContent="center" alignItems="center" gap={4}>
          <Grid item xs={12} sm={12} md={4}>
            <InputField
              name="fullName"
              control={control}
              label="Họ và Tên"
              error={errors.fullName}
              helperText={errors.fullName?.message}
            />
            <InputField
              name="password"
              control={control}
              label="Mật khẩu"
              type="password"
              error={errors.password}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <InputField
              name="email"
              control={control}
              label="Email"
              error={errors.email}
              helperText={errors.email?.message}
            />
            <InputField
              name="confirmPassword"
              control={control}
              label="Xác nhận mật khẩu"
              type="password"
              error={errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>
        </Grid>
        <Grid
          display="flex"
          alignItems="center"
          gap={4}
          sx={{ mb: 20, ml: { md: 38, sm: 'unset' } }}
        >
          <Button type="submit" variant="contained" sx={styleBtnAdd}>
            Đăng ký
          </Button>
          <Button
            variant="text"
            sx={{ color: 'black', textDecoration: 'underline' }}
            onClick={() => navigate('/account/login')}
          >
            Đăng nhập
          </Button>
        </Grid>
      </form>
    </>
  );
}

export const styleBtnAdd = {
  borderRadius: 20,
  p: 1,
  px: 3,
  bgcolor: '#112637',
  color: 'white',
  '&:hover': {
    bgcolor: '#112637',
  },
};
