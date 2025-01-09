// import { lazy, Suspense, useMemo, useState } from 'react';
// import {
//   MRT_EditActionButtons,
//   MaterialReactTable,
//   // createRow,
//   type MRT_ColumnDef,
//   type MRT_Row,
//   type MRT_TableOptions,
//   useMaterialReactTable,
// } from 'material-react-table';
// import {
//   Box,
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from '@tanstack/react-query';
// import { type User, fakeData, usStates } from './makeData';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const Example = () => {
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});

//   const columns = useMemo<MRT_ColumnDef<User>[]>(
//     () => [
//       {
//         accessorKey: 'id',
//         header: 'Id',
//         enableEditing: false,
//         size: 80,
//       },
//       {
//         accessorKey: 'firstName',
//         header: 'First Name',
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.firstName,
//           helperText: validationErrors?.firstName,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               firstName: undefined,
//             }),
//           //optionally add validation checking for onBlur or onChange
//         },
//       },
//       {
//         accessorKey: 'lastName',
//         header: 'Last Name',
//         muiEditTextFieldProps: {
//           required: true,
//           error: !!validationErrors?.lastName,
//           helperText: validationErrors?.lastName,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               lastName: undefined,
//             }),
//         },
//       },
//       {
//         accessorKey: 'email',
//         header: 'Email',
//         muiEditTextFieldProps: {
//           type: 'email',
//           required: true,
//           error: !!validationErrors?.email,
//           helperText: validationErrors?.email,
//           //remove any previous validation errors when user focuses on the input
//           onFocus: () =>
//             setValidationErrors({
//               ...validationErrors,
//               email: undefined,
//             }),
//         },
//       },
//       {
//         accessorKey: 'state',
//         header: 'State',
//         editVariant: 'select',
//         editSelectOptions: usStates,
//         muiEditTextFieldProps: {
//           select: true,
//           error: !!validationErrors?.state,
//           helperText: validationErrors?.state,
//         },
//       },
//     ],
//     [validationErrors],
//   );

//   //call CREATE hook
//   const { mutateAsync: createUser, isPending: isCreatingUser } =
//     useCreateUser();
//   //call READ hook
//   const {
//     data: fetchedUsers = [],
//     isError: isLoadingUsersError,
//     isFetching: isFetchingUsers,
//     isLoading: isLoadingUsers,
//   } = useGetUsers();
//   //call UPDATE hook
//   const { mutateAsync: updateUser, isPending: isUpdatingUser } =
//     useUpdateUser();
//   //call DELETE hook
//   const { mutateAsync: deleteUser, isPending: isDeletingUser } =
//     useDeleteUser();

//   //CREATE action
//   const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
//     values,
//     table,
//   }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await createUser(values);
//     table.setCreatingRow(null); //exit creating mode
//   };

//   //UPDATE action
//   const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
//     values,
//     table,
//   }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await updateUser(values);
//     table.setEditingRow(null); //exit editing mode
//   };

//   //DELETE action
//   const openDeleteConfirmModal = (row: MRT_Row<User>) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       deleteUser(row.original.id);
//     }
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: fetchedUsers,
//     createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
//     editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
//     enableEditing: true,
//     getRowId: (row) => row.id,
//     muiToolbarAlertBannerProps: isLoadingUsersError
//       ? {
//           color: 'error',
//           children: 'Error loading data',
//         }
//       : undefined,
//     muiTableContainerProps: {
//       sx: {
//         minHeight: '500px',
//       },
//     },
//     onCreatingRowCancel: () => setValidationErrors({}),
//     onCreatingRowSave: handleCreateUser,
//     onEditingRowCancel: () => setValidationErrors({}),
//     onEditingRowSave: handleSaveUser,
//     //optionally customize modal content
//     renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Create New User</DialogTitle>
//         <DialogContent
//           sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
//         >
//           {internalEditComponents} {/* or render custom edit components here */}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     //optionally customize modal content
//     renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Edit User</DialogTitle>
//         <DialogContent
//           sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
//         >
//           {internalEditComponents} {/* or render custom edit components here */}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     renderRowActions: ({ row, table }) => (
//       <Box sx={{ display: 'flex', gap: '1rem' }}>
//         <Tooltip title="Edit">
//           <IconButton onClick={() => table.setEditingRow(row)}>
//             <EditIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Delete">
//           <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     ),
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Button
//         variant="contained"
//         onClick={() => {
//           table.setCreatingRow(true); //simplest way to open the create row modal with no default values
//           //or you can pass in a row object to set default values with the `createRow` helper function
//           // table.setCreatingRow(
//           //   createRow(table, {
//           //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
//           //   }),
//           // );
//         }}
//       >
//         Create New User
//       </Button>
//     ),
//     state: {
//       isLoading: isLoadingUsers,
//       isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
//       showAlertBanner: isLoadingUsersError,
//       showProgressBars: isFetchingUsers,
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// //CREATE hook (post new user to api)
// function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: User) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo: User) => {
//       queryClient.setQueryData(
//         ['users'],
//         (prevUsers: any) =>
//           [
//             ...prevUsers,
//             {
//               ...newUserInfo,
//               id: (Math.random() + 1).toString(36).substring(7),
//             },
//           ] as User[],
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// //READ hook (get users from api)
// function useGetUsers() {
//   return useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: async () => {
//       //send api request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve(fakeData);
//     },
//     refetchOnWindowFocus: false,
//   });
// }

