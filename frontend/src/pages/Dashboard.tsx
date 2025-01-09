// import * as React from 'react';
// import { extendTheme, styled } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { PageContainer } from '@toolpad/core/PageContainer';
// import Grid from '@mui/material/Grid2';

// const NAVIGATION: Navigation = [
//   {
//     kind: 'header',
//     title: 'Main items',
//   },
//   {
//     segment: 'dashboard',
//     title: 'Dashboard',
//     icon: <DashboardIcon />,
//   },
//   {
//     segment: 'home',
//     title: 'Home',
//     icon: <ShoppingCartIcon />,
//     // action: 
//   },
//   {
//     kind: 'divider',
//   },
//   {
//     kind: 'header',
//     title: 'Analytics',
//   },
//   {
//     segment: 'reports',
//     title: 'Reports',
//     icon: <BarChartIcon />,
//     children: [
//       {
//         segment: 'sales',
//         title: 'Sales',
//         icon: <DescriptionIcon />,
//       },
//       {
//         segment: 'traffic',
//         title: 'Traffic',
//         icon: <DescriptionIcon />,
//       },
//     ],
//   },
//   {
//     segment: 'integrations',
//     title: 'Integrations',
//     icon: <LayersIcon />,
//   },
// ];

// const demoTheme = extendTheme({
//   colorSchemes: { light: true, dark: true },
//   colorSchemeSelector: 'class',
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function useDemoRouter(initialPath: string): Router {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path: string | URL) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

// const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
//   backgroundColor: theme.palette.action.hover,
//   borderRadius: theme.shape.borderRadius,
//   height,
//   content: '" "',
// }));

// export default function DashboardLayoutBasic(props: any) {
//   const { window } = props;

//   const router = useDemoRouter('/dashboard');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window ? window() : undefined;

//   return (
//     <AppProvider
//       navigation={NAVIGATION}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         <PageContainer>
//           <Grid container spacing={1}>
//             <Grid size={5} />
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>
//             <Grid size={4}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={8}>
//               <Skeleton height={100} />
//             </Grid>

//             <Grid size={12}>
//               <Skeleton height={150} />
//             </Grid>
//             <Grid size={12}>
//               <Skeleton height={14} />
//             </Grid>

//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//             <Grid size={3}>
//               <Skeleton height={100} />
//             </Grid>
//           </Grid>
//         </PageContainer>
//       </DashboardLayout>
//     </AppProvider>
//   );
// }

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import {Routes, Route} from 'react-router-dom'
// import { useDemoRouter } from '@toolpad/core/internal';
// import Home from './Home';
// import Lot from '../components/Lot';

// const demoTheme = createTheme({
//   cssVariables: {
//     colorSchemeSelector: 'data-toolpad-color-scheme',
//   },
//   colorSchemes: { light: true, dark: true },
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 600,
//       md: 600,
//       lg: 1200,
//       xl: 1536,
//     },
//   },
// });

// function DemoPageContent({ pathname }: { pathname: string }) {
//   return (
//     <Box
//       sx={{
//         py: 4,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Typography>Dashboard content for {pathname}</Typography>
//     </Box>
//   );
// }

// interface DemoProps {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   window?: () => Window;
// }

// export default function DashboardLayoutNavigationDividers(props: DemoProps) {
//   const { window } = props;

//   const router = useDemoRouter('/star-wars');

//   // Remove this const when copying and pasting into your project.
//   const demoWindow = window !== undefined ? window() : undefined;

//   return (
//     // preview-start
//     <AppProvider
//       navigation={[
//         {
//           segment: 'star-wars',
//           title: 'Star Wars',
//           icon: <DescriptionIcon />,
//         },
//         { kind: 'divider' },
//         {
//           segment: 'eagle',
//           title: 'Eagle',
//           icon: <DescriptionIcon />,
//         },
//       ]}
//       router={router}
//       theme={demoTheme}
//       window={demoWindow}
//     >
//       <DashboardLayout>
//         {/* <DemoPageContent pathname={router.pathname} /> */}
//         <Routes>
//             <Route path='/' element={<Home/>}/>
//             <Route path='lot' element={<Lot/>}/>            
//         </Routes>
//       </DashboardLayout>
//     </AppProvider>
//     // preview-end
//   );
// }

// import React from 'react'

export default function Dashboard() {
  return (
    <div>Dashboard</div>
  )
}
