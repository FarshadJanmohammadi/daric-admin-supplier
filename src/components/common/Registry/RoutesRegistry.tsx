import { Dashboard, Login, Logout } from '@/pages';
import MarketLive from '@/pages/MarketLive';
import MarketMonitoring from '@/pages/MarketMonitoring';
import Suppliers from '@/pages/Suppliers';
import TelephoneTrades from '@/pages/TelephoneTrades';
import TradesHistories from '@/pages/TradesHistories';
import pagesRoutes from '@/routes';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout';
import BlankLayout from '../layout/BlankLayout';

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
                        element: <Suppliers />,
                        path: pagesRoutes.suppliers,
                    },
                    {
                        element: <MarketLive />,
                        path: pagesRoutes.marketLive,
                    },
                    {
                        element: <MarketMonitoring />,
                        path: pagesRoutes.marketMonitoring,
                    },
                    {
                        element: <TradesHistories />,
                        path: pagesRoutes.tradesHistories,
                    },
                    {
                        element: <TelephoneTrades />,
                        path: pagesRoutes.telephoneTrades,
                    },
                ],
            },
            {
                element: <BlankLayout />,
                children: [
                    {
                        element: <Login />,
                        path: pagesRoutes.auth.login,
                    },
                    {
                        element: <Logout />,
                        path: pagesRoutes.auth.logout,
                    },
                ],
            },
        ]),
    );

    return <RouterProvider router={router} />;
};

export default RoutesRegistry;
