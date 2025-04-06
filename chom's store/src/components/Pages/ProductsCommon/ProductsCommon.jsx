import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Divider, Grid, Menu, MenuItem, Pagination, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import ShoesItem from '../../ProductItems/ShoeItem';
import Categories from './Categories';
import ColorFilter from './ColorFilter';
import OutstandingPrd from './OutstandingPrd';
import PriceFilter from './PriceFilter';
import ProductFilter from './ProductFilter';
import SizeFilter from './SizeFilter';
import ClothingItem from '../../ProductItems/ClothingItem';
import { useLocation } from 'react-router-dom';
import AccessoriesItem from '../../ProductItems/AccessoriesItem';




export default function ProductsCommon() {
  const [anchorElRanger, setAnchorElRanger] = useState(null);
  const openRanger = Boolean(anchorElRanger);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

  const handleClick = (event) => {
    setAnchorElRanger(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElRanger(null);
  };


  return (
    <>
      <BreadCumbs pageName={type === 'clothing' ? 'Clothing' : type === 'shoe' ? 'Shoe' : 'Accessories'} />
      <Grid container alignItems={'flex-start'} sx={{ mb: 20, px: 38, mt: 4 }}>
        <Grid item sm={3}>
          <Categories />
          <PriceFilter />
          <ColorFilter />
          <SizeFilter />
          <ProductFilter />
          <OutstandingPrd />
        </Grid>
        <Grid item sm={9} >
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} gap={4} sx={{ borderBottom: '1px solid #ebebeb' }}>
            <Typography sx={{ ...styleTitle }}>{type === 'clothing' ? 'Clothing' : type === 'shoe' ? 'Shoe' : 'Accessories'}</Typography>
            <Button
              id="basic-button"
              aria-controls={openRanger ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openRanger ? 'true' : undefined}
              onMouseOver={handleClick}
              sx={{ ...styleMenuButtonMain }}
              endIcon={<KeyboardArrowDownIcon />}>
              Sắp xếp theo
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElRanger}
              open={openRanger}
              MenuListProps={{ onMouseLeave: handleClose }}
              PaperProps={{
                style: {
                  width: '10%',
                },
              }}

            >
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}> Mặc định</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>A → Z</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>Z → A</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>Giá tăng dần</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>Giá giảm dần</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>Hàng mới nhất</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>Hàng cũ nhất</MenuItem>
            </Menu>
          </Grid>
          <Grid sx={{ mt: 3 }}>
            {type === 'clothing' ? <ClothingItem /> : type === 'accessories' ? <AccessoriesItem /> : <ShoesItem />}

          </Grid>
          {/* <Grid display={'flex'} justifyContent={'center'} sx={{ mt: 10 }}>
            <Stack spacing={2}>
              <Pagination count={4} variant="outlined" shape="rounded" />
            </Stack>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  )
}

const styleTitle = {
  fontWeight: 'bold',
  fontSize: 18
}

const styleMenuButtonMain = {
  fontSize: 14,
  color: 'black'
}

const fontSizeComon = {
  fontSize: 14
}