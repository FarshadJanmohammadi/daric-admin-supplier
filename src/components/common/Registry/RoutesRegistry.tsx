import Dashboard from '@/pages/Dashboard';
import Sessions from '@/pages/Sessions';
import SupplierManage from '@/pages/SupplierManage';
import pagesRoutes from '@/routes';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';

const RoutesRegistry = () => {
    const [router] = useState(
        createBrowserRouter([
            {
                element: <Layout />,
                children: [
                    {
                        element: <Dashboard />,
                        path: pagesRoutes.dashboard,
                    },
                    {
                        element: <SupplierManage />,
                        path: pagesRoutes.supplierManage,
                    },
                    {
                        element: <Sessions />,
                        path: pagesRoutes.sessions,
                    },
                ],
            },
        ]),
    );

    return <RouterProvider router={router} />;
};

export default RoutesRegistry;
