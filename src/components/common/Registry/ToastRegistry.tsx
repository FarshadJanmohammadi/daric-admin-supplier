import { ToastContainer } from 'react-toastify';

const ToastRegistry = () => {
    return (
        <ToastContainer
            hideProgressBar
            closeOnClick
            rtl
            theme='colored'
            position='bottom-left'
            toastClassName='shadow-sm'
            newestOnTop={false}
            closeButton={false}
            pauseOnFocusLoss={false}
            autoClose={2500}
            limit={3}
        />
    );
};

export default ToastRegistry;
