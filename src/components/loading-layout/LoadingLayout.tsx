import styles from './LoadingLayout.module.css'


const LoadingLayout = () => {
    // render loading elements
    return (
        <div className={styles.loading__main_content}>
            <div className={styles.loading__main_content_black_screen}></div>
            <div className={styles.loading__main_content_loading_content}>
                <div className={styles.loading__main_content_balls}></div>
                <div className={styles.loading__main_content_balls}></div>
                <div className={styles.loading__main_content_balls}></div>
                <div className={styles.loading__main_content_balls}></div>
            </div>
        </div>
    )
}

export default LoadingLayout
