import { useContext } from 'react'
import styles from './RegisterLayout.module.css'
import ApplicationContext from '../../store/application-context'
import { useState } from 'react'
import { useRef } from 'react'
import OverlayBoxTemplate from '../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../notification-layout/NotificationLayout'
import { gettingTodaysDate } from '../data-handler/display-data'


const RegisterLayout = () => {
    // get loading context handler
    const loadingHandler = useContext(ApplicationContext).loadingHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get notification handler
    const notificationHandler = useContext(ApplicationContext).notificationHandler
    // current user context
	const currentUserHandler = useContext(ApplicationContext).userHandler
    // get data context handler
    const currentUserDataHandler = useContext(ApplicationContext).currentDataHandler
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

    const [ currentRegisterTitle, setCurrentRegisterTitle ] = useState('Sign up') // useState to set the title
    const [ showPasswordState, setShowPasswordState ] = useState('Show Password') // useState to show the password check box
    const [ showPasswordInputState, setShowPasswordInputState ] = useState('password') // useState to show password input
    const [ isEmailState, setIsEmailState ] = useState('Your current sign up e-mail') // useState to check the e-mail input

    // email & password useRef
    const emailRef = useRef()
    const passwordRef = useRef()

    const isEmailValid = (ev) => { // Check e-mail validation
        const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(ev.target.value)

        if(isValid) { // If e-mail valid
            ev.target.value = ev.target.value
            setIsEmailState('Your current sign up e-mail')

        } else {
            ev.target.value = ''
            setIsEmailState('Invalid e-mail!')
        }
    }

    const showPassword = (ev) => { //Show/Hide password
        if(ev.target.checked) { // If box checked
            setShowPasswordState('Hide Password')
            setShowPasswordInputState('text')
        } else {
            setShowPasswordState('Show Password')
            setShowPasswordInputState('password')
        }
    }

    const submitHandler = async (ev) => {
        ev.preventDefault()
        // loading layout on
        loadingHandler(true)

        // and input data
        const email = emailRef.current.value // getting email input
        const password = passwordRef.current.value // getting password input

        // send entered data to be check
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        const result = await response.json()

        // if login passed the check
        if(response.ok) {
            const todays = gettingTodaysDate()

            // clear context states data
            contentHandler([])
            currentUserHandler(result.user)
            currentUserDataHandler(result.data)
            currentPageHandler(['home'], 0, false)
            navigationHandler('')
            currentHomeDataHandler([])
            currentDateHandler(todays)
            selectedDateHandler(todays)
            homeDataIDHandler('')
            openedFolderHandler([])
        }

        // loading layout off
        loadingHandler(false)

        // display notification
        notificationHandler([
            <OverlayBoxTemplate
                key='notification_box_template' 
                contentHandler={notificationHandler} 
                content={
                    <NotificationLayout
                        title={result.title}
                        content={result.message} />
                } />
        ])
    }

    // render the elements
    return (
        <section className={styles.register__base_main_section}>
            <form onSubmit={submitHandler} className={styles.register__main_form}>
                <div className={styles.register__main_content}>
                    <button className={styles.register__main_close_btn} onClick={_ => contentHandler([])}>Close</button>
                    <div className={styles.register__main_group}>
                        <div className={styles.register__main_title}>
                            <p>{currentRegisterTitle}</p>
                        </div>
                        <label className={styles.register__label_group} htmlFor='register__email_input'>E-mail:</label>
                        <input required className={styles.register__input_group} ref={emailRef} id='register__email_input' type='email' placeholder={isEmailState} onBlur={ev => isEmailValid(ev)} />
                        <label className={styles.register__label_group} htmlFor='register__password_input'>Password:</label>
                        <input required className={styles.register__input_group} ref={passwordRef} id='register__password_input' type={showPasswordInputState} placeholder='Your sign up password' />
                        <div className={styles.register__show_password_group}>
                            <input className={styles.register__checkbox} id='register__show_password_input' type='checkbox' onClick={ev => showPassword(ev)} />
                            <label className={styles.register__label_show_password} htmlFor='register__show_password_input'>{showPasswordState}</label>
                        </div>
                        <button className={styles.register__main_group_btn}>Register</button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default RegisterLayout
