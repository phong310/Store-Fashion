import { Typography, Grid, Rating, IconButton } from '@mui/material'
import "../../../CSS/ShoesItem.css"
import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { motion } from 'framer-motion';
import { ArrShoes } from '../../ProductItems/ShoeItem';

export default function BestSeller() {
    const bestSellingItems = ArrShoes.filter(item => item.best === true);

    return (
        <>
            <Typography variant='h4' sx={{ ...styleTitle }}>BEST SELLER</Typography>
            <Grid container justifyContent={'center'} spacing={4} sx={{ textAlign: 'center', px: { md: 3, lg: 30 } }}>
                {bestSellingItems.map((item, idx) => {
                    return (
                        <Grid item key={idx} sx={{ position: 'relative' }}>
                            <div className="shoe-container">
                                <img src={item.img} style={styleImg} />
                                <div className="overlay"></div>
                                <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                                    <IconButton sx={{ ...iconButtonHover }}>
                                        <ShoppingCartIcon />
                                    </IconButton>
                                    <IconButton sx={{ ...iconButtonHover }}>
                                        <ZoomInIcon />
                                    </IconButton>
                                </Grid>
                            </div>
                            <Typography>{item.name}</Typography>
                            <Rating name="no-value" value={item.rating} />
                            <Typography>{item.price}</Typography>
                        </Grid>
                    )
                })}
            </Grid>
            <Grid container justifyContent={'center'}>
                <Grid container justifyContent={'space-between'} sx={{ ...gridSale }} >
                    <Grid item >
                        <Typography sx={{ ...styleTextFollow }}>
                            Theo dõi chúng tôi để nhận {''}
                            <span style={{ color: 'red' }}>10%</span> {''}
                            giảm giá
                        </Typography>
                    </Grid>
                    <Grid item>

                        <IconButton>
                            <motion.div
                                animate={{ x: 0 }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <TwitterIcon sx={{ ...styleIcon }} />
                            </motion.div>
                        </IconButton>
                        <IconButton>
                            <motion.div
                                animate={{ x: 0 }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FacebookIcon sx={{ ...styleIcon }} />
                            </motion.div>
                        </IconButton>
                        <IconButton>
                            <motion.div
                                animate={{ x: 0 }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <GoogleIcon sx={{ ...styleIcon }} />
                            </motion.div>
                        </IconButton>
                        <IconButton>
                            <motion.div
                                animate={{ x: 0 }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <InstagramIcon sx={{ ...styleIcon }} />
                            </motion.div>
                        </IconButton>
                        <IconButton>
                            <motion.div
                                animate={{ x: 0 }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.5, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <YouTubeIcon sx={{ ...styleIcon }} />
                            </motion.div>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>


        </>
    )
}

const styleTitle = {
    textAlign: 'center',
    mt: 6,
    mb: 4,
    fontWeight: 'bold'
}

const styleImg = {
    width: '100%',
    height: 300,
    maxWidth: 300,
    objectFit: 'contain'
}


const iconButtonHover = {
    backgroundColor: 'white',
    color: 'black'
}
iconButtonHover[':hover'] = {

    backgroundColor: 'black',
    color: 'white'
}

const styleIcon = {
    color: 'white'
}

const gridSale = {
    mt: 10,
    bgcolor: 'black',
    py: 2,
    px: 4,
    maxWidth: { xs: 'unset', sm: 1246 }
}

const styleTextFollow = {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
}