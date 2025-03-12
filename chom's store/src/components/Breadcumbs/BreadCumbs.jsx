import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import React from 'react';

export default function BreadCumbs({ pageName, itemPage }) {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/">
            Trang chủ
        </Link>,
        <Typography key="3" color="text.primary">
            {pageName}
        </Typography>,
        itemPage ?
            <Typography key="3" color="text.primary">
                {itemPage}
            </Typography> : '',
    ];


    return (
        <Box
            sx={{ ...styleBoxContainer }}
        >
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>

        </Box>
    )
}

const styleBoxContainer = {
    position: 'relative',
    mt: 12,
    height: 120,
    backgroundImage: 'url(https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/breadcrumb-bg.png?1702732161008)',
    backgroundPosition: 'center top',
    backgroundColor: '#f4f4f4',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    pl: 38
}