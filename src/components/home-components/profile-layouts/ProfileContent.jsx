import Image from 'next/image'
import styles from './ProfileContent.module.css'
import profileImg from '../../../../public/image/picture/profile.png'
import { useContext } from 'react'
import ApplicationContext from '../../../store/application-context'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import SettingsLayout from './SettingsLayout'
import Router from 'next/router'
import NotificationLayout from '../../notification-layout/NotificationLayout'
import { gettingTodaysDate } from '../../data-handler/display-data'


const ProfileContent = () => {
    // current user context
	const currentUser = useContext(ApplicationContext).user
    // current user context
	const currentUserHandler = useContext(ApplicationContext).userHandler
    // get data context handler
    const currentUserDataHandler = useContext(ApplicationContext).currentDataHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get notification handler
    const notificationHandler = useContext(ApplicationContext).notificationHandler
    // get current page handler
    const currentPageHandler = useContext(ApplicationContext).currentPageHandler
    // navigation handler
    const navigationHandler = useContext(ApplicationContext).navigationHandler
    // home data
    const currentHomeDataHandler = useContext(ApplicationContext).currentHomeDataHandler
    // current date
    const currentDateHandler = useContext(ApplicationContext).currentDateHandler
    // selected date
    const selectedDateHandler = useContext(ApplicationContext).selectedDateHandler
    // home data id
    const homeDataIDHandler = useContext(ApplicationContext).homeDataIDHandler
    // folder openend ids
    const openedFolderHandler = useContext(ApplicationContext).openedFolderHandler

    const loggingout = () => {
        const todays = gettingTodaysDate()

        // clear context states
        currentUserHandler(null)
        currentUserDataHandler(null)
        currentPageHandler(['home'], 0, false)
        navigationHandler('')
        currentHomeDataHandler([])
        currentDateHandler(todays)
        selectedDateHandler(todays)
        homeDataIDHandler('')
        openedFolderHandler([])

        // route to "/" page
        Router.push('/')

        // display notification
        notificationHandler([
            <OverlayBoxTemplate
                key='notification_box_template' 
                contentHandler={notificationHandler} 
                content={
                    <NotificationLayout
                        title='Successfully'
                        content='You have successfully logged out from your account. Come back soon!' />
                } />
        ])
    }

    // render elements
    return (
        <div className={styles.profile__content_box_content}>
            <div className={styles.profile__content_picture_box}>
                <Image className={styles.profile__content_picture} style={{objectFit: 'cover'}}
                        src={currentUser.photo !== 'no-picture' ? currentUser.photo : profileImg} 
                        alt='profile-picture' height={50} width={50} />
            </div>
            <div className={styles.profile__content_box}>
                <div className={styles.profile__content_info}>
                    <div className={styles.profile__content_name}>
                        <p>{currentUser.username}</p>
                    </div>
                    <div className={styles.profile__content_email}>
                        <p>{currentUser.email}</p>
                    </div>
                </div>
                <div className={styles.profile__content_btn_box}>
                    <button className={styles.profile__content_btn}
                            onClick={_ => contentHandler([
                                <OverlayBoxTemplate
                                    key='overlay_box_template' 
                                    contentHandler={contentHandler} 
                                    content={<SettingsLayout />} />
                            ])}>Settings</button>
                    <button className={styles.profile__content_btn}
                            onClick={loggingout}>Log out</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent
