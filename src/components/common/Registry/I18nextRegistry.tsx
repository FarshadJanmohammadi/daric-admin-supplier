import i18n from '@/i18n';
import React from 'react';
import { I18nextProvider } from 'react-i18next';

interface I18nextRegistryProps {
    children: React.ReactNode;
}

const I18nextRegistry = ({ children }: I18nextRegistryProps) => {
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nextRegistry;
