import useModalStore from '@/features/useModalStore';
import { AnimatePresence } from 'framer-motion';
import AddEditSupplierModal from './AddEditSupplierModal';
import AutoStrategyModal from './AutoStrategyModal';
import ConfirmActivePanelModal from './ConfirmActivePanelModal';
import ManualStrategyModal from './ManualStrategyModal';
import OTPActivePanelModal from './OTPActivePanelModal';
import SelectStrategyModal from './SelectStrategyModal';

const Modals = () => {
    const {
        addSupplierModal,
        autoStrategyModal,
        selectStrategyModal,
        manualStrategyModal,
        confirmActivePanelModal,
        otpActivePanelModal,
    } = useModalStore((state) => state);

    return (
        <AnimatePresence>
            {addSupplierModal && <AddEditSupplierModal />}
            {selectStrategyModal && <SelectStrategyModal />}
            {manualStrategyModal && <ManualStrategyModal />}
            {autoStrategyModal && <AutoStrategyModal />}
            {confirmActivePanelModal && <ConfirmActivePanelModal />}
            {otpActivePanelModal && <OTPActivePanelModal />}
        </AnimatePresence>
    );
};

export default Modals;
