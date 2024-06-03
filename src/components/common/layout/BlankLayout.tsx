import ErrorBoundary from 'components/common/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import Authentication from './Middlewares/Authentication';

const BlankLayout = () => {
    return (
        <Authentication>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </Authentication>
    );
};

export default BlankLayout;