// //UPDATE hook (put user in api)
// function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: User) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo: User) => {
//       queryClient.setQueryData(['users'], (prevUsers: any) =>
//         prevUsers?.map((prevUser: User) =>
//           prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//         ),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// //DELETE hook (delete user in api)
// function useDeleteUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (userId: string) => {
//       //send api update request here
//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (userId: string) => {
//       queryClient.setQueryData(['users'], (prevUsers: any) =>
//         prevUsers?.filter((user: User) => user.id !== userId),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }

// //react query setup in App.tsx
// const ReactQueryDevtoolsProduction = lazy(() =>
//   import('@tanstack/react-query-devtools/build/modern/production.js').then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// );

// const queryClient = new QueryClient();

// export default function CrudComponent() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Example />
//       <Suspense fallback={null}>
//         <ReactQueryDevtoolsProduction />
//       </Suspense>
//     </QueryClientProvider>
//   );
// }

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

// function validateUser(user: User) {
//   return {
//     firstName: !validateRequired(user.firstName)
//       ? 'First Name is Required'
//       : '',
//     lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
//     email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
//   };
// }


// import { lazy, Suspense, useMemo, useState } from 'react';
// import {
//   MRT_EditActionButtons,
//   MaterialReactTable,
//   type MRT_ColumnDef,
//   type MRT_Row,
//   type MRT_TableOptions,
//   useMaterialReactTable,
// } from 'material-react-table';
// import {
//   Box,
//   Button,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import {
//   QueryClient,
//   QueryClientProvider,
//   useMutation,
//   useQuery,
//   useQueryClient,
// } from '@tanstack/react-query';
// import { type User, fakeData, usStates } from './makeData';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios' 

// const Example = () => {
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});

//   const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
//     {
//       accessorKey: 'id',
//       header: 'Id',
//       enableEditing: false,
//       size: 80,
//     },
//     {
//       accessorKey: 'firstName',
//       header: 'First Name',
//       muiEditTextFieldProps: {
//         required: true,
//         error: !!validationErrors?.firstName,
//         helperText: validationErrors?.firstName,
//         onFocus: () =>
//           setValidationErrors({
//             ...validationErrors,
//             firstName: undefined,
//           }),
//       },
//     },
//     {
//       accessorKey: 'lastName',
//       header: 'Last Name',
//       muiEditTextFieldProps: {
//         required: true,
//         error: !!validationErrors?.lastName,
//         helperText: validationErrors?.lastName,
//         onFocus: () =>
//           setValidationErrors({
//             ...validationErrors,
//             lastName: undefined,
//           }),
//       },
//     },
//     {
//       accessorKey: 'email',
//       header: 'Email',
//       muiEditTextFieldProps: {
//         type: 'email',
//         required: true,
//         error: !!validationErrors?.email,
//         helperText: validationErrors?.email,
//         onFocus: () =>
//           setValidationErrors({
//             ...validationErrors,
//             email: undefined,
//           }),
//       },
//     },
//     {
//       accessorKey: 'state',
//       header: 'State',
//       editVariant: 'select',
//       editSelectOptions: usStates,
//       muiEditTextFieldProps: {
//         select: true,
//         error: !!validationErrors?.state,
//         helperText: validationErrors?.state,
//       },
//     },
//   ], [validationErrors]);

//   // Create, Read, Update, and Delete hooks
//   const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
//   const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
//   const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
//   const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

//   // CREATE action
//   const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, table }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await createUser(values);
//     table.setCreatingRow(null); // exit creating mode
//   };

