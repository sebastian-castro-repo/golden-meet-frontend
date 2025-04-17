import { Routes, Route } from "react-router-dom";
import {useSelector} from "react-redux";
import {getLoggedUser} from "@/store/slices/globalConfigSlice.tsx";
import {PAGES} from "@/constants/pages.ts";
import usePermissions from "@/hooks/usePermissions.tsx";
import {NotFound} from "@/layouts/notFound";
import {Suspense} from "react";
import {LoaderPage} from "@/containers/components/loaderPage";

const AppRoutes = () => {
    const loggedUser = useSelector(getLoggedUser);
    const {authorized, onlyEmailsAuth} = usePermissions();

    return (
        <Suspense fallback={<LoaderPage forceLoad />}>
            <Routes>
                {
                    PAGES.filter((p) => p.component && p.enabled && onlyEmailsAuth(loggedUser, p.code)).map((page) => (
                            <Route key={`page-${page.code}`} path={page.path} element={authorized(loggedUser, page.code) ? <page.component /> : <NotFound />}>
                                {
                                    page.subPaths && page.subPaths.map((subPath) => (
                                        <Route key={`sub-page-${page.code}`} path={page.path + subPath} element={authorized(loggedUser, page.code) ? <page.component /> : <NotFound />}/>
                                    ))
                                }
                            </Route>
                        )
                    )
                }

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
