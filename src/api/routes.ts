/* Routes */
const BASE_ROUTE = {
    DASHBOARD_API: window.api.API_PATH,
};

/* Functions */
const createRoute = (origin: keyof typeof BASE_ROUTE, pathname: string): string => {
    const url = new URL(BASE_ROUTE[origin] + '/' + pathname);
    return url.href;
};

const routes = {
    Supplier: {
        add: createRoute('DASHBOARD_API', 'api/Seller/Admin/AddSeller'),
    },
};

export default routes;
