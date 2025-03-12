import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSchema } from '../../../lib/validation';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import InputField from '../../Field/InputField';
import axiosInstance from '../../../config/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginFailed, loginSuccess } from '../../../redux/authSlice';

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data) => {
        const user = { email: data.email, password: data.password };
        try {
            const response = await axiosInstance.post('/auth/login', user);
            if (response) {
                dispatch(loginSuccess(response.data));
                toast.success('Đăng nhập thành công');
                navigate('/');
            }
        } catch (error) {
            toast.error('Đăng nhập thất bại');
            dispatch(loginFailed());
            console.error(error);
        }
    };

    return (
        <>
            <BreadCumbs pageName='Đăng nhập' />
            <Typography sx={{ my: 4, ml: { md: 38, sm: 'unset' }, fontWeight: 'bold', fontSize: 28 }}>ĐĂNG NHẬP TÀI KHOẢN</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container justifyContent={'center'} sx={{ mb: 20 }} gap={4} alignItems={'flex-start'}>
                    <Grid item sm={12} md={4}>
                        <Typography sx={{ mb: 2 }}>Nếu bạn đã có tài khoản, đăng nhập tại đây.</Typography>
                        <Grid sx={{ mb: 2 }}>
                            <InputField
                                name="email"
                                control={control}
                                label="Email"
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid sx={{ mb: 2 }}>
                            <InputField
                                name="password"
                                control={control}
                                label="Mật khẩu"
                                type="password"
                                error={errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'} gap={4}>
                            <Button type='submit' variant="contained" sx={{ ...styleBtnAdd }}>Đăng nhập</Button>
                            <Button variant="text" sx={{ color: 'black', textDecoration: 'underline' }} onClick={() => navigate('/account/register')}>Đăng ký</Button>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} md={4}>
                        {/* <Typography sx={{ mb: 2 }}>Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.</Typography>
                        <Grid sx={{ mb: 2 }}>
                            <InputField
                                name="emailForget"
                                control={control}
                                label="Email"
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid> */}
                        <Button variant="contained" sx={{ ...styleBtnAdd }}>Lấy lại mật khẩu</Button>
                    </Grid>
                </Grid>
            </form>
        </>

    )
}

const styleBtnAdd = {
    borderRadius: 20,
    p: 1,
    px: 3,
    bgcolor: '#112637',
    color: 'white',
    '&:hover': {
        bgcolor: '#112637',
    },
}

const styleTextField = {
    '& label': {
        color: 'gray',
    },
    '& label.Mui-focused': {
        color: 'gray',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#ddd',
            border: '1px solid #ddd'
        },
        '&:hover fieldset': {
            borderColor: '#ddd',
            border: '1px solid #ddd'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ddd',
            border: '1px solid #ddd'
        },
    }
}