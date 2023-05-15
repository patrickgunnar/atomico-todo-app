import styles from './SavingIntoDBErrorLayout.module.css'


const SavingIntoDBErrorLayout = () => {
    // render elements
    return (
        <section className={styles.error_loader__main_section}>
            <div className={styles.error_loader__main_section_content}>
                <div className={styles.error_loader__main_section_content_ball}>S</div>
                <div className={styles.error_loader__main_section_content_ball}>A</div>
                <div className={styles.error_loader__main_section_content_ball}>V</div>
                <div className={styles.error_loader__main_section_content_ball}>I</div>
                <div className={styles.error_loader__main_section_content_ball}>N</div>
                <div className={styles.error_loader__main_section_content_ball}>G</div>
                <div className={styles.error_loader__main_section_content_space}></div>
                <div className={styles.error_loader__main_section_content_ball}>E</div>
                <div className={styles.error_loader__main_section_content_ball}>R</div>
                <div className={styles.error_loader__main_section_content_ball}>R</div>
                <div className={styles.error_loader__main_section_content_ball}>O</div>
                <div className={styles.error_loader__main_section_content_ball}>R</div>
            </div>
        </section>
    )
}

export default SavingIntoDBErrorLayout
