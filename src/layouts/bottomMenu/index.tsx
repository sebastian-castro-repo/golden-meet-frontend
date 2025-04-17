import { useEffect, useState} from "react"
import styles from "./index.module.scss"
import {PAGES} from "@/constants/pages.ts";
import usePermissions from "../../hooks/usePermissions";
import {useSelector} from "react-redux";
import {getLoggedUser} from "@/store/slices/globalConfigSlice.tsx";
import {version} from '@/../package.json';
import { Link, useLocation } from "react-router-dom";

export const BottomMenu = () => {
    const loggedUser = useSelector(getLoggedUser);
    const location = useLocation();
    const [actualLocation, setActualLocation] = useState<string>("");
    const {authorized} = usePermissions();

    useEffect(() => {
        setActualLocation(location.pathname);
    }, [location]);
    return (
        <div className={styles.container}>
            <div className={styles.pages}>
                {
                    PAGES?.filter((p) => p.showMobile && p.enabled && authorized(loggedUser, p.code))?.map((page, index) => {
                        return (
                            <Link
                                key={`page-mobile-${page}-${index}`}
                                className={`${styles.pageItem} ${(
                                    new RegExp(`^${page.path}(/|$)`).test(actualLocation) ||
                                    new RegExp(`^${page.secondActiveUrl}(/|$)`).test(actualLocation)) && styles.activePageItem}`}
                                to={page.path ?? '/'}
                            >
                                {
                                    (page.iconActive &&
                                        new RegExp(`^${page.path}(/|$)`).test(actualLocation) ||
                                        new RegExp(`^${page.secondActiveUrl}(/|$)`).test(actualLocation)) ?
                                        <img src={page.iconActive}/> :
                                        page.icon && <img src={page.icon}/>
                                }
                                <p>
                                    {page.mobileName}
                                    {
                                        page.secondActiveSubName && new RegExp(`^${page.secondActiveUrl}(/|$)`).test(actualLocation) &&
                                        <span>({page.secondActiveSubName})</span>
                                    }
                                </p>
                            </Link>
                        )
                    })
                }
            </div>
            <p className={styles.version}>Versión {version}</p>
        </div>
    )
}
