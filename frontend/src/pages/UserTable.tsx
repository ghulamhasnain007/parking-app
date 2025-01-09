// import CrudTable from '../components/CrudTable';
// import { useCrud } from '../hooks/useCrud';
// import { validateFields } from '../utils/validation';
// import { fakeData, usStates, type User } from '../components/makeData';
// import { useMemo, useState } from 'react';

// const api = {
//   fetch: async () => fakeData,
//   create: async (user: User) => Promise.resolve(user),
//   update: async (user: User) => Promise.resolve(user),
//   delete: async (id: string) => Promise.resolve(),
// };

// const UserTable = () => {
//   const { fetch, create, update, remove } = useCrud<User>('users', api);
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});

//   const columns = useMemo(() => [
//     { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
//     {
//       accessorKey: 'full_name',
//       header: 'User Name',
//       muiEditTextFieldProps: { required: true },
//     },
//     {
//       accessorKey: 'email',
//       header: 'Email',
//       muiEditTextFieldProps: { required: true },
//     },
//     {
//         accessorKey: 'state',
//         header: 'State',
//         muiEditTextFieldProps: {
//             select: true,
//             children: usStates.map((state) => (
//             <option key={state.value} value={state.value}>
//                 {state.label}
//             </option>
//             )),
//         },
//     }
//     // {
//     //   accessorKey: 'Email',
//     //   header: 'Email',
//     //   muiEditTextFieldProps: { required: true },
//     // },
//     // Other columns here...
//   ], []);

//   return (
//     <CrudTable
//       columns={columns}
//       data={fetch.data || []}
//       isLoading={fetch.isLoading}
//       onCreate={({ values, table }) => {
//         const errors = validateFields(values);
//         if (Object.keys(errors).length) {
//           setValidationErrors(errors);
//           return;
//         }
//         setValidationErrors({});
//         create.mutate(values);
//       }}
//       onUpdate={({ values }) => {
//         const errors = validateFields(values);
//         if (Object.keys(errors).length) {
//           setValidationErrors(errors);
//           return;
//         }
//         setValidationErrors({});
//         update.mutate(values);
//       }}
//       onDelete={(id) => remove.mutate(id)}
//       validationErrors={validationErrors}
//       setValidationErrors={setValidationErrors}
//     />
//   );
// };

// export default UserTable;







// import CrudTable from '../components/CrudTable';
// import { useCrud } from '../hooks/useCrud';
// import { validateFields } from '../utils/validation';
// import { fakeData, usStates, type User } from '../components/makeData';
// import { useMemo, useState } from 'react';

// const api = {
//   fetch: async () => fakeData,
//   create: async (user: User) => Promise.resolve(user),
//   update: async (user: User) => Promise.resolve(user),
//   delete: async (id: string) => Promise.resolve(),
// };

// const UserTable = () => {
//   const { fetch, create, update, remove } = useCrud<User>('users', api);
//   const [validationErrors, setValidationErrors] = useState<
//     Record<string, string | undefined>
//   >({});

//   const columns = useMemo(
//     () => [
//       { accessorKey: 'id', header: 'Id', enableEditing: false, size: 80 },
//       {
//         accessorKey: 'full_name',
//         header: 'User Name',
//         muiEditTextFieldProps: { required: true },
//       },
//       {
//         accessorKey: 'email',
//         header: 'Email',
//         muiEditTextFieldProps: { required: true },
//       },
//       {
//         accessorKey: 'state',
//         header: 'State',
//         muiEditTextFieldProps: {
//           select: true,
//           children: usStates.map((state) => (
//             <option key={state.value} value={state.value}>
//               {state.label}
//             </option>
//           )),
//         },
//       },
//     ],
//     []
//   );

//   return (
//     <CrudTable
//       columns={columns}
//       data={fetch.data || []}
//       isLoading={fetch.isLoading}
//       onCreate={({ values }: any) => {
//         const errors = validateFields(values);
//         if (Object.keys(errors).length) {
//           setValidationErrors(errors);
//           return;
//         }
//         setValidationErrors({});
//         create.mutate(values);
//       }}
//       onUpdate={({ values }:any) => {
//         const errors = validateFields(values);
//         if (Object.keys(errors).length) {
//           setValidationErrors(errors);
//           return;
//         }
//         setValidationErrors({});
//         update.mutate(values);
//       }}
//       onDelete={(id) => remove.mutate(id)}
//       validationErrors={validationErrors}
//       setValidationErrors={setValidationErrors}
//     />
//   );
// };

// export default UserTable;







import React, { useMemo, useState } from 'react';
import CrudTable from '../components/CrudTable';
import { useCrud } from '../hooks/useCrud';
import { validateFields } from '../utils/validation';
import { fakeData, usStates, type User } from '../components/makeData';
import { MRT_ColumnDef } from 'material-react-table';


const api = {
  fetch: async () => fakeData,
  create: async (user: User) => Promise.resolve(user),
  update: async (user: User) => Promise.resolve(user),
  delete: async (id: string) => Promise.resolve(),
};

const UserTable = () => {
  const { fetch, create, update, remove } = useCrud<User>('users', api);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => [
    { accessorKey: 'id', header: 'ID', enableEditing: false, size: 80 },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
      muiEditTextFieldProps: { required: true },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      muiEditTextFieldProps: { required: true },
    },
    {
      accessorKey: 'state',
      header: 'State',
      muiEditTextFieldProps: {
        select: true,
        children: usStates.map((state) => (
          <option key={state.value} value={state.value}>
            {state.label}
          </option>
        )),
      },
    },
  ], []);

  return (
    <CrudTable
      columns={columns}
      data={fetch.data || []}
      isLoading={fetch.isLoading}
      onCreate={async({ values }: any) => {
        const errors = validateFields(values);
        if (Object.keys(errors).length) {
          setValidationErrors(errors);
          return;
        }
        setValidationErrors({});
        await create.mutate(values);
      }}
      onUpdate={async({ values }:any) => {
        const errors = validateFields(values);
        if (Object.keys(errors).length) {
          setValidationErrors(errors);
          return;
        }
        setValidationErrors({});
        await update.mutate(values);
      }}
      onDelete={(id) => remove.mutate(id)}
      validationErrors={validationErrors}
      setValidationErrors={setValidationErrors}
    />
  );
};

export default UserTable;