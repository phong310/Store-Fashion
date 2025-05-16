import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../config/axiosInstance';
import { logOutSuccess } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import LoadingOverLay from '../Loading/LoadingOverLay';

export default function HeaderAuth() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const [anchorElAuth, setAnchorElAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const openAuth = Boolean(anchorElAuth);
    const handleClick = (event) => {
        setAnchorElAuth(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElAuth(null);
    };
    const handleLogout = async () => {
        setIsLoading(true)
        const startTime = Date.now();
        try {
            const res = await axiosInstance.post('/auth/logout')
            dispatch(logOutSuccess(res.data))
            toast.success('Đăng xuất thàng công')
        } catch (e) {
            console.log({ Err: e });
            toast.error('Thất bại')
        } finally {
            const elapsed = Date.now() - startTime;
            const remaining = 500 - elapsed;
            setTimeout(() => {
                setIsLoading(false);
            }, remaining > 0 ? remaining : 0);
        }

    }
    return (
        <>
            {isLoading && <LoadingOverLay />}
            <Grid container alignItems={'center'} sx={{ px: 2, justifyContent: { xs: 'center', md:'space-around'} }}>
                <Grid item sx={{display:{xs:'none', md:'flex'}}}>
                    <Grid display={'flex'} alignContent={'center'} style={{ gap: 4 }}>
                        <LocalPhoneIcon sx={{ fontSize: 16 }} />
                        <Typography sx={{ ...styleMenuButton }}>HỖ TRỢ MIỄN PHÍ: 0586558886</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={2} alignItems={'center'}>
                        {user ?
                            <Grid item display={'flex'} alignItems={'center'}>
                                <Grid>
                                    <PersonIcon sx={{ ...fontSizeComon }} />
                                </Grid>
                                <Grid display={'flex'} alignItems={'center'}>
                                    <Button
                                        id="basic-button"
                                        aria-controls={openAuth ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openAuth ? 'true' : undefined}
                                        onMouseOver={handleClick}
                                        sx={{ ...styleMenuButton }}
                                        endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        {user.user.username}
                                    </Button>
                                </Grid>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElAuth}
                                    open={openAuth}
                                    MenuListProps={{ onMouseLeave: handleClose }}
                                    onClose={handleClose}

                                >
                                    <MenuItem onClick={() => handleLogout()} sx={{ ...fontSizeComon }}> <LogoutIcon sx={{ ...styleIcon }} />Đăng xuất</MenuItem>
                                </Menu>
                            </Grid> :
                            <Grid item display={'flex'} alignItems={'center'}>
                                <Grid>
                                    <PersonIcon sx={{ ...fontSizeComon }} />
                                </Grid>
                                <Grid display={'flex'} alignItems={'center'}>
                                    <Button
                                        id="basic-button"
                                        aria-controls={openAuth ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openAuth ? 'true' : undefined}
                                        onMouseOver={handleClick}
                                        sx={{ ...styleMenuButton }}
                                        endIcon={<KeyboardArrowDownIcon />}
                                    >
                                        TÀI KHOẢN
                                    </Button>
                                </Grid>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorElAuth}
                                    open={openAuth}
                                    MenuListProps={{ onMouseLeave: handleClose }}
                                    onClose={handleClose}

                                >
                                    <MenuItem onClick={() => navigate('/account/login')} sx={{ ...fontSizeComon }}> <LockIcon sx={{ ...styleIcon }} /> Đăng nhập</MenuItem>
                                    <MenuItem onClick={() => navigate('/account/register')} sx={{ ...fontSizeComon }}> <PersonIcon sx={{ ...styleIcon }} /> Đăng ký</MenuItem>
                                </Menu>
                            </Grid>}

                        <Grid item>
                            <Button sx={{ ...styleMenuButton }}>GIỚI THIỆU</Button>
                        </Grid>
                        <Grid item>
                            <Button sx={{ ...styleMenuButton }}>LIÊN HỆ</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider variant="fullWidth" />
        </>
    )
}


const styleMenuButton = {
    fontSize: 12,
    color: 'black'
}

const fontSizeComon = {
    fontSize: 14
}

const styleIcon = {
    fontSize: 24,
    pr: 1
}
