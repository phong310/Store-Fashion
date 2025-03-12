import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axiosInstance from '../../../config/axiosInstance';
import { formatCurrency } from '../../../lib/transform';
import { deleteItemFaild, deleteItemStart, deleteItemSuccess } from '../../../redux/deleteCartSlice';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import { getCartFaild, getCartStart, getCartSuccess } from '../../../redux/cartSlice';
import { increaseItemFailed, increaseItemStart, increaseItemSuccess } from '../../../redux/increaseCartSlice';
import { decreaseItemStart, decreaseItemSuccess } from '../../../redux/decreaseCartSlice';
import { calculateTotal } from '../../../lib/common';
import { useNavigate } from 'react-router';


export const dataCart = [
    {
        id: 1,
        name: 'DUNK LOW SE "JUST DO IT - SAIL TEAM RED" - DV1160 - 101 - 8.5W(40 - 25.5cm)',
        img: 'https://bizweb.dktcdn.net/thumb/compact/100/427/393/products/b83485d6-ef36-46b2-9c2b-326a68abfec8-jpeg-1685517354386.jpg',
        quantity: 1,
        price: '3.950.000₫',
        totalPrice: '3.950.000₫'
    },
    {
        id: 2,
        name: 'DUNK LOW "PANDA" (W) - DD1503-101 - 6W (36.5 - 23cm)',
        img: 'https://bizweb.dktcdn.net/thumb/compact/100/427/393/products/af53d53d-561f-450a-a483-70a7ceee380f-jpeg-1692592984001.jpg',
        quantity: 1,
        price: '4.450.000₫',
        totalPrice: '4.450.000₫'
    },
]


export default function Carts() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    const userId = user?.user._id
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const getAllCart = async () => {
        dispatch(getCartStart())
        try {
            const res = await axiosInstance.get('/cart/getAllCart', {
                params: { userId }
            })
            if (res) {
                dispatch(getCartSuccess(res.data));
                setData(res.data)
            }
        } catch (err) {
            console.log({ Err: err });
            dispatch(getCartFaild());
        }
    }

    const handelDelete = async (itemId) => {
        dispatch(deleteItemStart())
        try {
            const res = await axiosInstance.delete('/cart/delete', { data: { itemId, userId } })
            if (res) {
                toast.success("Sản phẩm đã được xóa !")
                dispatch(deleteItemSuccess(res.data))
                getAllCart()
            }
        } catch (err) {
            console.log(err);
            dispatch(deleteItemFaild())
        }
    }

    const handleIncrease = async (item) => {
        const itemId = item._id
        const quantity = 1
        dispatch(increaseItemStart())
        try {
            const res = await axiosInstance.put('/cart/increase', { userId, itemId, quantity })
            if (res) {
                dispatch(increaseItemSuccess(res.data))
                getAllCart()
            }
        } catch (err) {
            console.log({ Err: err });
            dispatch(increaseItemFailed())
        }
    }

    const handleDecrease = async (item) => {
        dispatch(decreaseItemStart())
        const itemId = item._id
        const quantity = 1
        try {
            const res = await axiosInstance.put('/cart/decrease', { userId, itemId, quantity })
            if (res) {
                dispatch(decreaseItemSuccess(res.data))
                getAllCart()
            }
        } catch (err) {
            console.log({ Err: err });
            dispatch(deleteItemFaild())
        }
    }

    const handelCheckout = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        getAllCart()
    }, [])


    return (
        <>
            <BreadCumbs pageName='Giỏ hàng' />
            {user && data?.length > 0 ? <>
                <Grid>
                    <Typography variant='h5' sx={{ ...styleTypo }}>GIỎ HÀNG CỦA BẠN</Typography>
                </Grid>
                <Grid container justifyContent={'center'} sx={{ mb: 15 }}>
                    <Grid item sm={8}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead >
                                    <TableRow>
                                        <TableCell align="center" sx={{ ...textBold }}>Hình ảnh</TableCell>
                                        <TableCell align="center" sx={{ ...textBold }}>Tên sản phẩm</TableCell>
                                        <TableCell align="center" sx={{ ...textBold }}>Đơn giá</TableCell>
                                        <TableCell align="center" sx={{ ...textBold }}>Số lượng</TableCell>
                                        <TableCell align="center" sx={{ ...textBold }}>Thành tiền</TableCell>
                                        <TableCell align="center" sx={{ ...textBold }}>Chức năng</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                <img src={row.img} width={240} height={240} />
                                            </TableCell>
                                            <TableCell align="center">{row.product}</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>{formatCurrency(row.price)}</TableCell>
                                            <TableCell align="center">
                                                <Grid alignItems="center" gap={1} sx={{ ...styleQuantity }}>
                                                    <IconButton onClick={() => handleDecrease(row)}>
                                                        <RemoveIcon sx={{ ...styleIcon }} />
                                                    </IconButton>
                                                    <Typography>{row.quantity}</Typography>
                                                    <IconButton onClick={() => handleIncrease(row)}>
                                                        <AddIcon sx={{ ...styleIcon }} />
                                                    </IconButton>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>{formatCurrency(row.subtotal)}</TableCell>
                                            <TableCell align="center">
                                                <IconButton onClick={() => handelDelete(row._id)}>
                                                    <DeleteForeverIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography sx={{ ...styleTypoTotal }}>Tổng tiền:
                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                {formatCurrency(calculateTotal(data))}
                            </span>
                        </Typography>
                        <Grid display={'flex'} alignContent={'center'} gap={2} justifyContent={'flex-end'}>
                            <Button variant="contained" sx={{ ...styleBtnContinue }}>Tiếp tục mua hàng</Button>
                            <Button variant="contained" sx={{ ...styleBtnAdd }} onClick={handelCheckout}>Tiến hành đặt hàng</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </> :
                <Grid>
                    <Typography variant='h5' sx={{ my: 20, textAlign: 'center', color: 'gray', fontWeight: 'bold', fontSize: 30 }}>Không có sản phẩm !</Typography>
                </Grid>}

        </>
    )
}

const styleBtnAdd = {
    borderRadius: 20,
    p: 1,
    px: 6,
    bgcolor: '#112637',
    color: 'white',
    '&:hover': {
        bgcolor: '#112637',
    },
}
const styleBtnContinue = {
    borderRadius: 20,
    p: 1,
    px: 6,
    bgcolor: '#F1F1F1',
    color: '#222222',
    '&:hover': {
        bgcolor: '#F1F1F1',
    },
}

const textBold = {
    fontWeight: 'bold'
}

const styleTypo = {
    ml: 38,
    my: 5,
    fontWeight: 'bold'
}

const styleQuantity = {
    border: '1px solid #ddd',
    borderRadius: '20px',
    display:'inline-flex'
}

const styleIcon = {
    fontSize: 14
}

const styleTypoTotal = {
    textAlign: 'right',
    my: 4,
    fontSize: 20
}