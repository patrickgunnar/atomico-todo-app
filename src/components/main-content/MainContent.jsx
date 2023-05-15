import styles from './MainContent.module.css'


const MainContent = ({ children }) => {
    // render elements
    return (
        <main className={styles.atomo_app__main_content_group}>
            {children}
        </main>
    )
}

export default MainContent
