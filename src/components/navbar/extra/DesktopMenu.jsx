import styles from './DesktopMenu.module.css'
import CreatesMenuList from "./menu-list/CreatesMenuList"
import { useContext } from "react"
import ApplicationContext from "../../../store/application-context"


const DesktopMenu = ({ menu }) => {
    // navigation handler
    const navigationHandler = useContext(ApplicationContext).navigationHandler

    // change current page
    const setNavigationHandler = (currentPage) => {
        navigationHandler(currentPage)
    }

    // renders the navbar
    return (
        <nav className={styles.atomo_navbar__main_desktop_content_group}>
            <div className={styles.atomo_navbar__nav_desktop_content_group}>
                <CreatesMenuList
                    menuList={menu} 
                    CurrentStyles={[
                        styles.atomo_navbar__nav_desktop_content_item,
                        styles.atomo_navbar__nav_desktop_content_active
                    ]}
                    setNavigationHandler={setNavigationHandler} />
            </div>
        </nav>
    )
}

export default DesktopMenu
