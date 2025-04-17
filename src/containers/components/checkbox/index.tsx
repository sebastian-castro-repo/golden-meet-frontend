import styles from "./index.module.scss";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export const Checkbox = (props:{
    checked: boolean,
    onCheck: any,
    text: string,
    textLeft?: boolean,
    customInputClass?: any,
    customLabelClass?: any,
}) => {
    return (
        <div className={styles.container}>
            <input type="checkbox" id="autoAddCheck" checked={props.checked} className={styles.checkBtnDefault} />
            {
                props.textLeft &&
                <label
                    htmlFor="autoAddCheck"
                    onClick={() => props.onCheck(!props.checked)}
                    className={`${styles.checkLabel} ${props.customLabelClass && props.customLabelClass}`}
                >
                    {props.text}
                </label>
            }
            <div
                className={`
                ${props.checked ? styles.checkBtnChecked : styles.checkBtn}
                ${props.customInputClass && props.customInputClass}
                `}
                onClick={() => props.onCheck(!props.checked)}
            >
                <CheckOutlinedIcon className={`${styles.check} ${props.checked ? styles.checked : undefined}`}/>
            </div>
            {
                !props.textLeft &&
                <label
                    htmlFor="autoAddCheck"
                    onClick={() => props.onCheck(!props.checked)}
                    className={`${styles.checkLabel} ${props.customLabelClass && props.customLabelClass}`}
                >
                    {props.text}
                </label>
            }
        </div>
    )
}