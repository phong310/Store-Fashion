import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Rating, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import axios from 'axios';
import "../../CSS/ShoesItem.css"
import { Link } from 'react-router-dom';
import ModalDetail from '../Modal/ModalDetail';
import ModalCart from '../Modal/ModalCart';


export default function ClothingItem() {
    const [ClothingArr, setClothingArr] = useState([])
    const [itemId, setItemId] = useState()
    const [openDetail, setOpenDetail] = useState(false)
    const [openCart, setOpenCart] = useState(false)

    const getClothingArr = async () => {
        try {
            const res = await axios.get('http://localhost:3001/clothing-collection/getAll');
            setClothingArr(res.data)
        } catch (e) {
            console.log('Err', e);
        }
    }

    const handleDetail = (id) => {
        setOpenDetail(true)
        setItemId(id)
    }

    useEffect(() => {
        getClothingArr()
    }, [])

    return (
        <Grid container justifyContent={'center'} spacing={4} sx={{ textAlign: 'center' }}>
            {ClothingArr.map((item, idx) => {
                return (
                    <Grid item key={idx} sx={{ position: 'relative' }}>
                        <div className="shoe-container">
                            <img src={item.img[0]} style={styleImg} />
                            <div className="overlay"></div>
                            <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                                <IconButton sx={{ ...iconButtonHover }} onClick={()=>setOpenCart(true)}>
                                    <ShoppingCartIcon />
                                </IconButton>
                                <IconButton sx={{ ...iconButtonHover }} onClick={() => handleDetail(item._id)}>
                                    <ZoomInIcon />
                                </IconButton>
                            </Grid>
                        </div>
                        <Link to={`/products/${item._id}?type=clothing`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography sx={{ ...TypoTitle }}>{item.name}</Typography>
                        </Link>
                        <Rating name="no-value" value={item.rating} />
                        <Typography>{item.price}</Typography>
                    </Grid>
                )
            })}
            <ModalDetail open={openDetail} setOpen={setOpenDetail} id={itemId} />
            <ModalCart open={openCart} setOpen={setOpenCart}/>
        </Grid>
    )
}

const styleImg = {
    width: '100%',
    height: 300,
    maxWidth: 300,
    objectFit: 'cover'
}


const iconButtonHover = {
    backgroundColor: 'white',
    color: 'black'
}
iconButtonHover[':hover'] = {
    backgroundColor: 'black',
    color: 'white'
}

const TypoTitle = {
    width: 300
}
TypoTitle[':hover'] = {
    cursor: 'pointer'
}