// import { MaterialReactTable } from 'material-react-table';
// import { Box, Button } from '@mui/material';
// import { MRT_EditActionButtons } from 'material-react-table';
// import { useGetUsers } from './hooks/useGetUsers';
// import { useCreateUser } from './hooks/useCreateUser';
// import { useUpdateUser } from './hooks/useUpdateUser';
// import { useDeleteUser } from './hooks/useDeleteUser';
// import { User } from './makeData';
// import { validateUser } from './utils/validation';

// const Table: React.FC = () => {
//   const { data: fetchedUsers, isLoading, isError } = useGetUsers();
//   const { mutateAsync: createUser } = useCreateUser();
//   const { mutateAsync: updateUser } = useUpdateUser();
//   const { mutateAsync: deleteUser } = useDeleteUser();

//   const handleCreateUser = async ({ values, table }: any) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       return;
//     }
//     await createUser(values);
//     table.setCreatingRow(null);
//   };

//   const handleSaveUser = async ({ values, table }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       return;
//     }
//     await updateUser(values);
//     table.setEditingRow(null);
//   };

//   const openDeleteConfirmModal = (row) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       deleteUser(row.original.id);
//     }
//   };

//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={fetchedUsers}
//       isLoading={isLoading}
//       onCreatingRowSave={handleCreateUser}
//       onEditingRowSave={handleSaveUser}
//       renderRowActions={({ row, table }) => (
//         <Box sx={{ display: 'flex', gap: '1rem' }}>
//           <Button onClick={() => table.setEditingRow(row)}>Edit</Button>
//           <Button color="error" onClick={() => openDeleteConfirmModal(row)}>Delete</Button>
//         </Box>
//       )}
//     />
//   );
// };

// export default Table;




// components/Table.tsx
import React from 'react';
import { Button } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { Box } from '@mui/system';

interface TableProps {
  data: any[];
  columns: any[];
  onRowEdit: (row: any) => void;
  onRowDelete: (row: any) => void;
}

const Table: React.FC<TableProps> = ({ data, columns, onRowEdit, onRowDelete }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      renderRowActions={({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={() => onRowEdit(row)}>Edit</Button>
          <Button color="error" onClick={() => onRowDelete(row)}>Delete</Button>
        </Box>
      )}
    />
  );
};

export default Table;
