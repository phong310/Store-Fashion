import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingOverLay = () => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <CircularProgress color="inherit" />
        </div>
    )
}

export default LoadingOverLay