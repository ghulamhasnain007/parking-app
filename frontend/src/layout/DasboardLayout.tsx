// import React from 'react'
// import {
//     DashboardLayout,
//     ThemeSwitcher,
//     type SidebarFooterProps,
//   } from '@toolpad/core/DashboardLayout';
//   import { useDemoRouter } from '@toolpad/core/internal';
import { DashboardLayout } from "@toolpad/core/DashboardLayout"
import { Outlet } from 'react-router-dom'
 

export default function AdminLayout() {
  return (
    <DashboardLayout>
        <Outlet/>
    </DashboardLayout>
  )
}

// slots={{
//     appTitle: CustomAppTitle,
//     toolbarActions: ToolbarActionsSearch,
//     sidebarFooter: SidebarFooter,
// }}
// >
// <DemoPageContent pathname={router.pathname} />