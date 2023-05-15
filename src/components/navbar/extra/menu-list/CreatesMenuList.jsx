import Link from "next/link"
import { useContext } from "react"
import ApplicationContext from "../../../../store/application-context"


const CreatesMenuList = ({ menuList, CurrentStyles, setNavigationHandler }) => {
    // navigation current page
    const navigation = useContext(ApplicationContext).naviagtion

    return (
        menuList.map(item => {
            // menu item name to lower case and replace the white spaces to a '-' if it exists
            const currentPage = item.toLowerCase().replaceAll(' ', '-')
            // current classes of the Link tag
			// if is not current item the active page, applies only one class
			// if is current item the active page, applies two classes
            const currentClasses = navigation === currentPage ? `${CurrentStyles[0]} ${CurrentStyles[1]}` : CurrentStyles[0]

            return (
                <Link
                    key={currentPage} className={currentClasses} 
                    href={currentPage === 'home' ? '/' : `/${currentPage}`} 
                    onClick={setNavigationHandler.bind(this, currentPage)}
                >{item}</Link>
            )
        })
    )
}

export default CreatesMenuList
