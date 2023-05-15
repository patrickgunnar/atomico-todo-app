import styles from './SavingIntoDBLayout.module.css'


const SavingIntoDBLayout = () => {
    // render elements
    return (
        <section className={styles.saving_loader__main_section}>
            <div className={styles.saving_loader__main_section_content}>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_a}`}>S</div>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_b}`}>A</div>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_c}`}>V</div>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_d}`}>I</div>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_e}`}>N</div>
                <div className={`${styles.saving_loader__main_section_content_ball} ${styles.colour_f}`}>G</div>
            </div>
        </section>
    )
}

export default SavingIntoDBLayout
