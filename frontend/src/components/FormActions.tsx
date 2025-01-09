// components/FormActions.tsx
import React from 'react';
import { Button } from '@mui/material';
import { DialogActions} from '@mui/material';

interface FormActionsProps {
  onSave: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onSave }) => {
  return (
    <DialogActions>
      <Button onClick={onSave}>Save</Button>
    </DialogActions>
  );
};

export default FormActions;
