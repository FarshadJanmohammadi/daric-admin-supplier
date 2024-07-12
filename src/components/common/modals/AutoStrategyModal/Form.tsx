import { weekDaysName } from '@/constant';
import useModalStore from '@/features/useModalStore';
import { FormEvent, useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import 'react-multi-date-picker/styles/backgrounds/bg-brown.css';
import Button from '../../Button';
import Input from '../../Inputs/Input';

interface IFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    inputs: Strategy.IAutoStrategyInputs;
    loading: boolean;
    side: 'buy' | 'sell';
    onCloseModal: () => void;
    setFieldValue: <K extends keyof Strategy.IAutoStrategyInputs>(
        name: K,
        value: Strategy.IAutoStrategyInputs[K],
    ) => void;
    setFieldsValue: (
        arg:
            | Partial<Strategy.IAutoStrategyInputs>
            | ((state: Strategy.IAutoStrategyInputs) => Partial<Strategy.IAutoStrategyInputs>),
    ) => void;
}

const Form = ({ onCloseModal, onSubmit, inputs, side, setFieldValue, loading }: IFormProps) => {
    const { t } = useTranslation();

    const [, setOpenCalender] = useState(false);

    const { toggleSelectStrategyModal } = useModalStore((state) => state);

    return (
        <form
            method='get'
            onSubmit={onSubmit}
            className='flex flex-col gap-36 bg-background-200 p-16 py-24 dark:bg-dark-background-200'
        >
            <div className='flex items-center gap-16'>
                <Input
                    type='number'
                    value={inputs.spread}
                    onChange={(v) => setFieldValue('spread', v)}
                    placeholder={side === 'buy' ? 'اسپرد خرید' : 'اسپرد فروش'}
                    postText='تومان'
                />

                <Input
                    type='number'
                    value={inputs.volume}
                    onChange={(v) => setFieldValue('volume', v)}
                    placeholder={side === 'buy' ? 'حجم خرید' : 'حجم فروش'}
                    postText='گرم'
                />
            </div>

            <div className='flex items-center gap-16'>
                <Input
                    type='number'
                    value={inputs.amountAlert}
                    onChange={(v) => setFieldValue('amountAlert', v)}
                    placeholder={side === 'buy' ? 'مقدار هشدار فروش' : 'مقدار هشدار خرید'}
                    postText='گرم'
                />

                <DatePicker
                    format='YYYY/MM/DD - HH:mm:ss'
                    render={(value, openCalendar) => {
                        return (
                            <Input
                                type='number'
                                onFocus={() => setOpenCalender(true)}
                                value={value}
                                onChange={(v) => setFieldValue('validity', v)}
                                placeholder='معتبر تا'
                                onClick={openCalendar}
                                // postText='گرم'
                            />
                        );
                    }}
                    calendar={persian}
                    locale={persian_fa}
                    containerClassName='flex-1 '
                    arrow={false}
                    portal
                    highlightToday
                    plugins={[<TimePicker position='bottom' />]}
                    weekDays={weekDaysName}
                    value={inputs.validity || ''}
                    onChange={(date) => {
                        setFieldValue('validity', date?.valueOf() as number);
                    }}
                />
            </div>

            <div className='flex items-center gap-16 pt-16'>
                <Button
                    onClick={() => {
                        onCloseModal();
                        toggleSelectStrategyModal({});
                    }}
                    loading={loading}
                    type='button'
                    className='btn-primary-outline w-4/12 rounded-md p-16 py-12'
                >
                    مرحله قبل
                </Button>
                <Button loading={loading} type='submit' className='btn-primary w-8/12 rounded-md p-16 py-12'>
                    {t('common.add')}
                </Button>
            </div>
        </form>
    );
};

export default Form;
