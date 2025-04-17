import styles from './index.module.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {Helmet} from "react-helmet-async";
import {PROJECT_NAME} from "@/constants/business.ts";

export const NotFound = () => {

    return (
        <div className={styles.container}>
            <Helmet><title>{PROJECT_NAME} - Página no encontrada</title></Helmet>
            <InfoOutlinedIcon className={styles.infoIcon} />
            <p>Página no encontrada</p>
            <span>Parece que la sección a la que intentas acceder no existe o no está disponible</span>
        </div>
    )
}
