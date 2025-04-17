import styles from "./loader-page.module.scss";
import {useSelector} from "react-redux";
import {getAppState} from "@/store/slices/appStateSlice.tsx";
import {Loader} from "@/containers/components/loader";

export const LoaderPage = (props: {forceLoad?: boolean}) => {
    const appState = useSelector(getAppState);
    return (
        <>
            {(appState.loading || props.forceLoad) &&
            <div className={styles.loaderPage}>
                <div className={styles.loaderPageContent}>
                    <Loader />
                    {
                        appState.loadingLabel && <p>{appState.loadingLabel}</p>
                    }
                </div>
            </div>}
        </>
    );
};
