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
    supplier: {
        add: createRoute('DASHBOARD_API', 'api/Seller/Admin/AddSeller'),
        getAll: createRoute('DASHBOARD_API', 'Admin/GetActivePanels'),
    },

    auth: {
        login: createRoute('DASHBOARD_API', 'Login'),
    },
};

export default routes;
