import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import Modals from '../modals/Modals';
import Footer from './Footer';
import Header from './Header';
import Authentication from './Middlewares/Authentication';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <Authentication>
            <ErrorBoundary>
                <div className='min-w-screen flex min-h-screen'>
                    <Sidebar />
                    <div className='flex min-h-full flex-1 flex-col'>
                        <Header />
                        <div className='flex flex-1 bg-background-100 p-16 dark:bg-dark-background-100'>
                            <Outlet />
                        </div>
                        <Footer />
                    </div>
                </div>
                <Modals />
            </ErrorBoundary>
        </Authentication>
    );
};

export default Layout;
