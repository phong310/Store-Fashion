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

export default function ProductsCommon() {
  const [anchorElRanger, setAnchorElRanger] = useState(null);
  const openRanger = Boolean(anchorElRanger);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const [sortBy, setSortBy] = useState('');
  const [sortLabel, setSortLabel] = useState('Sắp xếp theo');
  const [data, setData] = useState([]);

  const handleClick = (event) => {
    setAnchorElRanger(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElRanger(null);
  };

  const filterData = async () => {
    try {
      const res = await fetch(`http://localhost:3001/shoe-collection/filter?sortBy=${sortBy}`);
      const result = await res.json();
      setData(result.shoes);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const filterPriceRange = async (min, max) => {
    try {
      const res = await fetch(`http://localhost:3001/shoe-collection/filter-price?minPrice=${min}&maxPrice=${max}`)
      const result = await res.json();
      setData(result.shoes);
    } catch (err) {
      console.error(err)
    }
  }

  const filterSize = async (size) => {
    try {
      const res = await fetch(`http://localhost:3001/shoe-collection/filter/size?size=${size}`)
      const result = await res.json();
      setData(result.shoes);
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
    const queryParams = new URLSearchParams(location.search);
    const sortValue = queryParams.get('sort');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const sizeShoe = queryParams.get('size')

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
      <Grid container alignItems={'flex-start'} sx={{ mb: 20, px: 38, mt: 4 }}>
        <Grid item sm={3}>
          <Categories />
          <PriceFilter onPriceChange={handlePriceChange} />
          <ColorFilter />
          <SizeFilter onSizeChange={handleSizeChange} />
          <ProductFilter />
          <OutstandingPrd />
        </Grid>
        <Grid item sm={9}>
          <Grid display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} gap={4} sx={{ borderBottom: '1px solid #ebebeb' }}>
            <Typography sx={{ ...styleTitle }}>
              {type === 'clothing' ? 'Clothing' : type === 'shoe' ? 'Shoe' : 'Accessories'}
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
                  width: '10%',
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
            {type === 'clothing' ? <ClothingItem /> : type === 'accessories' ? <AccessoriesItem /> : <ShoesItem dataSort={data} />}
          </Grid>
        </Grid>
      </Grid>
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
