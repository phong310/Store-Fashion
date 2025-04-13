import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RotatableIconButton = styled(IconButton)({
    transition: 'transform 0.2s ease',
    '&:hover': {
        transform: 'rotate(90deg)',
    },
});

export default function SearchScreen({ handleCloseSearch }) {
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    const navigate = useNavigate(); 

    useEffect(() => {
        setShowSearch(true);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm) {
            navigate(`/search?q=${searchTerm}`);
            setShowSearch(false)
        }
    };

    return (
        <>
            <Grid sx={{ ...styleGrid, opacity: showSearch ? 1 : 0 }}>
                <RotatableIconButton onClick={handleCloseSearch} sx={{ ...styleIconClose }}>
                    <CloseIcon sx={{ fontSize: 30 }} />
                </RotatableIconButton>
                <Box sx={{ ...styleSearchBox }}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel htmlFor="standard-adornment-amount" color='grey' sx={{ fontSize: 20 }}>Nhập sản phẩm để tìm kiếm</InputLabel>
                        <Input
                            style={{ ...styleInputSearch }}
                            color='grey'
                            id="standard-adornment-amount"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            startAdornment={<InputAdornment position="start">
                                <SearchIcon sx={{ ...styleIcon }} />
                            </InputAdornment>}
                            placeholder="Tìm..."
                        />
                    </FormControl>
                    <IconButton onClick={handleSearchSubmit}>
                        <ArrowForwardIcon sx={{ ...styleIcon }} />
                    </IconButton>
                </Box>
            </Grid>
        </>
    );
}

const styleGrid = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFFF7',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.4s ease'
};

const styleSearchBox = {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    px: 40,
    position: 'relative'
};

const styleIconClose = {
    position: 'absolute',
    top: 6,
    right: 10,
    color: 'black',
};

const styleIcon = {
    fontSize: 40
};

const styleInputSearch = {
    height: 60,
    fontSize: 28,
    fontWeight: 'bold'
};
