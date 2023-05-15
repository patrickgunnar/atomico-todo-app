import { useContext } from 'react'
import Router from 'next/router'
import styles from './NavigationHeader.module.css'
import ApplicationContext from '../../store/application-context'


const NavigationHeader = ({ currentName, inheritClasse='' }) => {
    // current nav context
    const currentPage = useContext(ApplicationContext).currentPage

    // get user previous page
    const navigatingPrev = () => {
        if(currentPage.navIds.length > 0) {
            // remove 1 to the current page position on array
            let currentIdx = currentPage.navIdx - 1

            // if curren index is less than 0, set it to the first position of the array
            if(currentIdx < 0) currentIdx = 0

            // current page object receives index and set nav to true
            currentPage.navIdx = currentIdx
            currentPage.isNav = true
            // route to the current nav page
            Router.push(currentPage.navIds[currentPage.navIdx])
        }
    }

    // get user next page
    // only works if user used the user nav buttons
    const navigatingNext = () => {
        if(currentPage.navIds.length > 0) {
            // sum 1 to the current page position on array
            let currentIdx = currentPage.navIdx + 1

            // if curren index is higher than array length, set it to the last position of the array
            if(currentIdx > currentPage.navIds.length - 1) currentIdx = currentPage.navIds.length - 1

            // current page object receives index and set nav to true
            currentPage.navIdx = currentIdx
            currentPage.isNav = true
            // route to the current nav page
            Router.push(currentPage.navIds[currentPage.navIdx])
        }
    }

    // render elements
    return (
        <div className={`${styles.nav__header_section} ${inheritClasse}`}>
            <div className={styles.nav__header_navigation}>
                <button onClick={navigatingPrev}
                        className={styles.nav__header_navigation_prev}></button>
                <button onClick={navigatingNext}
                        className={styles.nav__header_navigation_next}></button>
            </div>
            <div className={styles.nav__header_title}>
                <p>{currentName}</p>
            </div>
        </div>
    )
}

export default NavigationHeader
