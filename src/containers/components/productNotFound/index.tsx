import styles from './index.module.scss';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ProductNotFound = (props: {label?: string, extraLabel?: string, absolute?: boolean, small?: boolean}) => {

    return (
        <div className={`${props.small ? styles.smallContainer : styles.container}`} style={props.absolute ? {position: "absolute"} : undefined}>
            <InfoOutlinedIcon className={styles.infoIcon} />
            <p>{props.label ?? "No encontramos el producto"}</p>
            <span>{props.extraLabel}</span>
        </div>
    )
}
