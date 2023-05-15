import { useContext } from 'react'
import Router from 'next/router'
import ApplicationContext from '../../store/application-context'
import OverlayBoxTemplate from '../overlay-box/OverlayBoxTemplate'
import LoginLayout from '../login-register/LoginLayout'
import RegisterLayout from '../login-register/RegisterLayout'
import styles from './HomeNoSessionLayout.module.css'
import NotificationLayout from '../notification-layout/NotificationLayout'


const HomeNoSessionLayout = () => {
    // notification handler
	const notificationHandler = useContext(ApplicationContext).notificationHandler
    // current user context
	const currentUserHandler = useContext(ApplicationContext).userHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get data context handler
    const currentUserDataHandler = useContext(ApplicationContext).currentDataHandler
    // loading handler
    const loadingHandler = useContext(ApplicationContext).loadingHandler

    // setting a temporary user - no saving data
    const noCurrentUserRun = async () => {
        // set loading animation
        loadingHandler(true)

        // get start data
        const response = await (await fetch('/api/start-data', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })).json()

        // if request is ok
        if(response.status) {
            // set data to the context states
            currentUserHandler(JSON.parse(response.content[0]))
            currentUserDataHandler((JSON.parse(response.content[1])).reverse())
        } else {
            Router.push('/')
        }
        
        // clear loading animation
        loadingHandler()
        
        // display notification
        notificationHandler([
            <OverlayBoxTemplate
                key='notification_box_template' 
                contentHandler={notificationHandler} 
                content={
                    <NotificationLayout
                        title={response.title}
                        content={response.message} />
                } />
        ])
    }

    // render elements
    return (
        <section className={styles.home__base_main}>
            <div className={styles.home__main_content}>
                <div className={styles.home__main_children}>
                    <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate 
                            key='overlay_box_template' 
                            contentHandler={contentHandler} 
                            content={<LoginLayout />} />
                    ])}
                            className={styles.home__main_btn}>Sign in</button>
                    <hr className={styles.home__main_children_hr} />
                    <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate 
                            key='overlay_box_template' 
                            contentHandler={contentHandler}
                            content={<RegisterLayout />} />
                    ])}
                            className={styles.home__main_btn}>Sign up</button>
                </div>
                <hr className={styles.home__main_hr} />
                <div className={styles.home__main_children}>
                    <button onClick={noCurrentUserRun}
                            className={styles.home__main_btn}>No saving Run</button>
                    <hr className={styles.home__main_children_hr} />
                    <p className={styles.home__main_p}>The content stored on memory will not be saved after closing tab, sign up to save.</p>
                </div>
            </div>
        </section>
    )
}

export default HomeNoSessionLayout
