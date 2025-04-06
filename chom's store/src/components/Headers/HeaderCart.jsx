import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge, Button, Divider, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { getCartFaild, getCartStart, getCartSuccess } from '../../redux/cartSlice';
import SearchScreen from './SearchScreen';
import { formatCurrency } from '../../lib/transform';
import { calculateTotal } from '../../lib/common';

export default function HeaderCart() {
    const dataCart = useSelector((state) => state.cart.cartList?.allCart)
    const user = useSelector((state) => state.auth.login?.currentUser)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [openSearch, setOpeSearch] = useState(false);;

    const handleOpenSearch = () => {
        setOpeSearch(true);
    };
    const handleCloseSearch = () => {
        setOpeSearch(false);
    };
    const getAllCart = async () => {
        const userId = user?.user._id
        dispatch(getCartStart())
        try {
            const res = await axiosInstance.get('/cart/getAllCart', {
                params: { userId }
            })
            if (res) {
                dispatch(getCartSuccess(res.data));
            }
        } catch (err) {
            console.log({ Err: err });
            dispatch(getCartFaild());
        }
    }

    useEffect(() => {
        getAllCart()
    }, [user])


    return (
        <Grid container alignItems={'center'} spacing={4}>
            <Grid item>
                <Button variant="contained" sx={{ ...styleButton }}>ĐẶT HÀNG</Button>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ height: 100, mt: 4 }} />
            <Grid item>
                <Grid container alignItems={'center'} spacing={1}>
                    <Grid item>
                        <IconButton onClick={handleOpenSearch}>
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    <Grid item display={'flex'} alignItems={'center'}>
                        <IconButton onClick={() => navigate('/cart')}>
                            <ShoppingBagIcon />
                        </IconButton>
                        <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 'bold' }}>
                            {user ? dataCart?.length : 0} / {user ? formatCurrency(calculateTotal(dataCart)) : 0}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {openSearch && <SearchScreen handleCloseSearch={handleCloseSearch} />}
        </Grid>
    );
}

const styleButton = {
    borderRadius: 50,
    bgcolor: '#112637',
    width: 130,
    mr: 4,
    '&:hover': {
        bgcolor: '#112637',
    },
};