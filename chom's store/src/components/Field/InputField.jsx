import React from 'react';
import { TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

const InputField = ({
  name,
  control,
  label,
  type = 'text',
  defaultValue = '',
  error,
  helperText,
  sx = {},
  inputProps = {},
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      <Typography sx={{ marginBottom: 1 }}>
        {label} <span style={{ color: 'red' }}>*</span>:
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            fullWidth
            size="small"
            variant="outlined"
            error={!!error}
            helperText={helperText}
            sx={{
              '& label': { color: 'gray' },
              '& label.Mui-focused': { color: 'gray' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#ddd', border: '1px solid #ddd' },
                '&:hover fieldset': { borderColor: '#ddd', border: '1px solid #ddd' },
                '&.Mui-focused fieldset': { borderColor: '#ddd', border: '1px solid #ddd' },
              },
              borderRadius: 20,
              ...sx,
            }}
            InputProps={{ sx: { borderRadius: 20 }, ...inputProps }}
          />
        )}
      />
    </div>
  );
};

export default InputField;
