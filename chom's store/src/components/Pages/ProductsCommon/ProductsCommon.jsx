import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BreadCumbs from '../../Breadcumbs/BreadCumbs';
import AccessoriesItem from '../../ProductItems/AccessoriesItem';
import ClothingItem from '../../ProductItems/ClothingItem';
import ShoesItem from '../../ProductItems/ShoeItem';
import Categories from './Categories';
import ColorFilter from './ColorFilter';
import OutstandingPrd from './OutstandingPrd';
import PriceFilter from './PriceFilter';
import ProductFilter from './ProductFilter';
import SizeFilter from './SizeFilter';
import { convertPrice } from '../../../lib/common';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


export default function ProductsCommon() {
  const [anchorElRanger, setAnchorElRanger] = useState(null);
  const openRanger = Boolean(anchorElRanger);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const sortValue = queryParams.get('sort');
  const minPrice = queryParams.get('minPrice');
  const maxPrice = queryParams.get('maxPrice');
  const sizeShoe = queryParams.get('size')
  const [sortBy, setSortBy] = useState('');
  const [sortLabel, setSortLabel] = useState('Sắp xếp theo');
  const [data, setData] = useState([]);
  const typeUrl = type === 'clothing' ? 'clothing-collection' : type === 'shoe' ? 'shoe-collection' : 'accessories-collection'
  const [prdLength, setPrdLength] = useState()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleClick = (event) => {
    setAnchorElRanger(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElRanger(null);
  };

  const filterData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/${typeUrl}/filter?sortBy=${sortBy}`);
      const result = await res.json();
      if (type === 'shoe') {
        setData(result.shoes);
      } else if (type === 'clothing') {
        setData(result.clothings)
      } else {
        setData(result.accessories)
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const filterPriceRange = async (min, max) => {
    try {
      const res = await fetch(`http://localhost:3001/${typeUrl}/filter-price?minPrice=${min}&maxPrice=${max}`)
      const result = await res.json();
      if (type === 'shoe') {
        setData(result.shoes);
      } else if (type === 'clothing') {
        setData(result.clothings)
      } else {
        setData(result.accessories)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const filterSize = async (size) => {
    try {
      const res = await fetch(`http://localhost:3001/${typeUrl}/filter/size?size=${size}`)
      const result = await res.json();
      if (type === 'shoe') {
        setData(result.shoes);
      } else if (type === 'clothing') {
        setData(result.clothings)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleSort = (sortValue, label) => {
    setSortBy(sortValue);
    setSortLabel(label);
    handleClose();

    // cập nhật URL
    const newParams = new URLSearchParams(location.search);
    if (sortValue) {
      newParams.set('sort', sortValue);
    } else {
      newParams.delete('sort');
    }
    navigate(`${location.pathname}?${newParams.toString()}`);
  }

  const handlePriceChange = (selectedPriceRanges) => {
    const newParams = new URLSearchParams(location.search);

    if (selectedPriceRanges.length === 0) {
      newParams.delete('minPrice');
      newParams.delete('maxPrice');
    } else {
      const range = selectedPriceRanges[0];
      let min = 0, max = 0;

      if (range.includes('dưới')) {
        max = convertPrice(range.replace('Giá dưới ', ''));
      } else if (range.includes('trên')) {
        min = convertPrice(range.replace('Giá trên ', ''));
        max = '';
      } else {
        const [minText, maxText] = range.split(' - ');
        min = convertPrice(minText);
        max = convertPrice(maxText);
      }

      if (min !== 0) {
        newParams.set('minPrice', min);
      } else {
        newParams.delete('minPrice');
      }

      if (max !== 0 && max !== '') {
        newParams.set('maxPrice', max);
      } else {
        newParams.delete('maxPrice');
      }
    }
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  const handleSizeChange = (selectSizeChange) => {
    const newParams = new URLSearchParams(location.search);
    if (!selectSizeChange) {
      newParams.delete('size')
    } else {
      newParams.set('size', selectSizeChange);
    }
    navigate(`${location.pathname}?${newParams.toString()}`);
  }


  useEffect(() => {
    if (minPrice || maxPrice) {
      filterPriceRange(minPrice || '', maxPrice || '');
    } else if (sortValue) {
      filterData();
    } else if (sizeShoe) {
      filterSize(sizeShoe)
    }
  }, [location.search]);


  return (
    <>
      <BreadCumbs pageName={type === 'clothing' ? 'Clothing' : type === 'shoe' ? 'Shoe' : 'Accessories'} />
      <Grid item xs={12} display={{ md: 'block', lg: 'none' }} sx={{ mb: 2 }}>
        <IconButton
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          size="large"
          sx={{
            position: 'fixed',
            top: '40%',
            right: isDrawerOpen ? 280 : 0,
            transform: 'translateY(-50%)',
            zIndex: 1301,
            backgroundColor: 'white',
            borderRadius: '4px 0 0 4px',
            border: '1px solid #ddd',
            boxShadow: 2,
            transition: 'right 0.3s ease',
            color: 'black',
            '&:hover': {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        >
          {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>


      </Grid>
      <Grid container
        alignItems="flex-start"
        justifyContent={{ xs: 'center', lg: 'flex-start' }}
        sx={{
          mb: 20,
          px: { xs: 2, sm: 4, md: 8, lg: 16, xl: 38 },
          mt: 4,
        }}>
        <Grid item sm={3} display={{ xs: 'none', lg: 'block' }}>
          <Categories />
          <PriceFilter onPriceChange={handlePriceChange} />
          <ColorFilter />
          <SizeFilter onSizeChange={handleSizeChange} type={type} />
          <ProductFilter />
          <OutstandingPrd />
        </Grid>
        <Grid item sm={9}>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} gap={4} sx={{ borderBottom: '1px solid #ebebeb', flexDirection:{xs:'column', md:'unset'} }}>
            <Typography sx={{ ...styleTitle }}>
              {type === 'clothing' ? `Quần áo (${prdLength && !minPrice && !maxPrice && !sizeShoe ? prdLength : data.length} sản phẩm)`
                : type === 'shoe' ? `Giày (${prdLength && !minPrice && !maxPrice && !sizeShoe ? prdLength : data.length} sản phẩm)`
                  : `Phụ kiện tổng hợp (${prdLength && !minPrice && !maxPrice && !sizeShoe ? prdLength : data.length} sản phẩm)`}
            </Typography>
            <Button
              id="basic-button"
              aria-controls={openRanger ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openRanger ? 'true' : undefined}
              onMouseOver={handleClick}
              sx={{ ...styleMenuButtonMain }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {sortLabel}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElRanger}
              open={openRanger}
              MenuListProps={{ onMouseLeave: handleClose }}
              PaperProps={{
                style: {
                  width: {xs:'40%', md:'20%', }
                },
              }}
            >
              <MenuItem onClick={() => handleSort('', 'Sắp xếp theo')} sx={{ ...fontSizeComon }}>Mặc định</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('name-asc', 'A → Z')} sx={{ ...fontSizeComon }}>A → Z</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('name-desc', 'Z → A')} sx={{ ...fontSizeComon }}>Z → A</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('price-asc', 'Giá tăng dần')} sx={{ ...fontSizeComon }}>Giá tăng dần</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('price-desc', 'Giá giảm dần')} sx={{ ...fontSizeComon }}>Giá giảm dần</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('newest', 'Hàng mới nhất')} sx={{ ...fontSizeComon }}>Hàng mới nhất</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleSort('oldest', 'Hàng cũ nhất')} sx={{ ...fontSizeComon }}>Hàng cũ nhất</MenuItem>
            </Menu>
          </Grid>
          <Grid sx={{ mt: 3 }}>
            {type === 'clothing' ?
              <ClothingItem dataSort={data} setPrdLength={setPrdLength} />
              : type === 'accessories' ?
                <AccessoriesItem dataSort={data} setPrdLength={setPrdLength} />
                : <ShoesItem dataSort={data} setPrdLength={setPrdLength} />}
          </Grid>
        </Grid>
      </Grid>

      {/* Filter screen mobile */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // giữ lại DOM giúp chuyển động mượt
        }}
      >
        <div style={{ width: 280, padding: 16 }}>
          <Categories />
          <PriceFilter onPriceChange={handlePriceChange} />
          <ColorFilter />
          <SizeFilter onSizeChange={handleSizeChange} type={type} />
          <ProductFilter />
          <OutstandingPrd />
        </div>
      </Drawer>


    </>
  );
}

const styleTitle = {
  fontWeight: 'bold',
  fontSize: 18,
};

const styleMenuButtonMain = {
  fontSize: 14,
  color: 'black',
};

const fontSizeComon = {
  fontSize: 14,
};
