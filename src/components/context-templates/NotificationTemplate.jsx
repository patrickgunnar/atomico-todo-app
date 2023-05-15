import { useContext } from "react"
import ApplicationContext from "../../store/application-context"


// Overflow box 
const NotificationTemplate = () => {
    const contentElement = useContext(ApplicationContext).notificationContent // get context content

    // return the content
    return (<>{contentElement}</>)
}

export default NotificationTemplate
