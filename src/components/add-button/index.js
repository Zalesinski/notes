import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function AddButton({ onClick }) {
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button onClick={onClick} variant="contained" size="medium">
        Сохранить
      </Button>
    </Box>
  );
}