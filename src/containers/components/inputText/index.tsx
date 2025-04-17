import styles from "./index.module.scss";
import SearchIcon from '@mui/icons-material/Search';

export const InputText = (props:{
    label?: string,
    placeholder: any,
    error?: string,
    showError?: boolean,
    password?: boolean,
    name: string,
    onChange?: any,
    paddingLeft?: string,
    value?: string,
    onClean?: any,
    inputClass?: any,
    labelClass?: any,
    onBlur?: any,
    onKeyDown?: any,
    onPressEnter?: any,
    icon?: any,
    type?: string,
    maxLength?: number,
    defaultValue?: any,
    disabled?: boolean,
    id?: string,
}) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && props.onPressEnter) {
            props.onPressEnter(event);
        } else if(props.onKeyDown)
            props.onKeyDown(event);
    };
    return (
        <div className={`${styles.container}`}>
            <label htmlFor={`input_${props.label}`} className={`${styles.inputLabel} ${props.labelClass && props.labelClass}`}>{props.label}</label>
            {props.icon && <SearchIcon className={styles.icon}/>}
            <input
                id={props.id ?? `input_${props.label}`}
                type={props.password ? "password" : (props.type ?? "text")}
                className={`
                    inputPrimaryGlobal 
                    ${styles.input} 
                    ${props.showError && styles.inputError} 
                    ${props.inputClass && props.inputClass}
                    ${props.icon && styles.inputPadding}
                `}
                placeholder={props.placeholder}
                onChange={props.onChange}
                name={props.name}
                style={props.paddingLeft ? {paddingLeft: props.paddingLeft} : {}}
                value={props.value}
                onBlur={props.onBlur}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                maxLength={props.maxLength ?? undefined}
                defaultValue={props.defaultValue}
                disabled={props.disabled}
            />
            {props.onClean && <span className={styles.cleanCross} onClick={props.onClean}>&times;</span>}
            <label htmlFor={`input_${props.label}`} className={styles.errorLabel} hidden={!props.showError}>{props.error}</label>
        </div>
    )
}