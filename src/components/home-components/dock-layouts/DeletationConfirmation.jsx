import { useContext } from 'react'
import styles from './DeletationConfirmation.module.css'
import ApplicationContext from '../../../store/application-context'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const DeletationConfirmation = ({ currentId, parentId }) => {
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
    // get opened folders
    const openedFolder = useContext(ApplicationContext).openedFolder
    // set opened folders
    const openedFolderHandler = useContext(ApplicationContext).openedFolderHandler
    // current user context
	const currentUser = useContext(ApplicationContext).user
    // get current home screen data
	const currentHomeDataHandler = useContext(ApplicationContext).currentHomeDataHandler

    const submitHandler = async (ev) => {
        ev.preventDefault()

        // ids list
        const currentIds = parentId ? [parentId, currentId] : [currentId, parentId]

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
                action: 'delete-item',
                ids: currentIds,
                dataToInsert: 'delete-data',
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
            currentHomeDataHandler([])
            // clear saving animation
            savingDBHandler('clear')

            // if a folder is openend
            if(currentId.includes('FOLDER')) openedFolderHandler(openedFolder.filter(item => item !== currentId))
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

    // render elements
    return (
        <section className={styles.content_dock__deletation_section}>
            <div className={styles.content_dock__deletation_content}>
                <div className={styles.content_dock__deletation_content_title_box}>
                    <p>Are you sure you want to proceed with deletation?</p>
                </div>
                <div className={styles.content_dock__deletation_content_form_box}>
                    <form onSubmit={ev => submitHandler(ev)}>
                        <div className={styles.content_dock__deletation_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.content_dock__deletation_content_btn} />
                            <button className={styles.content_dock__deletation_content_btn}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default DeletationConfirmation
