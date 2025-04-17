import styles from './index.module.scss';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
export const NotContent = (props:{
    text?: string,
    retryText?: string,
    handleRetry?: any,
    marginTop?: string
}) => {
    return (
        <div className={styles.container} style={{marginTop: `${props.marginTop ? props.marginTop : "128px"}`}}>
            <p>{props.text ? props.text : "No se encontró información"}</p>
            {
                props.handleRetry && <div>
                <button onClick={props.handleRetry}><CachedOutlinedIcon className={styles.reloadIcon}/>{props.retryText ? props.retryText : "Reintentar"}</button>
                </div>
            }
        </div>
    )
}