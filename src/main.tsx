import {GlobalNotification} from "@/layouts/globalNotification";

;import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/global.scss'
import App from './app.tsx'
import {Provider} from "react-redux";
import { store, persistor } from '@/store/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import {HelmetProvider} from "react-helmet-async";
import {SideMenu} from "@/layouts/sideMenu";
import {LoaderPage} from "@/containers/components/loaderPage";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import 'moment/dist/locale/es';
import {BottomMenu} from "@/layouts/bottomMenu";
import { BrowserRouter as Router } from 'react-router-dom';
import Moment from "moment";
const queryClient = new QueryClient();

Moment.locale('es');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={<LoaderPage />} persistor={persistor}>
            <Router>
                <HelmetProvider>
                    <div className={"principalContainer"}>
                        <SideMenu/>
                        <BottomMenu/>
                        <div id={"principalContent"} className={"principalContent"}>
                            <App/>
                        </div>
                    </div>
                    <LoaderPage/>
                    <GlobalNotification />
                    <div id="modal-root" className="modalRoot"></div>
                </HelmetProvider>
                </Router>
            </PersistGate>
        </Provider>
      </QueryClientProvider>
  </StrictMode>
,
)
