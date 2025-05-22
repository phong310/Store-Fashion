import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button, Grid, IconButton, Pagination, Rating, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import { styleBtnAdd } from '../Accounts/Register';
import LoadingOverLay from '../../Loading/LoadingOverLay';
import { toast } from 'react-toastify';

const SearchScreen = () => {
    const [results, setResults] = useState([]);
    const [totalResult, setTotalResult] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [openCart, setOpenCart] = useState(false);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const itemsPerPage = 8;
    const [searchText, setSearchText] = useState();

    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q');
    const pageName = `Tìm kiếm từ khóa '${query}'`;

    const fetchSearchResults = async () => {
        setIsLoading(true);
        const startTime = Date.now();
        try {
            const response = await axios.get('http://localhost:3001/search', {
                params: {
                    q: query,
                    page: page,
                    limit: itemsPerPage,
                },
            });
            if (response) {
                setResults(response.data.results);
                setTotalResult(response.data.total);
                setSearchText(query);
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm');
        } finally {
            const elapsed = Date.now() - startTime;
            const remaining = 500 - elapsed;
            setTimeout(() => {
                setIsLoading(false);
            }, remaining > 0 ? remaining : 0);
        }
    };

    const handleSearch = () => {
        if (searchText) {
            setPage(1);
            navigate(`/search?q=${encodeURIComponent(searchText)}`);
        } else {
            toast.warn("Vui lòng nhập từ khóa tìm kiếm");
        }
    };

    useEffect(() => {
        if (query) {
            fetchSearchResults();
        }
    }, [query, page]);

    return (
        <>
            <BreadCumbs pageName={pageName} />

            {isLoading && <LoadingOverLay />}

            <Grid sx={{ mb: 20, px: { xs: 2, sm: 4, md: 8, lg: 20, xl: 38 }, mt: 4 }}>
                <Typography variant='h5' fontWeight={'bold'}>NHẬP TỪ KHÓA ĐỂ TÌM KIẾM SẢN PHẨM</Typography>
                <Grid sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mt: '20px', mb: '40px' }}>
                    <TextField
                        type="text"
                        fullWidth
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        size="small"
                        variant="outlined"
                        sx={{
                            maxWidth: 400,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                            },
                        }}
                    />

                    <Button type="submit" variant="contained" sx={styleBtnAdd} onClick={handleSearch}>
                        Tìm kiếm
                    </Button>
                </Grid>

                {results.length > 0 && (
                    <Typography variant='h5' fontWeight={'bold'} sx={{ mb: '50px' }}>
                        CÓ {totalResult} KẾT QUẢ TÌM KIẾM PHÙ HỢP
                    </Typography>
                )}

                <Grid container spacing={4} justifyContent='center' textAlign='center'>
                    {results.length > 0 ? results.map((item, idx) => (
                        <Grid item key={idx} xs={12} sm={6} md={4} lg={3} sx={{ position: 'relative' }}>
                            <div className="shoe-container">
                                <img src={item.img[0]} style={styleImg} />
                                <div className="overlay"></div>
                                <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                                    <IconButton sx={iconButtonHover} onClick={() => setOpenCart(true)}>
                                        <ShoppingCartIcon />
                                    </IconButton>
                                    <IconButton sx={iconButtonHover}>
                                        <ZoomInIcon />
                                    </IconButton>
                                </Grid>
                            </div>
                            <Link to={`/products/${item._id}?type=${item.category}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography sx={TypoTitle}>{item.name}</Typography>
                            </Link>
                            <Rating name="no-value" value={item.rating} />
                            <Typography>{item.price}</Typography>
                        </Grid>
                    )) : (
                        <Typography variant='h4' fontWeight='bold' sx={{ my: 10, textAlign: 'center' }}>
                            Không tìm thấy bất kỳ kết quả nào với từ khóa trên...
                        </Typography>
                    )}
                </Grid>

                {totalResult > 0 && (
                    <Grid display='flex' justifyContent='flex-end' sx={{ mt: 10 }}>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(totalResult / itemsPerPage)}
                                page={page}
                                onChange={(event, value) => setPage(value)}
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default SearchScreen;

const iconButtonHover = {
    backgroundColor: 'white',
    color: 'black',
    ':hover': {
        backgroundColor: 'black',
        color: 'white',
    },
};

const styleImg = {
    width: '100%',
    height: { xs: 200, sm: 250, md: 300 },
    objectFit: 'cover',
    borderRadius: 8
};

const TypoTitle = {
    width: '100%',
    maxWidth: 300,
    margin: '0 auto',
    ':hover': {
        cursor: 'pointer'
    }
};
