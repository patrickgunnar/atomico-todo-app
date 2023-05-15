import { useContext, useRef } from 'react'
import styles from './SettingsLayout.module.css'
import ApplicationContext from '../../../store/application-context'
import DeletationConfirmation from './DeletationConfirmation'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const SettingsLayout = ({ currentName, currentId, parentId }) => {
    // notification handler
	const notificationHandler = useContext(ApplicationContext).notificationHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
    // get data context handler
    const currentUserDataHandler = useContext(ApplicationContext).currentDataHandler
    // saving on data notification handler
    const savingDBHandler = useContext(ApplicationContext).savingIntoDBHandler
    // current user context
	const currentUser = useContext(ApplicationContext).user

    // useRef to handle the setting
    const currentRef = useRef()

    const submitHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const currentName = currentRef.current.value
        const currentIds = parentId ? [parentId, currentId] : [currentId, parentId]

        if(currentName) {
            contentHandler([])
            // set saving animation
            savingDBHandler('true')

            // request to the api dock manager
            // passing where the request is, folder or list
            // passing the current action to be done
            // passing the ids
            // passing the data to be inserted
            // passing user data
            // passing user profile data
            const response = await (await fetch('/api/dock-manager', {
                method: 'POST',
                body: JSON.stringify({
                    where: currentId.includes('FOLDER') ? 'folder-handler' : 'list-handler',
                    action: 'name-edit',
                    ids: currentIds,
                    dataToInsert: currentName,
                    loopOverData: JSON.stringify(currentUserData),
                    isUser: JSON.stringify(currentUser)
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })).json()

            // if any error occured
            // set saving error animation
            if(!response.status) savingDBHandler('false')
            else {
                // set received data
                currentUserDataHandler(response.content)
                // clear saving animation
                savingDBHandler('clear')
            }

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
    }

    // display the corfimation layout for deletation
    const submitDeletationHandler = (ev) => {
        ev.preventDefault()

        contentHandler([<OverlayBoxTemplate
            key='overlay_box_template' 
            contentHandler={contentHandler} 
            content={<DeletationConfirmation currentId={currentId} parentId={parentId} />} />])
    }

    // render elements
    return (
        <section className={styles.content_dock__list_settings_section}>
            <div className={styles.content_dock__list_settings_content}>
                <div className={styles.content_dock__list_settings_content_title_box}>
                    <p>Settings</p>
                </div>
                <div className={styles.content_dock__list_settings_delete_form_box}>
                    <form onSubmit={ev => submitDeletationHandler(ev)}>
                        <button className={styles.content_dock__list_settings_delete_form_btn}>Delete Element</button>
                    </form>
                </div>
                <div className={styles.content_dock__list_settings_content_form_box}>
                    <form onSubmit={ev => submitHandler(ev)}>
                        <label className={styles.content_dock__list_settings_content_label}>Element's Name:</label>
                        <input ref={currentRef} defaultValue={currentName} required type='text' placeholder="New element's name"
                                className={styles.content_dock__list_settings_content_input} />
                        <div className={styles.content_dock__list_settings_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.content_dock__list_settings_content_btn} />
                            <button className={styles.content_dock__list_settings_content_btn}>Insert</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SettingsLayout
