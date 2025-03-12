import { Grid, IconButton, Rating, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import "../../CSS/ShoesItem.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ModalDetail from '../Modal/ModalDetail';



export const ArrShoes = [
  {
    id: 1,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/nike-lebron-witness-vii-ep-royal-blue-dm1122-400-0-large-1711684070815.png?v=1711684074953',
    name: 'LEBRON WITNESS 7 "HYPER ROYAL"',
    price: '2.550.000₫',
    size: [],
    rating: 5,
    best: true
  },
  {
    id: 2,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/gt-cut-2-womens-basketball-shoes-dghhnk-jpeg-1711683772704.jpg?v=1711683776580',
    name: 'GT CUT 2 "JADE ICE"',
    price: '3.250.000₫',
    size: [],
    rating: 2,
    best: true
  },
  {
    id: 3,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/nike-ja1-smoke-grey-dr8785-100-hero-1711682342193.png?v=1711682346613',
    name: 'JA 1 "LIGHT SMOKE GREY" (GS)',
    price: '2.450.000₫',
    size: [],
    rating: 3,
    best: true
  },
  {
    id: 4,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/gt-cut-academy-womens-basketball-shoes-z7qv5c-1709363354903.png?v=1709363358290',
    name: 'GT CUT ACADEMY "BARELY GRAPE"',
    price: '3.350.000₫',
    size: [],
    rating: 2,
    best: true
  },
  {
    id: 5,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/nike-giannis-immortality-2-basketball-shoes-white-black-barely-volt-grey-fog-1711683964025.jpg?v=1711683967090',
    name: 'GIANNIS IMMORTALITY 2 "WHITE/BLACK"',
    price: '2.550.000₫',
    size: [],
    rating: 3,
    best: false
  },
  {
    id: 6,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/lebron-xxi-tahitian-ep-basketball-shoes-4v5jrr-1711683219438.png?v=1711683223743',
    name: 'LEBRON XXI "TAHITIAN"',
    price: '4.950.000₫',
    size: [],
    rating: 3,
    best: false
  },
  {
    id: 7,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/s-l1600-17-afcca13b-7a85-408a-8b44-7e6091fe876a-large-1710859352129.png?v=1710859356573',
    name: 'LUKA 2 "NEBULA"',
    price: '3.250.000₫',
    size: [],
    rating: 2,
    best: false
  },
  {
    id: 8,
    img: 'https://bizweb.dktcdn.net/thumb/large/100/427/393/products/s-l1600-1709359820287.jpg?v=1709359851423',
    name: 'AR1 "ICEMAN"',
    price: '2.950.000₫',
    size: [],
    rating: 4,
    best: false
  },
]


export default function ShoesItem() {
  const navigate = useNavigate()
  const [ShoeData, setShoeData] = useState([])
  const [itemId, setItemId] = useState()
  const [openDetail, setOpenDetail] = useState(false)

  const getShoeArr = async () => {
    try {
      const res = await axios.get('http://localhost:3001/shoe-collection/getAll');
      setShoeData(res.data)
    } catch (e) {
      console.log('Err', e);
    }
  }

  const handleDetail = (id) => {
    setOpenDetail(true)
    setItemId(id)
  }

  const handelCartIcon = (id) => {
    navigate(`/products/${id}?type=shoe`)
  }

  useEffect(() => {
    getShoeArr()
  }, [])

  return (
    <Grid container justifyContent={'center'} spacing={4} sx={{ textAlign: 'center' }}>
      {ShoeData.map((item, idx) => {
        return (
          <Grid item key={idx} sx={{ position: 'relative' }}>

            <div className="shoe-container">
              <img src={item.img[0]} style={styleImg} />
              <div className="overlay"></div>
              <Grid className="icon-container" display={'flex'} direction={'column'} gap={1}>
                <IconButton sx={{ ...iconButtonHover }} onClick={() => handelCartIcon(item._id)}>
                  <ShoppingCartIcon />
                </IconButton>
                <IconButton sx={{ ...iconButtonHover }} onClick={() => handleDetail(item._id)}>
                  <ZoomInIcon />
                </IconButton>
              </Grid>
            </div>
            <Link to={`/products/${item._id}?type=shoe`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography sx={{ ...TypoTitle }}>{item.name}</Typography>
            </Link>
            <Rating name="no-value" value={item.rating} />
            <Typography>{item.price}</Typography>
          </Grid>
        )
      })}
      <ModalDetail open={openDetail} setOpen={setOpenDetail} id={itemId} />
    </Grid>
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
