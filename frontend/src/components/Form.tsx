import { DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { MRT_EditActionButtons } from 'material-react-table';

const FormContent: React.FC<{ internalEditComponents: React.ReactNode }> = ({ internalEditComponents }) => (
  <>
    <DialogTitle variant="h3">Create New User</DialogTitle>
    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {internalEditComponents}
    </DialogContent>
  </>
);

const FormActions: React.FC = () => (
  <DialogActions>
    <MRT_EditActionButtons variant="text" />
  </DialogActions>
);

export { FormContent, FormActions };
