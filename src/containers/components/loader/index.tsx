import styles from "./loader-page.module.scss";

export const Loader = (props: {small?: boolean, tiny?: boolean}) => {

    const getClass = () => {
        if(props.small)
            return styles.small
        else if(props.tiny)
            return styles.tiny
        else
            return styles.point
    }

    return (
        <div className={styles.content}>
            <div className={`${styles.p1} ${getClass()}`} />
            <div className={`${styles.p2} ${getClass()}`} />
            <div className={`${styles.p3} ${getClass()}`} />
        </div>
    );
};
