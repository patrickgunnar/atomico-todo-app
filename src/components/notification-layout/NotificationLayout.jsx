import ApplicationContext from '../../store/application-context'
import { useContext } from 'react'
import styles from './NotificationLayout.module.css'


const NotificationLayout = ({ title = 'Notification', content='Some data content is being display here' }) => {
    // get notification handler
    const notificationHandler = useContext(ApplicationContext).notificationHandler

    // close notification box
    const closeNotification = () => {
        notificationHandler([])
    }

    // render notification
    return (
        <div className={styles.notification__main_content}>
            <div className={styles.notification__main_title_box}>
                <h3 className={styles.notification__main_title_box_title}>{title}</h3>
                <p className={styles.notification__main_title_box_content}>{content}</p>
            </div>
            <button onClick={closeNotification}
                    className={styles.notification__main_close_btn}>Close</button>
        </div>
    )
}

export default NotificationLayout
