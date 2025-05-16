import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery, useTheme } from '@mui/material';

export default function NewArrivals() {
        const theme = useTheme();
            const isMd = useMediaQuery(theme.breakpoints.down('md'));
        
            const cols = isMd ? 1 : 3;

    const NewArrivalsTop = [
        {
            id: 1,
            title: 'NIKE KYRIE LOW 4',
            img: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/categories_cupple.jpg?1702732161008'
        },
        {
            id: 2,
            title: 'NIKE PG5',
            img: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/categories_women.jpg?1702732161008'
        },
        {
            id: 3,
            title: 'NIKE COSMIC UNITY',
            img: 'https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/categories_man.jpg?1702732161008'
        }
    ]

    return (
        <>
            <Typography variant='h4' sx={{ ...styleTitle }}>NEW ARRIVALS</Typography>
            <Grid container justifyContent={'center'} sx={{ ...gridContainer }}>
                <Grid item xs={12} sm={8}>
                    <ImageList variant="masonry"
                        cols={cols}
                        gap={8}
                        sx={{
                            position: 'relative',
                            zIndex: 0,
                            transform: { xs: 'none', md: 'translateY(-10%)' },
                            transition: 'transform 0.3s ease',
                        }}>
                        {NewArrivalsTop.map((item, idx) => (
                            <ImageListItem key={idx} sx={{ ...imgListItem }}>
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{ width: '100%', transition: 'transform 1s ease', }}
                                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                                <ImageListItemBar position="bottom" title={item.title} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Grid>
            </Grid>
        </>
    )
}

const styleTitle = {
    textAlign: 'center',
    mt: 6,
    mb: 10,
    fontWeight: 'bold'
}

const gridContainer = {
    bgcolor: '#F8F8F8',
    position: 'relative',
    zIndex: 1
}

const imgList = {
    position: 'relative',
    zIndex: 0,
    mt: { xs: 4, sm: 6, md: 8, lg: 10 }, // dùng margin-top responsive thay vì translate
};


const imgListItem = {
    position: 'relative',
    overflow: 'hidden'
}