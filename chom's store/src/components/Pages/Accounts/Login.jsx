import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginSchema } from '../../../lib/validation';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import InputField from '../../Field/InputField';
import axiosInstance from '../../../config/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginFailed, loginSuccess } from '../../../redux/authSlice';
import LoadingOverLay from '../../Loading/LoadingOverLay';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        const startTime = Date.now();
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
        } finally {
            const elapsed = Date.now() - startTime;
            const remaining = 500 - elapsed;
            setTimeout(() => {
                setIsLoading(false);
            }, remaining > 0 ? remaining : 0);
        }
    };

    return (
        <>
            <BreadCumbs pageName="Đăng nhập" />
            {isLoading && <LoadingOverLay />}
            <Typography
                sx={{
                    my: 4,
                    ml: { xs: 2, md: 38 },
                    fontWeight: 'bold',
                    fontSize: { xs: 22, sm: 26, md: 28 },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                ĐĂNG NHẬP TÀI KHOẢN
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ mb: 10, px: { xs: 2, md: 0 } }}
                    spacing={4}
                >
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ mb: 2 }}>
                            Nếu bạn đã có tài khoản, đăng nhập tại đây.
                        </Typography>
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
                        <Grid display="flex" flexWrap="wrap" gap={2}>
                            <Button type="submit" variant="contained" sx={{ ...styleBtnAdd }}>
                                Đăng nhập
                            </Button>
                            <Button
                                variant="text"
                                sx={{ color: 'black', textDecoration: 'underline' }}
                                onClick={() => navigate('/account/register')}
                            >
                                Đăng ký
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Typography sx={{ mb: 2 }}>
                            Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.
                        </Typography>
                        <Grid sx={{ mb: 2 }}>
                            <InputField
                                name="emailForget"
                                control={control}
                                label="Email"
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Button variant="contained" sx={{ ...styleBtnAdd }}>
                            Lấy lại mật khẩu
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
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
};
