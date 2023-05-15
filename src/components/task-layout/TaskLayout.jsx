import { useContext } from 'react'
import { addingNewTaskToCurrrentList, convertingDateToExpressionDate, filteringSelectedDataFromFolderHandler, filteringSelectedDataHandler, gettingDataTasks } from '../data-handler/display-data'
import OverlayBoxTemplate from '../overlay-box/OverlayBoxTemplate'
import DeleteTaskLayout from './DeleteTaskLayout'
import EditTaskLayout from './EditTaskLayout'
import styles from './TaskLayout.module.css'
import ApplicationContext from '../../store/application-context'
import NotificationLayout from '../notification-layout/NotificationLayout'


const TaskLayout = ({ currentTask, inheritClasse='' }) => {
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

    // favourite or complete handler
    const favouriteCompleteHandler = async (handler, id, isFav = false) => {
        const currentElement = {}

        contentHandler([])
        // display saving animation
        savingDBHandler('true')

        // send data to api data manager
        // passing where the request have to be done
        // passing the action to be done
        // passing the ids where the action have to work
        // passing the data to insert, if favourit request, 
        // pass the favourite condition (true or false)
        // else pass an empty object
        // pass user data
        // pass user profile data
        const response = await (await fetch('/api/data-manager', {
            method: 'POST',
            body: JSON.stringify({
                where: id.includes('FOLDER') ? 'list-inside-folder' : 'list-outside-folder',
                action: handler,
                ids: addingNewTaskToCurrrentList(id),
                dataToInsert: 'favourite-task' ? JSON.stringify({ isFav }) : JSON.stringify(currentElement),
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
        <div className={`${!currentTask.complete ? (
            styles.task_layout__main_section
        ) : (
            styles.task_layout__main_section_complete
        )} ${inheritClasse}`}>
            <div className={styles.task_layout__main_data}>
                <div className={styles.task_layout__main_data_header}>
                    <div className={styles.task_layout__main_data_favourite}>
                        <button onClick={_ => favouriteCompleteHandler('favourite-task', currentTask.id, currentTask.favourite)}
                                className={currentTask.favourite ? (
                            styles.task_layout__main_favourite_on
                        ) : (
                            styles.task_layout__main_favourite_off
                        )}></button>
                    </div>
                    <div className={styles.task_layout__main_data_date}>
                        <p>{convertingDateToExpressionDate(currentTask.date)}</p>
                    </div>
                </div>
                <div className={styles.task_layout__main_data_text}>
                    <p>{currentTask.text}</p>
                </div>
            </div>
            {
                !currentTask.complete ? (
                    <div className={styles.task_layout__main_settings}>
                        <button onClick={_ => contentHandler([
                            <OverlayBoxTemplate
                                key='overlay_box_template' 
                                contentHandler={contentHandler} 
                                content={<DeleteTaskLayout currentId={currentTask.id} />} />
                        ])}
                                className={styles.task_layout__main_settings_delete}>Delete</button>
                        <button onClick={_ => contentHandler([
                            <OverlayBoxTemplate
                                key='overlay_box_template' 
                                contentHandler={contentHandler} 
                                content={<EditTaskLayout 
                                            currentId={currentTask.id} 
                                            currentText={currentTask.text}
                                            currentDate={currentTask.date} />} />
                        ])}
                                className={styles.task_layout__main_settings_edit}>Edit</button>
                        <button onClick={_ => favouriteCompleteHandler('complete-task', currentTask.id)}
                                className={styles.task_layout__main_settings_done}>Done</button>
                    </div>
                ) : (<></>)
            }
        </div>
    )
}

export default TaskLayout
