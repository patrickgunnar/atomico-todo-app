import { Fragment, useState } from 'react'
import CreatesMenuList from './menu-list/CreatesMenuList'
import styles from './MobileMenu.module.css'
import { useContext } from 'react'
import ApplicationContext from '../../../store/application-context'


const MobileMenu = ({ menu }) => {
	// navigation handler
    const navigationHandler = useContext(ApplicationContext).navigationHandler
	// state to open/close the menu dropdown
	const [mobileDropdown, setMobileDropdown] = useState(false)

	// change current page
    const setNavigationHandler = (currentPage) => {
        navigationHandler(currentPage)
		// open/close the menu dropdown
		// if state is true, set to false
		// if state is false, set to true
		setMobileDropdown(!mobileDropdown)
    }

	// renders the menu dropdown button
	// if mobileDropdown is set to true, renders the menu dropdown
    return (
        <Fragment>
			<button className={styles.atomo_navbar__main_mobile_content_btn} onClick={setMobileDropdown.bind(this, !mobileDropdown)}>
				{!mobileDropdown ? 'Menu' : 'Close'}
			</button>
            {
				mobileDropdown && <nav className={styles.atomo_navbar__main_mobile_content_group}>
					<div className={styles.atomo_navbar__nav_mobile_content_group}>
						<CreatesMenuList
							isMobile={true}
							menuList={menu} 
							CurrentStyles={[
								styles.atomo_navbar__nav_mobile_content_item,
								styles.atomo_navbar__nav_mobile_content_active
							]}
							setNavigationHandler={setNavigationHandler} />
					</div>
				</nav>
			}
        </Fragment>
    )
}

export default MobileMenu
