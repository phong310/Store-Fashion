import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Pagination, Rating, Stack, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import axios from 'axios';
import "../../CSS/ShoesItem.css"
import { Link, useLocation } from 'react-router-dom';
import ModalDetail from '../Modal/ModalDetail';
import { formatCurrencyVND } from '../../lib/common';

export default function AccessoriesItem({ dataSort }) {
    const [AccessoriesArr, setAccessoriesArr] = useState([]);
    const [itemId, setItemId] = useState()
    const [openDetail, setOpenDetail] = useState(false)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [totalAccess, setTotalAccess] = useState()
    const itemsPerPage = 6; // Số sản phẩm mỗi trang
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get('sort')
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');


    const getAsscessorisArr = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/accessories-collection/getAll?page=${page}&limit=${itemsPerPage}`);
            setAccessoriesArr(res.data.accessories)
            setTotalAccess(res.data.totalAccess)
        } catch (e) {
            console.log('Err', e);
        }
    }

    const handleDetail = (id) => {
        setOpenDetail(true)
        setItemId(id)
    }

    useEffect(() => {
        getAsscessorisArr()
    }, [page])

    useEffect(() => {
        if (sortBy || minPrice || maxPrice) {
            setAccessoriesArr(dataSort)
        } else {
            getAsscessorisArr()
        }
    }, [sortBy, dataSort, minPrice, maxPrice])

    return (
        <>
            <Grid container justifyContent={'center'} spacing={4} sx={{ textAlign: 'center' }}>
                {AccessoriesArr.length === 0 ? <>
                    <Typography sx={{ mt: 20 }}>Không có sản phẩm nào trong danh mục này.</Typography>
                </> : AccessoriesArr.map((item, idx) => {
                    return (
                        <Grid item key={idx} sx={{ position: 'relative' }}>
                            <div className="shoe-container">
                                <img src={item.img[0]} style={styleImg} />
                                <div className="overlay"></div>
                                <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                                    <IconButton sx={{ ...iconButtonHover }}>
                                        <ShoppingCartIcon />
                                    </IconButton>
                                    <IconButton sx={{ ...iconButtonHover }} onClick={() => handleDetail(item._id)}>
                                        <ZoomInIcon />
                                    </IconButton>
                                </Grid>
                            </div>
                            <Link to={`/products/${item._id}?type=accessories`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography sx={{ ...TypoTitle }}>{item.name}</Typography>
                            </Link>
                            <Rating name="no-value" value={item.rating} />
                            <Typography>{formatCurrencyVND(item.price)}</Typography>
                        </Grid>
                    )
                })}
                <ModalDetail open={openDetail} setOpen={setOpenDetail} id={itemId} />
            </Grid>
            {sortBy || maxPrice || minPrice ? '' : <Grid display={'flex'} justifyContent={'center'} sx={{ mt: 10 }}>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(totalAccess / itemsPerPage)} // Tổng số trang dựa vào tổng số sản phẩm
                        page={page}
                        onChange={(event, value) => setPage(value)}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </Grid>}

        </>

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