import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function SearchField({ onSearch }) {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'inline-block',
      }}
    >
      <TextField onChange={onSearch} fullWidth label="Введите поисковый запрос" id="fullWidth" />
    </Box>
  );
}