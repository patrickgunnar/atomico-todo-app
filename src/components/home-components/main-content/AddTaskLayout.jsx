import { useContext, useRef } from 'react'
import styles from './AddTaskLayout.module.css'
import ApplicationContext from '../../../store/application-context'
import { addingNewTaskToCurrrentList, filteringSelectedDataFromFolderHandler, filteringSelectedDataHandler } from '../../data-handler/display-data'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../notification-layout/NotificationLayout'


const AddTaskLayout = ({ currentId }) => {
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

        // get inpust values
        const getInputDate = currentInputDateRef.current.value
        const getInputTask = currentInputTaskRef.current.value
        const currentElement = {
            date: getInputDate,
            text: getInputTask,
            favourite: false
        }

        contentHandler([])
        // set saving animation
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
                action: 'add-task',
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
                } else CurrentHomeDataHandler(filteringSelectedDataHandler(response.content, homeDataID))
            }

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

    // render elements
    return (
        <section className={styles.add_task__main_section}>
            <div className={styles.add_task__main_from_box}>
                <div className={styles.add_task__main_content_title_box}>
                    <p>Add New Task</p>
                </div>
                <div className={styles.add_task__main_content_form_box}>
                    <form onSubmit={submitHandler}>
                        <label className={styles.add_task__main_content_label}>Task Date:</label>
                        <input ref={currentInputDateRef} type='date' required
                                className={styles.add_task__main_content_input} />
                        <label className={styles.add_task__main_content_label}>Task Content:</label>
                        <textarea ref={currentInputTaskRef} required placeholder='Content of task'
                                className={styles.add_task__main_content_textarea}></textarea>
                        <div className={styles.add_task__main_content_btn_box}>
                            <input type='button' value='Cancel' onClick={_ => contentHandler([])}
                                    className={styles.add_task__main_content_btn} />
                            <button className={styles.add_task__main_content_btn}>Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AddTaskLayout
