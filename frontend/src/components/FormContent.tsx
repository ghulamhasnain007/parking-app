// components/FormContent.tsx
import React from 'react';
import { DialogContent, DialogActions, Button } from '@mui/material';

interface FormContentProps {
  children: React.ReactNode;
  onSave: () => void;
}

const FormContent: React.FC<FormContentProps> = ({ children, onSave }) => {
  return (
    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {children}
      <DialogActions>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </DialogContent>
  );
};

export default FormContent;
