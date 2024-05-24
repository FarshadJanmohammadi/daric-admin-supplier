import useModalStore from '@/features/useModalStore';
import { AnimatePresence } from 'framer-motion';
import AddEditSupplierModal from './AddEditSupplierModal';

const Modals = () => {
    const { addSupplierModal } = useModalStore((state) => state);

    return <AnimatePresence>{addSupplierModal && <AddEditSupplierModal />}</AnimatePresence>;
};

export default Modals;