//   // UPDATE action
//   const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({ values, table }) => {
//     const newValidationErrors = validateUser(values);
//     if (Object.values(newValidationErrors).some((error) => error)) {
//       setValidationErrors(newValidationErrors);
//       return;
//     }
//     setValidationErrors({});
//     await updateUser(values);
//     table.setEditingRow(null); // exit editing mode
//   };

//   // DELETE action
//   const openDeleteConfirmModal = (row: MRT_Row<User>) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       deleteUser(row.original.id);
//     }
//   };

//   const table = useMaterialReactTable({
//     columns,
//     data: fetchedUsers,
//     createDisplayMode: 'modal',
//     editDisplayMode: 'modal',
//     enableEditing: true,
//     getRowId: (row) => row.id,
//     muiToolbarAlertBannerProps: isLoadingUsersError
//       ? {
//           color: 'error',
//           children: 'Error loading data',
//         }
//       : undefined,
//     muiTableContainerProps: {
//       sx: {
//         minHeight: '500px',
//       },
//     },
//     onCreatingRowCancel: () => setValidationErrors({}),
//     onCreatingRowSave: handleCreateUser,
//     onEditingRowCancel: () => setValidationErrors({}),
//     onEditingRowSave: handleSaveUser,
//     renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Create New User</DialogTitle>
//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//           {internalEditComponents}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
//       <>
//         <DialogTitle variant="h3">Edit User</DialogTitle>
//         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
//           {internalEditComponents}
//         </DialogContent>
//         <DialogActions>
//           <MRT_EditActionButtons variant="text" table={table} row={row} />
//         </DialogActions>
//       </>
//     ),
//     renderRowActions: ({ row, table }) => (
//       <Box sx={{ display: 'flex', gap: '1rem' }}>
//         <Tooltip title="Edit">
//           <IconButton onClick={() => table.setEditingRow(row)}>
//             <EditIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Delete">
//           <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       </Box>
//     ),
//     renderTopToolbarCustomActions: ({ table }) => (
//       <Button
//         variant="contained"
//         onClick={() => {
//           table.setCreatingRow(true);
//         }}
//       >
//         Create New User
//       </Button>
//     ),
//     state: {
//       isLoading: isLoadingUsers,
//       isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
//       showAlertBanner: isLoadingUsersError,
//       showProgressBars: isFetchingUsers,
//     },
//   });

//   return <MaterialReactTable table={table} />;
// };

// // Create hook (post new user to API)
// function useCreateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: User) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
//       return Promise.resolve();
//     },
//     onMutate: (newUserInfo: User) => {
//       queryClient.setQueryData(
//         ['users'],
//         (prevUsers: any) =>
//           [
//             ...prevUsers,
//             {
//               ...newUserInfo,
//               id: (Math.random() + 1).toString(36).substring(7),
//             },
//           ] as User[],
//       );
//     },
//   });
// }

// // Read hook (get users from API)
// function useGetUsers() {
//   return useQuery<User[]>({
//     queryKey: ['users'],
//     queryFn: async () => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
//       return Promise.resolve(fakeData);
//     },
//     refetchOnWindowFocus: false,
//   });
// }
// // async function useGetUsers(){
// //     const response = await axios.get('http://localhost:8000/api/user/all')
// //     return response
// // }

// // Update hook (put user in API)
// function useUpdateUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user: User) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
//       return Promise.resolve();
//     },
//     onMutate: (newUserInfo: User) => {
//       queryClient.setQueryData(['users'], (prevUsers: any) =>
//         prevUsers?.map((prevUser: User) =>
//           prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//         ),
//       );
//     },
//   });
// }

// // Delete hook (delete user in API)
// function useDeleteUser() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (userId: string) => {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
//       return Promise.resolve();
//     },
//     onMutate: (userId: string) => {
//       queryClient.setQueryData(['users'], (prevUsers: any) =>
//         prevUsers?.filter((user: User) => user.id !== userId),
//       );
//     },
//   });
// }

// // React Query setup in App.tsx
// const ReactQueryDevtoolsProduction = lazy(() =>
//   import('@tanstack/react-query-devtools/build/modern/production.js').then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     }),
//   ),
// );

// const queryClient = new QueryClient();

// export default function CrudComponent() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Example />
//       <Suspense fallback={null}>
//         <ReactQueryDevtoolsProduction />
//       </Suspense>
//     </QueryClientProvider>
//   );
// }

