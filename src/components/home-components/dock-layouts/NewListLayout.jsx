import { useContext, useRef } from 'react'
import styles from './NewListLayout.module.css'
import ApplicationContext from '../../../store/application-context'
import { filteringFolderOption } from '../../data-handler/display-data'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const NewListLayout = () => {
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
    const currentInputListRef = useRef()
    const currentInputFolderRef = useRef()

    const submitHandler = async (ev) => {
        ev.preventDefault()

        // get inputs values
        const currentInputValueList = currentInputListRef.current.value
        const currentInputValueFolder = currentInputFolderRef.current.value
        const currentIds = [currentInputValueList, currentInputValueFolder]

        if(currentInputValueList) {
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
                    where: 'list-handler',
                    action: currentInputValueFolder === 'no-folder-insertion' ? 'insert-list' : 'insert-in-folder',
                    ids: currentIds,
                    dataToInsert: currentInputValueList,
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

    // filtering folders to append a list inside
    const currentElementsOption = filteringFolderOption(currentUserData)

    // render elements
    return (
        <section className={styles.content_dock__new_list_section}>
            <div className={styles.content_dock__new_list_content}>
                <div className={styles.content_dock__new_list_content_title_box}>
                    <p>Add New List</p>
                </div>
                <div className={styles.content_dock__new_list_content_form_box}>
                    <form onSubmit={submitHandler}>
                        <label className={styles.content_dock__new_list_content_label}>List Name:</label>
                        <input ref={currentInputListRef} type='text' placeholder="New list's name"
                                className={styles.content_dock__new_list_content_input} />
                        <label className={styles.content_dock__new_list_content_label}>Insert To Folder:</label>
                        <select ref={currentInputFolderRef} required className={styles.content_dock__new_list_content_input}>
                            {currentElementsOption}
                        </select>
                        <div className={styles.content_dock__new_list_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.content_dock__new_list_content_btn} />
                            <button className={styles.content_dock__new_list_content_btn}>Insert</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewListLayout
