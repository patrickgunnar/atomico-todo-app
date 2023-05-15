import { useContext } from 'react'
import styles from './EditTaskLayout.module.css'
import ApplicationContext from '../../store/application-context'
import OverlayBoxTemplate from '../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../notification-layout/NotificationLayout'
import { useRef } from 'react'
import { addingNewTaskToCurrrentList, filteringSelectedDataFromFolderHandler, filteringSelectedDataHandler, gettingDataTasks } from '../data-handler/display-data'


const EditTaskLayout = ({ currentId, currentText, currentDate }) => {
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
    // get current home screen data
	const CurrentHomeDataHandler = useContext(ApplicationContext).currentHomeDataHandler
    // get current home id
    const homeDataID = useContext(ApplicationContext).homeDataID
    // current user context
	const currentUser = useContext(ApplicationContext).user

    // inputs ref
    const currentInputDateRef = useRef()
    const currentInputTaskRef = useRef()

    const submitHandler = async (ev) => {
        ev.preventDefault()

        // get inputs data
        const getInputDate = currentInputDateRef.current.value
        const getInputTask = currentInputTaskRef.current.value
        const currentElement = {
            date: getInputDate,
            text: getInputTask
        }

        contentHandler([])
        // display saving animation
        savingDBHandler('true')

        // send data to api data manager
        // passing where the request have to be done
        // passing the action to be done
        // passing the ids where the action have to work
        // passing the data to insert
        // else pass an empty object
        // pass user data
        // pass user profile data
        const response = await (await fetch('/api/data-manager', {
            method: 'POST',
            body: JSON.stringify({
                where: currentId.includes('FOLDER') ? 'list-inside-folder' : 'list-outside-folder',
                action: 'edit-task',
                ids: addingNewTaskToCurrrentList(currentId),
                dataToInsert: JSON.stringify(currentElement),
                loopOverData: JSON.stringify(currentUserData),
                isUser: JSON.stringify(currentUser)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })).json()

        // if something went wrong
        // display the saving error animation
        if(!response.status) savingDBHandler('false')
        else {
            // set current data to the received one
            currentUserDataHandler(response.content)

            // if user setted home page data to display
            if(homeDataID) {
                // if the id of the current home data to be displayed includes folder
                if(homeDataID.includes('FOLDER')) {
                    CurrentHomeDataHandler(filteringSelectedDataFromFolderHandler(response.content, homeDataID.split('LIST')[0], homeDataID))
                    // if the id of the current home data to be displayed includes list
                } else if(homeDataID.includes('LIST')) {
                    CurrentHomeDataHandler(filteringSelectedDataHandler(response.content, homeDataID))
                    // if the user on search
                } else CurrentHomeDataHandler(gettingDataTasks(response.content, 'from-search', null, homeDataID))
            }

            // clear the saving animation
            savingDBHandler('clear')
        }

        // show notification
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
        <section className={styles.edit_task__main_section}>
            <div className={styles.edit_task__main_from_box}>
                <div className={styles.edit_task__main_content_title_box}>
                    <p>Editing Task</p>
                </div>
                <div className={styles.edit_task__main_content_form_box}>
                    <form onSubmit={submitHandler}>
                        <label className={styles.edit_task__main_content_label}>Task Date:</label>
                        <input defaultValue={currentDate} ref={currentInputDateRef} type='date' 
                                required className={styles.edit_task__main_content_input} />
                        <label className={styles.edit_task__main_content_label}>Task Content:</label>
                        <textarea defaultValue={currentText} ref={currentInputTaskRef} required 
                                placeholder='Content of task' className={styles.edit_task__main_content_textarea}></textarea>
                        <div className={styles.edit_task__main_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.edit_task__main_content_btn} />
                            <button className={styles.edit_task__main_content_btn}>Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default EditTaskLayout
