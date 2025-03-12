import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Box, Button, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import FooterLicense from './FooterLicense';
import logoStore from '/src/assets/images/logo_chom2.png';
import logoTheWind from '/src/assets/thewind2/thewindFooter.png'

export default function Footer() {
    return (
        <Box sx={{ ...styleBoxContainer }}>
            <Grid container justifyContent={{ xs: 'flex-start', sm: 'center' }} spacing={8}>
                <Grid item sx={{ mt: 1 }}>
                    <img src={logoTheWind} style={{ ...styleLogo }} />
                    <Typography sx={{ ...styleTypo }}>
                        Chôm store chuyên cung cấp sản phẩm giày chính hãng, giày hàng hiệu, giày cao cấp, giày thể thao . . . Sản phẩm chính hãng, đa dạng, giá tốt
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid display={'flex'} direction={'column'} alignItems={'start'}>
                        <Button variant="text" sx={{ ...styleTitle }}>Thông tin</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Trang chủ</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Giới thiệu</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Sản phẩm</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid display={'flex'} direction={'column'} alignItems={'start'}>
                        <Button variant="text" sx={{ ...styleTitle }}>Hướng dẫn</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Hướng dẫn mua hàng</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Hướng dẫn thanh toán</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Hướng dẫn giao nhận</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Điều khoản dịch vụ</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid display={'flex'} direction={'column'} alignItems={'start'}>
                        <Button variant="text" sx={{ ...styleTitle }}>Chính sách</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Chính sách bảo mật</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Chính sách vận chuyển</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Chính sách đổi trả</Button>
                        <Button variant="text" sx={{ ...styleMain }}>Quy định sử dụng</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button variant="text" sx={{ ...styleTitleContact }}>Liên hệ</Button>
                    <Grid display={'flex'} direction={'column'} alignItems={'start'} gap={1}>
                        <Grid display={'flex'}>
                            <IconButton>
                                <LocationOnIcon sx={{ ...colorIcon }} />
                            </IconButton>
                            <Typography sx={{ width: 220, ...styleMain }}>Ngõ 218 Lạc Long Quân, Phường Bưởi, Quận Tây Hồ, Tp Hà Nội.</Typography>
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'}>
                            <IconButton>

                                <EmailIcon sx={{ ...colorIcon }} />
                            </IconButton>
                            <Typography sx={{ ...styleMain }}>phamdinhquang1907@gmail.com</Typography>
                        </Grid>
                        <Grid display={'flex'} alignItems={'center'}>
                            <IconButton>

                                <LocalPhoneIcon sx={{ ...colorIcon }} />
                            </IconButton>
                            <Typography sx={{ ...styleMain }}>0865298206</Typography>
                        </Grid>
                        <Grid display={'flex'} >
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton>
                                <GoogleIcon />
                            </IconButton>
                            <IconButton>
                                <InstagramIcon />
                            </IconButton>
                            <IconButton>
                                <YouTubeIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <FooterLicense />
        </Box>
    )
}

const styleBoxContainer = {
    backgroundColor: '#2B586E'
}

const styleMain = {
    color: '#ACACAC',
    fontSize: 12
}

const styleTitle = {
    fontWeight: "bold",
    color: 'white',
    mb: 4
}

const styleLogo = {
    width: 140,
    height: 140,
    marginBottom: '40px'
}

const styleTypo = {
    width: 240,
    color: '#ACACAC',
    fontSize: 14
}

const styleTitleContact = {
    fontWeight: "bold",
    color: 'white',
    mb: 5
}

const colorIcon = {
    color: '#ACACAC'
}