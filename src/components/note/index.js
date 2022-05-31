import React from 'react';
import styles from './styles.module.css'
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Note ({ title, onSelect, onDelete, isSelected = false }) {

  const shortenedTitle = title.length > 20 ? title.substring(0, 19).concat('...') : title;

  return (
    <div onClick={onSelect} className={styles.note}>
      <p className={styles.title}>{shortenedTitle}</p>
      {isSelected && <EditIcon />}
      {onDelete && <IconButton onClick={onDelete} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>}
    </div>
  )
}