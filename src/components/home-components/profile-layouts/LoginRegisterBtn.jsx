import { useContext } from 'react'
import LoginLayout from '../../login-register/LoginLayout'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import styles from './LoginRegisterBtn.module.css'
import ApplicationContext from '../../../store/application-context'
import RegisterLayout from '../../login-register/RegisterLayout'


const LoginRegisterBtn = () => {
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler

    // render elements
    return (
        <div className={styles.profile__login_box_content}>
            <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate
                            key='overlay_box_template' 
                            contentHandler={contentHandler} 
                            content={<LoginLayout />} />
                    ])}
                    className={styles.profile__login_box_content_btn}>Sign in</button>
            <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate 
                            key='overlay_box_template' 
                            contentHandler={contentHandler}
                            content={<RegisterLayout />} />
                    ])}
                    className={styles.profile__login_box_content_btn}>Sign up</button>
        </div>
    )
}

export default LoginRegisterBtn
