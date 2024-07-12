import useModalStore from '@/features/useModalStore';
import routes from '@/routes';
import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Button';
import Modal, { Header } from '../Modal';
// import Form from './Form';

interface IConfirmLogoutModalModalProps extends IBaseModalConfiguration {}

const ConfirmLogoutModal = forwardRef<HTMLDivElement, IConfirmLogoutModalModalProps>((props, ref) => {
    const navigate = useNavigate();

    const { confirmLogoutModal, toggleConfirmLogoutModal } = useModalStore((state) => state);

    const onCloseModal = () => {
        toggleConfirmLogoutModal(null);
    };

    return (
        <Modal moveable={confirmLogoutModal?.moveable} size='sm' onClose={onCloseModal} ref={ref} {...props}>
            <div className='flex flex-col'>
                <Header label='خروج از حساب' onClose={onCloseModal} />

                <div className='flex flex-col gap-32 bg-background-200 p-16 py-24 dark:bg-dark-background-200'>
                    <span className='text-base font-medium text-text-100 dark:text-dark-text-100'>
                        آیا می خواهید از حساب کاربری خود خارج شوید؟
                    </span>

                    <div className='flex items-center gap-16 pt-16'>
                        <Button
                            onClick={() => {
                                onCloseModal();
                            }}
                            type='button'
                            className='w-4/12 rounded-md border border-error-300 bg-transparent p-16 py-12 text-text-100 dark:border-dark-error-300 dark:text-dark-text-100'
                        >
                            انصراف
                        </Button>
                        <Button
                            onClick={() => {
                                onCloseModal();
                                navigate(routes.auth.logout);
                            }}
                            type='button'
                            className='w-8/12 rounded-md bg-error-300 p-16 py-12 text-dark-text-100 dark:bg-dark-error-300 dark:text-dark-text-100'
                        >
                            خروج
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
});

export default ConfirmLogoutModal;
