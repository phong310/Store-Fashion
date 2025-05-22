import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    styled,
    useMediaQuery
} from '@mui/material';
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
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        setShowSearch(true);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (searchTerm) {
            navigate(`/search?q=${searchTerm}`);
            setShowSearch(false);
        }
    };

    return (
        <Grid sx={{ ...styleGrid, opacity: showSearch ? 1 : 0 }}>
            <RotatableIconButton
                onClick={handleCloseSearch}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: 'black',
                    zIndex: 2
                }}
            >
                <CloseIcon sx={{ fontSize: isMobile ? 24 : 30 }} />
            </RotatableIconButton>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                    width: { xs: '90%', sm: '80%' },
                    px: { xs: 2, sm: 30 },
                    gap: 2
                }}
            >
                <FormControl fullWidth variant="standard">
                    <InputLabel
                        htmlFor="standard-adornment-amount"
                        sx={{ fontSize: { xs: 16, sm: 20 } }}
                    >
                        Nhập sản phẩm để tìm kiếm
                    </InputLabel>
                    <Input
                        id="standard-adornment-amount"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Tìm..."
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
                            </InputAdornment>
                        }
                        sx={{
                            fontSize: { xs: 20, sm: 28 },
                            fontWeight: 'bold',
                            height: 60
                        }}
                    />
                </FormControl>

                <IconButton
                    onClick={handleSearchSubmit}
                    sx={{ mt: { xs: 2, sm: 0 } }}
                >
                    <ArrowForwardIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
                </IconButton>
            </Box>
        </Grid>
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
    transition: 'opacity 0.4s ease',
    zIndex: 1000
};
