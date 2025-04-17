import moment from "moment";
import useStringUtils from "../../hooks/useStringUtils";
import styles from './index.module.scss';
import {PROJECT_NAME} from "@/constants/business.ts";
import {useDispatch, useSelector} from "react-redux";
import {getActiveConfig, getLoggedUser, setConfig} from "@/store/slices/globalConfigSlice.tsx";
import usePermissions from "@/hooks/usePermissions.tsx";
import {Helmet} from "react-helmet-async";


export const HomePage = () => {
    const loggedUser = useSelector(getLoggedUser);
    const {firstCapitalLetterBetweenSpaces} = useStringUtils();
    const {checkToken} = usePermissions();
    const dispatch = useDispatch();
    const actualConfig = useSelector(getActiveConfig)

    return (
        <div className={styles.container}>
            <Helmet><title>{PROJECT_NAME} - Inicio</title></Helmet>
            <div className={styles.topContainer}>
                <div>
                    {
                        checkToken(loggedUser) ?
                            <h1>Hola, {loggedUser.username}</h1> :
                            <h1>Bienvenido</h1>
                    }
                    <p>{firstCapitalLetterBetweenSpaces(moment().format("dddd DD [de] MMMM [de] YYYY"), 'de')}</p>
                </div>
                <button onClick={() => dispatch(setConfig({theme: actualConfig.theme === 'dark' ? 'light' : 'dark'}))}>Toggle theme</button>
            </div>
        </div>
    )
}
