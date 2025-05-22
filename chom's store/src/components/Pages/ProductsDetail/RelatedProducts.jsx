import { Grid, IconButton, Rating, Typography } from '@mui/material';
import React from 'react';
import { ArrShoes } from '../../ProductItems/ShoeItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../../../CSS/ShoesItem.css'
import ZoomInIcon from '@mui/icons-material/ZoomIn'

export default function RelatedProducts() {
    const bestSellingItems = ArrShoes.filter(item => item.best === true);

    return (
        <>
            <Typography sx={{ ...styleTypo }}>SẢN PHẨM LIÊN QUAN</Typography>
            <Grid c container
                justifyContent="center"
                spacing={4}
                sx={{
                    px: { xs: 2, sm: 4, md: 10, lg:44 },
                    mb: 20,
                    textAlign: 'center',
                }}>
                {bestSellingItems.map((item, idx) => {
                    return (
                        <Grid item
                            key={idx}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{ position: 'relative'}}>
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
        </>
    )
}

const styleTypo = {
    mb: 4,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26
}

const styleGridContainer = {
    textAlign: 'center',
    px: 30,
    mb: 20
}

const styleImg = {
    width: '100%',
    height: 300,
    objectFit: 'cover',
    borderRadius: 8
}
  


const iconButtonHover = {
    backgroundColor: 'white',
    color: 'black'
}
iconButtonHover[':hover'] = {

    backgroundColor: 'black',
    color: 'white'
}