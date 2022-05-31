import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TitleField({ value, onChangeTitle }) {

  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'inline-block',
      }}
    >
      <TextField value={value} onChange={onChangeTitle} fullWidth label="Название" id="fullWidth" />
    </Box>
  );
}