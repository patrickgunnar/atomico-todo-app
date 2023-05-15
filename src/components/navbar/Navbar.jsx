import { useEffect, useState } from 'react'
import DesktopMenu from './extra/DesktopMenu'
import MobileMenu from './extra/MobileMenu'


const Navbar = () => {
    // menu options 
    const menu = ['Home', 'My Day', 'Favourites', 'Calender', 'About'] 
    // useState to check if curren screen is mobile or desktop
    // true for mobile screen and false for desktop screen
    const [isMobileVersion, setIsMobileVersion] = useState(false)

    useEffect(() => {
        // if current screen is greater that 950px, set current screen state to false
        if(window.innerWidth > 950) setIsMobileVersion(false)
        // if current screen is equal or less that 950px, set current screen state to true
        else if(window.innerWidth <= 950) setIsMobileVersion(true)

        // event listener to track screen size changes
        window.addEventListener('resize', (size) => {
            // if current screen is greater that 950px, set current screen state to false
            if(size.currentTarget.innerWidth > 950) setIsMobileVersion(false)
            // if current screen is equal or less that 950px, set current screen state to true
            else if(size.currentTarget.innerWidth <= 950) setIsMobileVersion(true)
        })
    }, [])

    // if isMobileVersion is false, renders the desktop navbar
    // if isMobileVersion is true, renders the mobile navbar
    return (
        !isMobileVersion ? <DesktopMenu menu={menu} /> : <MobileMenu menu={menu} />
    )
}

export default Navbar
