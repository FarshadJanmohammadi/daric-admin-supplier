import Splashscreen from '@/components/common/layout/Middlewares/Splashscreen';
import QueryClientRegistry from '@/components/common/Registry/QueryClientRegistry';
import RoutesRegistry from '@/components/common/Registry/RoutesRegistry';
import AppContextProvider from '@/contexts/AppContext';
import React from 'react';
import ReactDOM from 'react-dom/client';
import I18nextRegistry from './components/common/Registry/I18nextRegistry';
import ToastRegistry from './components/common/Registry/ToastRegistry';

// Styles
import '@/assets/styles/app.scss';
import '@/assets/styles/libs.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientRegistry>
            <I18nextRegistry>
                <AppContextProvider>
                    <Splashscreen>
                        <ToastRegistry>
                            <RoutesRegistry />
                        </ToastRegistry>
                    </Splashscreen>
                </AppContextProvider>
            </I18nextRegistry>
        </QueryClientRegistry>
    </React.StrictMode>,
);
