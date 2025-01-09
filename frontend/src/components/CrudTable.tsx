// import React from 'react';
// import {
//   MaterialReactTable,
//   type MRT_ColumnDef,
//   type MRT_TableOptions,
//   type MRT_RowData,
// } from 'material-react-table';
// import { Button, IconButton, Tooltip, Box } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// interface CrudTableProps<T extends MRT_RowData> {
//   columns: MRT_ColumnDef<T>[];
//   data: T[];
//   isLoading: boolean;
//   onCreate: MRT_TableOptions<T>['onCreatingRowSave'];
//   onUpdate: MRT_TableOptions<T>['onEditingRowSave'];
//   onDelete: (id: string) => void;
//   validationErrors: Record<string, string | undefined>;
//   setValidationErrors: React.Dispatch<
//     React.SetStateAction<Record<string, string | undefined>>
//   >;
// }

// const CrudTable = <T extends MRT_RowData & { id: string }>({
//   columns,
//   data,
//   isLoading,
//   onCreate,
//   onUpdate,
//   onDelete,
//   validationErrors,
//   setValidationErrors,
// }: CrudTableProps<T>) => {
//   return (
//     <MaterialReactTable
//       columns={columns}
//       data={data}
//       createDisplayMode="modal"
//       editDisplayMode="modal"
//       enableEditing
//       getRowId={(row) => row.id}
//       muiTableContainerProps={{ sx: { minHeight: '500px' } }}
//       state={{ isLoading }}
//       renderRowActions={({ row, table }) => (
//         <Box sx={{ display: 'flex', gap: '1rem' }}>
//           <Tooltip title="Edit">
//             <IconButton onClick={() => table.setEditingRow(row)}>
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton color="error" onClick={() => onDelete(row.original.id)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       )}
//       renderTopToolbarCustomActions={({ table }) => (
//         <Button
//           variant="contained"
//           onClick={() => table.setCreatingRow(true)}
//         >
//           Create New Entry
//         </Button>
//       )}
//       onCreatingRowSave={onCreate}
//       onEditingRowSave={onUpdate}
//       onCreatingRowCancel={() => setValidationErrors({})}
//       onEditingRowCancel={() => setValidationErrors({})}
//     />
//   );
// };

// export default CrudTable;



import { MaterialReactTable, MRT_ColumnDef, MRT_RowData, MRT_Row } from 'material-react-table';
import { useState } from 'react';
import { Button, IconButton, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



interface CrudTableProps<T extends MRT_RowData & { id: string }> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading: boolean;
  onCreate: (values: T) => void;
  onUpdate: (values: T) => void;
  onDelete: (id: string) => void;
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>;
}

const CrudTable = <T extends { id: string }>({
  columns,
  data,
  isLoading,
  onCreate,
  onUpdate,
  onDelete,
  validationErrors,
  setValidationErrors,
}: CrudTableProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={data}
          enableEditing
          onCreatingRowSave={async ({ values, exitCreatingMode }) => {
            onCreate(values as T);
            exitCreatingMode(); // Exit creating mode after saving
          }}
          onEditingRowSave={async ({ row, values }) => {
            onUpdate(values as T); // Pass the updated row values to the parent
          }}
          renderRowActions={({ row, table }) => (
            <div>
              <button
                onClick={() => {
                  table.setEditingRow(row);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this row?')) {
                    onDelete(row.original.id);
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
          renderTopToolbarCustomActions={({ table }) => (
            <button
              onClick={() => {
                table.setEditingRow(null);
                setIsEditing(true);
              }}
            >
              Add New Row
            </button>
          )}
        />
      )}
    </div>
  );
};

export default CrudTable;
