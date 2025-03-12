import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Button, Divider, Grid, Menu, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoTheWind from '../../assets/thewind2/2.png';
import HeaderAuth from './HeaderAuth';
import HeaderCart from './HeaderCart';
import MenuPrd from './MenuPrd';

export default function Headers() {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNews, setAnchorNews] = useState(null)
    const [showHeaderAuth, setShowHeaderAuth] = useState(true);
    const open = Boolean(anchorEl);
    const openNew = Boolean(anchorNews)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHoverNews = (e) => {
        setAnchorNews(e.currentTarget)
    }

    const handleCloseNews = () => {
        setAnchorNews(null)
    }

    const handleClothing = () => {
        navigate('/products?type=clothing')
        handleClose()
    }

    const handleShoes = () => {
        navigate('/products?type=shoe')
        handleClose()
    }

    const handleAccess = () => {
        navigate('/products?type=accessories')
        handleClose()
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setShowHeaderAuth(false);
            } else {
                setShowHeaderAuth(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box>
            <motion.div initial={{ opacity: 1 }} animate={{ opacity: showHeaderAuth ? 1 : 0 }} transition={{ duration: 0.5 }}>
                <HeaderAuth />
            </motion.div>
            <Box sx={{
                ...BoxContainer,
                top: showHeaderAuth ? '34px' : '0',
            }}>
                <Grid container alignItems={'center'} justifyContent={'space-between'} sx={{ px: 3 }}>
                    <Grid item>
                        <Grid container alignItems={'center'} spacing={1}>
                            <Grid item>
                                <img src={LogoTheWind} style={{ width: 90, height: 90 }} />
                            </Grid>
                            <Grid item>
                                <Button sx={{ ...styleMenuButtonMain }} onClick={() => navigate('/')}>TRANG CHỦ</Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onMouseOver={handleClick}
                                    sx={{ ...styleMenuButtonMain }}
                                    endIcon={<ChevronRightIcon />}
                                >
                                    SẢN PHẨM
                                </Button>
                            </Grid>
                            <MenuPrd
                                open={open}
                                anchorEl={anchorEl}
                                handleClose={handleClose}
                                handleClothing={handleClothing}
                                handleAccess={handleAccess}
                                handleShoes={handleShoes}
                            />
                            <Grid item>
                                <Button
                                    id="basic-button"
                                    aria-controls={openNew ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openNew ? 'true' : undefined}
                                    onMouseOver={handleHoverNews}
                                    sx={{ ...styleMenuButtonMain }}
                                    endIcon={<ChevronRightIcon />}
                                >
                                    TIN TỨC
                                </Button>
                            </Grid>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorNews}
                                open={openNew}
                                MenuListProps={{ onMouseLeave: handleCloseNews }}

                            >
                                <MenuItem onClick={handleCloseNews} sx={{ ...fontSizeComon }}> WHAT'S NEW</MenuItem>
                                <MenuItem onClick={handleCloseNews} sx={{ ...fontSizeComon }}> REVIEW</MenuItem>
                                <MenuItem onClick={handleCloseNews} sx={{ ...fontSizeComon }}> UPCOMING</MenuItem>
                            </Menu>
                            <Grid item>
                                <Button sx={{ ...styleMenuButtonMain, color: 'red' }}>SALE OUT</Button>
                            </Grid>
                            <Grid item>
                                <Button sx={{ ...styleMenuButtonMain }}>LIÊN HỆ</Button>
                            </Grid>
                            <Grid item>
                                <Button sx={{ ...styleMenuButtonMain }}>CHÔM MADE</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <HeaderCart />
                    </Grid>
                </Grid>
                <Divider variant="fullWidth" />
            </Box>


        </Box>
    )
}


const BoxContainer = {
    position: 'fixed',
    width: '100%',
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.95)'
}

const styleMenuButtonMain = {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black'
}

const fontSizeComon = {
    fontSize: 14
}
