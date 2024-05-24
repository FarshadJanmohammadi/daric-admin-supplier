import Input from '@/components/common/Inputs/Input';
import { IAddSupplierModal } from '@/features/useModalStore';
import Select from '../../Inputs/Select';

interface IFormProps {
    inputs: SuppliersManage.IAddEditSupplierInputs;
    setInputs: (
        arg:
            | Partial<SuppliersManage.IAddEditSupplierInputs>
            | ((state: SuppliersManage.IAddEditSupplierInputs) => Partial<SuppliersManage.IAddEditSupplierInputs>),
    ) => void;
    setInput: <K extends keyof SuppliersManage.IAddEditSupplierInputs>(
        name: K,
        value: SuppliersManage.IAddEditSupplierInputs[K],
    ) => void;
    setAddSupplierModal: (state: IAddSupplierModal | null) => void;
    onCloseModal: () => void;
}

const Form = ({ inputs, setInput, onCloseModal }: IFormProps) => {
    return (
        <div className='flex flex-col gap-24 bg-background-200 p-16 py-24 dark:bg-dark-background-200'>
            <Input
                value={inputs.supplierName}
                onChange={(v) => setInput('supplierName', v)}
                id='supplierNameInput'
                placeholder='نام تامین‌کنندگان'
            />
            <div className='flex items-center gap-16'>
                <Input
                    value={inputs.nationalCode}
                    onChange={(v) => setInput('nationalCode', v)}
                    id='nationalCodeInput'
                    placeholder='کدملی'
                />
                <Input
                    value={inputs.mobileNumber}
                    onChange={(v) => setInput('mobileNumber', v)}
                    id='mobileNumberInput'
                    placeholder='شماره همراه'
                />
            </div>
            <div className='flex items-center gap-16'>
                <Input
                    value={inputs.guarantee}
                    onChange={(v) => setInput('guarantee', v)}
                    id='guaranteeInput'
                    placeholder='سقف مجاز'
                />
                <Input
                    value={inputs.cardNumber}
                    onChange={(v) => setInput('cardNumber', v)}
                    id='cardNumberInput'
                    placeholder='شماره ثبت'
                />
            </div>
            <div className='flex items-center gap-16'>
                <Select placeholder='نوع فعالسازی' options={['فعال', 'غیرفعال']} />
                <Select placeholder='وضعیت' options={['مجاز', 'غیرمجاز']} />
            </div>

            <div className='flex items-center gap-16 pt-16'>
                <button
                    onClick={onCloseModal}
                    className=' rounded-md border border-brand-200 px-32 py-10 text-base font-semibold text-brand-200 dark:border-r-dark-brand-200 dark:text-dark-brand-200'
                >
                    انصراف
                </button>
                <button className='flex-1 rounded-md border border-transparent bg-brand-200 px-16 py-10 text-base font-semibold  text-dark-text-100 dark:bg-dark-brand-200'>
                    افزودن
                </button>
            </div>
        </div>
    );
};

export default Form;
