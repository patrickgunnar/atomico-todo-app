import { useContext, useRef, useState } from 'react'
import styles from './SettingsLayout.module.css'
import ApplicationContext from '../../../store/application-context'
import profileImg from '../../../../public/image/picture/profile.png'
import Image from 'next/image'
import { ImageToBase64 } from '../../data-handler/image-to-base64'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const SettingsLayout = () => {
    // current user context
	const currentUser = useContext(ApplicationContext).user
    // current user context
	const currentUserHandler = useContext(ApplicationContext).userHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get loading context handler
    const loadingHandler = useContext(ApplicationContext).loadingHandler
    // get notification handler
    const notificationHandler = useContext(ApplicationContext).notificationHandler
    // saving on data notification handler
    const savingDBHandler = useContext(ApplicationContext).savingIntoDBHandler

    // states 
    const [ passwordLabel, setPasswordLabel ] = useState('Show Password')
    const [ pictureDisplay, setPictureDisplay ] = useState(currentUser.photo !== 'no-picture' ? currentUser.photo : profileImg)

    // refs
    const oldPasswordRef = useRef()
    const newPasswordRef = useRef()
    const newPasswordAgainRef = useRef()
    const passwordCheckboxRef = useRef()
    const pictureSelectorRef = useRef()
    const newEmailRef = useRef()
    const newNameRef = useRef()

    // change type of the inputs
    const showPasswordHandler = () => {
        if(passwordCheckboxRef.current.checked) {
            oldPasswordRef.current.type = 'text'
            newPasswordRef.current.type = 'text'
            newPasswordAgainRef.current.type = 'text'

            setPasswordLabel('Hide Password')
        } else {
            oldPasswordRef.current.type = 'password'
            newPasswordRef.current.type = 'password'
            newPasswordAgainRef.current.type = 'password'

            setPasswordLabel('Show Password')
        }
    }

    // display selected picture into image box
    const pictureDisplayHandler = async () => {
        const pictureInput = pictureSelectorRef.current

        if(pictureInput) {
            const file = pictureInput.files[0]

            if(file) setPictureDisplay(await ImageToBase64(file, file.name))
        }
    }

    const changePasswordHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const oldPass = oldPasswordRef.current.value
        const newPass = newPasswordRef.current.value
        const newPassAgain = newPasswordAgainRef.current.value

        // set loading animation
        loadingHandler(true)

        // send the data to api profile manager
        // passing action
        // passing user session key
        // passing data to handler the request
        const response = await (await fetch('/api/profile-manager', {
            method: 'POST',
            body: JSON.stringify({
                action: 'update-password',
                id: currentUser.currentKey,
                data: JSON.stringify({ oldPass, newPass, newPassAgain })
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()

        // if any error occured
        // set loading error animation
        if(!response.status) savingDBHandler('false')
        // if the request is ok
        else {
            // user profile data receives current data
            currentUserHandler(response.content)
            // clear saving animation
            savingDBHandler('clear')
        }

        // clear loading animation
        loadingHandler(false)
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

    const changePictureHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const pictureInput = pictureSelectorRef.current.files[0]
        // convert image to base64
        const imgData = await ImageToBase64(pictureInput, pictureInput.name)

        // set loading animation
        loadingHandler(true)

        // send the data to api profile manager
        // passing action
        // passing user session key
        // passing data to handler the request
        const response = await (await fetch('/api/profile-manager', {
            method: 'POST',
            body: JSON.stringify({
                action: 'update-picture',
                id: currentUser.currentKey,
                data: imgData
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()

        // if any error occured
        // set loading error animation
        if(!response.status) savingDBHandler('false')
        // if the request is ok
        else {
            // user profile data receives current data
            currentUserHandler(response.content)
            // clear saving animation
            savingDBHandler('clear')
        }

        // clear loading animation
        loadingHandler(false)
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

    const changeEmailHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const newEmail = newEmailRef.current.value

        // set loading animation
        loadingHandler(true)

        // send the data to api profile manager
        // passing action
        // passing user session key
        // passing data to handler the request
        const response = await (await fetch('/api/profile-manager', {
            method: 'POST',
            body: JSON.stringify({
                action: 'update-email',
                id: currentUser.currentKey,
                data: newEmail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()

        // if any error occured
        // set loading error animation
        if(!response.status) savingDBHandler('false')
        // if the request is ok
        else {
            // user profile data receives current data
            currentUserHandler(response.content)
            // clear saving animation
            savingDBHandler('clear')
        }

        // clear loading animation
        loadingHandler(false)
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

    const changeNameHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const newName = newNameRef.current.value

        // set loading animation
        loadingHandler(true)

        // send the data to api profile manager
        // passing action
        // passing user session key
        // passing data to handler the request
        const response = await (await fetch('/api/profile-manager', {
            method: 'POST',
            body: JSON.stringify({
                action: 'update-name',
                id: currentUser.currentKey,
                data: newName
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()

        // if any error occured
        // set loading error animation
        if(!response.status) savingDBHandler('false')
        // if the request is ok
        else {
            // user profile data receives current data
            currentUserHandler(response.content)
            // clear saving animation
            savingDBHandler('clear')
        }

        // clear loading animation
        loadingHandler(false)
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
        <section className={styles.settings_profile__section}>
            <div className={styles.settings_profile__content}>
                <div className={styles.settings_profile__title_box}>
                    <p>Profile Settings</p>
                </div>
                <div className={styles.settings_profile__content_box}>
                    <div className={styles.settings_profile__password_box}>
                        <div className={styles.settings_profile__content_title_box}>
                            <p>Change Password</p>
                        </div>
                        <form onSubmit={changePasswordHandler}>
                            <label htmlFor='old-password' className={styles.settings_profile__label}>Old Password:</label>
                            <input id='old-password' type='password' className={styles.settings_profile__input}
                                    ref={oldPasswordRef} placeholder='Old password' required />
                            <label htmlFor='new-password' className={styles.settings_profile__label}>New Password:</label>
                            <input id='new-password' type='password' className={styles.settings_profile__input}
                                    ref={newPasswordRef} placeholder='New password' required />
                            <label htmlFor='new-password-again' className={styles.settings_profile__label}>New Password Again:</label>
                            <input id='new-password-again' type='password' className={styles.settings_profile__input}
                                    ref={newPasswordAgainRef} placeholder='Confirm password' required />
                            <div className={styles.settings_profile__checkbox_box}>
                                <input id='show-password' type='checkbox' className={styles.settings_profile__checkbox}
                                    ref={passwordCheckboxRef} onClick={showPasswordHandler} />
                                <label htmlFor='show-password' className={styles.settings_profile__label}>{passwordLabel}</label>
                            </div>
                            <div className={styles.settings_profile__content_close_box}>
                                <button className={styles.settings_profile__content_close}>Apply</button>
                            </div>
                        </form>
                    </div>
                    <hr className={styles.settings_profile__hr} />
                    <div className={styles.settings_profile__picture_box}>
                        <div className={styles.settings_profile__content_title_box}>
                            <p>Change Picture</p>
                        </div>
                        <form onSubmit={changePictureHandler}>
                            <div className={styles.settings_profile__picture_content_box}>
                                <div className={styles.settings_profile__picture_display}>
                                    <Image className={styles.settings_profile__picture_img} style={{objectFit: 'cover'}}
                                        src={pictureDisplay} alt='profile-picture' height={200} width={200} />
                                </div>
                            </div>
                            <label htmlFor='picture-selector' className={styles.settings_profile__label}>Choose Picture:</label>
                            <input id='picture-selector' type='file' className={styles.settings_profile__input}
                                    accept='image/png, image/jpeg' ref={pictureSelectorRef} 
                                    onChange={pictureDisplayHandler} required />
                            <div className={styles.settings_profile__content_close_box}>
                                <button className={styles.settings_profile__content_close}>Apply</button>
                            </div>
                        </form>
                    </div>
                    <hr className={styles.settings_profile__hr} />
                    <div className={styles.settings_profile__name_email_box}>
                        <div className={styles.settings_profile__email_box}>
                            <div className={styles.settings_profile__content_title_box_2}>
                                <p>Change E-mail</p>
                            </div>
                            <form onSubmit={changeEmailHandler}>
                                <label htmlFor='change-email' className={styles.settings_profile__label}>New E-mail:</label>
                                <input id='change-email' type='email' className={styles.settings_profile__input} required
                                        defaultValue={currentUser.email} ref={newEmailRef} placeholder='New e-mail' />
                                <div className={styles.settings_profile__content_close_box}>
                                    <button className={styles.settings_profile__content_close}>Apply</button>
                                </div>
                            </form>
                        </div>
                        <hr className={styles.settings_profile__hr_2} />
                        <div className={styles.settings_profile__name_box}>
                            <div className={styles.settings_profile__content_title_box_2}>
                                <p>Change Name</p>
                            </div>
                            <form onSubmit={changeNameHandler}>
                                <label htmlFor='change-name' className={styles.settings_profile__label}>New Name:</label>
                                <input id='change-name' type='text' className={styles.settings_profile__input} required
                                        defaultValue={currentUser.username} ref={newNameRef} placeholder='New name' />
                                <div className={styles.settings_profile__content_close_box}>
                                    <button className={styles.settings_profile__content_close}>Apply</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={styles.settings_profile__close_box}>
                    <button onClick={_ => contentHandler([])} className={styles.settings_profile__close}>Close</button>
                </div>
            </div>
        </section>
    )
}

export default SettingsLayout
