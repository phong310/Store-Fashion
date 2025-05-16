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
    };
    try {
      const res = await axiosInstance.post('/auth/register', newUser);
      if (res) {
        toast.success('Đăng ký thành công');
        navigate('/account/login');
      } else {
        toast.error('Đăng ký thất bại !');
      }
    } catch (e) {
      console.log({ Err: e });
    }
  };

  return (
    <>
      <BreadCumbs pageName="Đăng ký" />
      <Grid sx={{ px: { xs: 2, md: 38 }, textAlign: { xs: 'center', md: 'left' } }}>
        <Typography
          sx={{
            my: 4,
            fontWeight: 'bold',
            fontSize: { xs: 22, sm: 26, md: 28 },
          }}
        >
          ĐĂNG KÝ TÀI KHOẢN
        </Typography>
        <Typography sx={{ mb: 2 }}>
          Nếu chưa có tài khoản vui lòng đăng ký tại đây
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          spacing={4}
          sx={{ px: { xs: 2, md: 0 } }}
        >
          <Grid item xs={12} md={4}>
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

          <Grid item xs={12} md={4}>
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
          container
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          alignItems="center"
          sx={{ mt: 4, mb: 20, px: { xs: 2, md: 38 } }}
          spacing={2}
        >
          <Grid item>
            <Button type="submit" variant="contained" sx={styleBtnAdd}>
              Đăng ký
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              sx={{ color: 'black', textDecoration: 'underline' }}
              onClick={() => navigate('/account/login')}
            >
              Đăng nhập
            </Button>
          </Grid>
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
