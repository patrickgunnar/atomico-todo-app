import { useContext, useRef } from 'react'
import styles from './NewFolderLayout.module.css'
import ApplicationContext from '../../../store/application-context'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const NewFolderLayout = () => {
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

    // useRef to handle the input
    const currentInputRef = useRef()

    const submitHandler = async (ev) => {
        ev.preventDefault()

        // get values from inputs
        const currentInputValue = currentInputRef.current.value
        const currentIds = [currentInputValue, currentInputValue]

        if(currentInputValue) {
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
                    where: 'folder-handler',
                    action: 'insert-folder',
                    ids: currentIds,
                    dataToInsert: currentInputValue,
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

    // render elements
    return (
        <section className={styles.content_dock__new_folder_section}>
            <div className={styles.content_dock__new_folder_content}>
                <div className={styles.content_dock__new_folder_content_title_box}>
                    <p>Add New Folder</p>
                </div>
                <div className={styles.content_dock__new_folder_content_form_box}>
                    <form onSubmit={submitHandler}>
                        <label className={styles.content_dock__new_folder_content_label}>Folder Name:</label>
                        <input ref={currentInputRef} type='text' placeholder="New folder's name"
                                className={styles.content_dock__new_folder_content_input} />
                        <div className={styles.content_dock__new_folder_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.content_dock__new_folder_content_btn} />
                            <button className={styles.content_dock__new_folder_content_btn}>Insert</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewFolderLayout
