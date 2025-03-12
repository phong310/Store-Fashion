import AddIcon from '@mui/icons-material/Add';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import { Backdrop, Box, Button, Fade, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { dataCart } from '../Pages/Carts/Carts';



const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1100,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 4
};

export default function ModalCart({ open, setOpen }) {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            m: 1,
                            color: 'text.primary',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Grid>
                        <Grid display={'flex'} gap={2} alignItems={'center'} sx={{ mb: 2 }}>
                            <CheckIcon />
                            <Typography sx={{ fontWeight: 'bold', fontSize:22 }}>
                                Bạn đã thêm TẤT SPACE JUMP ''OWN YOUR POWER'' - TÍM vào giỏ hàng
                            </Typography>
                        </Grid>
                        <Grid display={'flex'} sx={{ mb: 2 }}>
                            <Typography sx={{ fontWeight: 'bold' }}> Giỏ hàng của bạn (5 sản phẩm) </Typography>
                            <ArrowRightIcon />
                        </Grid>
                        <Grid>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell align="center" sx={{ ...textBold }}>Hình ảnh</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>Tên sản phẩm</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>Đơn giá</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>Số lượng</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>Thành tiền</TableCell>
                                            <TableCell align="center" sx={{ ...textBold }}>Chức năng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataCart.map((row) => (
                                            <TableRow key={row.name}>
                                                <TableCell component="th" scope="row">
                                                    <img src={row.img} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.name} 
                                                </TableCell>
                                                <TableCell align="center" sx={{ ...textBold }}>{row.price}</TableCell>
                                                <TableCell align="center">
                                                    <Grid item display="flex" alignItems="center" gap={1} sx={{ ...styleQuantity }}>
                                                        <IconButton>
                                                            <RemoveIcon sx={{ ...styleIcon }} />
                                                        </IconButton>
                                                        <Typography>{row.quantity}</Typography>
                                                        <IconButton>
                                                            <AddIcon sx={{ ...styleIcon }} />
                                                        </IconButton>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell align="center" sx={{ ...textBold }}>{row.totalPrice}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Bỏ sản phẩm" placement="top-start">
                                                        <IconButton>
                                                            <DeleteForeverIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                                <Grid item>
                                    <Typography sx={{ mb: 1, color:'#777'}}>
                                        Giao hàng toàn quốc
                                    </Typography>
                                    <Grid display={'flex'} alignItems={'center'} sx={{ ...btnContinue }} onClick={handleClose}>
                                        <ArrowLeftIcon />
                                        <Typography>
                                            Tiếp tục mua hàng
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Grid item>
                                    <Typography sx={{ ...styleTypoTotal }}>Tổng tiền: <span style={{ color: 'red', fontWeight: 'bold' }}>8.400.000₫</span></Typography>
                                    <Button variant="contained" sx={{ ...styleBtnAdd }}>Tiến hành đặt hàng</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

            </Fade>
        </Modal>
    )
}

const textBold = {
    fontWeight: 'bold'
}

const styleTypoTotal = {
    textAlign: 'right',
    my: 2,
    fontSize: 20
}

const styleIcon = {
    fontSize: 14
}

const styleQuantity = {
    border: '1px solid #ddd',
    borderRadius: '20px',
    pl: 1
}

const styleBtnAdd = {
    borderRadius: 20,
    p: 1,
    px: 6,
    bgcolor: '#112637',
    color: 'white',
    '&:hover': {
        bgcolor: '#112637',
    },
}

const btnContinue = {
    '&:hover': {
        cursor: 'pointer'
    },
}