import styles from "./index.module.scss"
import {version} from '@/../package.json';

export const SideMenu = () => {

    return (
        <div className={styles.container}>
            <p className={styles.version}>Versión {version}</p>
        </div>
    )
}
