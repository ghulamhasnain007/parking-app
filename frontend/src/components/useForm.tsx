// components/UserForm.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface UserFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const UserForm: React.FC<UserFormProps> = ({ formData, setFormData }) => {
  return (
    <>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        fullWidth
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        fullWidth
      />
    </>
  );
};

export default UserForm;