// const validateRequired = (value: string) => !!value.length;
// const validateEmail = (email: string) =>
//   !!email.length &&
//   email
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//     );

// function validateUser(user: User) {
//   const errors: Record<string, string | undefined> = {};

//   if (!validateRequired(user.firstName)) errors.firstName = 'First name is required';
//   if (!validateRequired(user.lastName)) errors.lastName = 'Last name is required';
//   if (!validateEmail(user.email)) errors.email = 'Invalid email';
//   if (!validateRequired(user.state)) errors.state = 'State is required';

//   return errors;
// }

// export const fakeData = [
//   {
//     id: '1',
//     firstName: 'John',
//     lastName: 'Doe',
//     email: 'johndoe@example.com',
//     state: 'California',
//   },
//   {
//     id: '2',
//     firstName: 'Jane',
//     lastName: 'Doe',
//     email: 'janedoe@example.com',
//     state: 'New York',
//   },
// ];

// export const usStates = ['California', 'New York', 'Texas', 'Florida'];





import { lazy, Suspense, useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { type User, usStates } from './makeData';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    {
      accessorKey: 'id',
      header: 'Id',
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.firstName,
        helperText: validationErrors?.firstName,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            firstName: undefined,
          }),
      },
    },
    // {
    //   accessorKey: 'firstName',
    //   header: 'First Name',
    //   muiEditTextFieldProps: {
    //     required: true,
    //     error: !!validationErrors?.firstName,
    //     helperText: validationErrors?.firstName,
    //     onFocus: () =>
    //       setValidationErrors({
    //         ...validationErrors,
    //         firstName: undefined,
    //       }),
    //   },
    // },
    // {
    //   accessorKey: 'lastName',
    //   header: 'Last Name',
    //   muiEditTextFieldProps: {
    //     required: true,
    //     error: !!validationErrors?.lastName,
    //     helperText: validationErrors?.lastName,
    //     onFocus: () =>
    //       setValidationErrors({
    //         ...validationErrors,
    //         lastName: undefined,
    //       }),
    //   },
    // },
    {
      accessorKey: 'email',
      header: 'Email',
      muiEditTextFieldProps: {
        type: 'email',
        required: true,
        error: !!validationErrors?.email,
        helperText: validationErrors?.email,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            email: undefined,
          }),
      },
    },
    {
      accessorKey: 'state',
      header: 'State',
      editVariant: 'select',
      editSelectOptions: usStates,
      muiEditTextFieldProps: {
        select: true,
        error: !!validationErrors?.state,
        helperText: validationErrors?.state,
      },
    },
  ], [validationErrors]);

  // Create, Read, Update, and Delete hooks with actual API calls
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  // CREATE action
  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null); // exit creating mode
  };

  // UPDATE action
  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); // exit editing mode
  };

  // DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

// Create hook (post new user to API)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      await axios.post('http://localhost:8000/api/users', user); // Your API endpoint here
    },
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(
        ['users'],
        (prevUsers: any) =>
          [
            ...prevUsers,
            {
              ...newUserInfo,
              id: (Math.random() + 1).toString(36).substring(7), // simulate id
            },
          ] as User[],
      );
    },
  });
}

// Read hook (get users from your API)
function useGetUsers() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/user/all'); // Your API endpoint here
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}

// Update hook (put user to API)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: User) => {
      await axios.put(`/api/user/${user.id}/update`, user); // Your API endpoint here
    },
    onMutate: (newUserInfo: User) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.map((prevUser: User) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
  });
}

// Delete hook (delete user from API)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(`/api/users/${userId}`); // Your API endpoint here
    },
    onMutate: (userId: string) => {
      queryClient.setQueryData(['users'], (prevUsers: any) =>
        prevUsers?.filter((user: User) => user.id !== userId),
      );
    },
  });
}

// React Query setup in App.tsx
const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

const queryClient = new QueryClient();

export default function CrudComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <Suspense fallback={null}>
        <ReactQueryDevtoolsProduction />
      </Suspense>
    </QueryClientProvider>
  );
}

const validateRequired = (value: string) => !!value.length;
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

function validateUser(user: User) {
  const errors: Record<string, string | undefined> = {};

  if (!validateRequired(user.full_name)) errors.firstName = 'First name is required';
//   if (!validateRequired(user.lastName)) errors.lastName = 'Last name is required';
  if (!validateEmail(user.email)) errors.email = 'Invalid email';
  if (!validateRequired(user.state)) errors.state = 'State is required';

  return errors;
}
