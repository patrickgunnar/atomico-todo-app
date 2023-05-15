import { useContext, useRef } from 'react'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import styles from './ContentDock.module.css'
import ContentDockItems from './ContentDockItems'
import ApplicationContext from '../../../store/application-context'
import NewListLayout from '../dock-layouts/NewListLayout'
import NewFolderLayout from '../dock-layouts/NewFolderLayout'
import { gettingDataTasks } from '../../data-handler/display-data'


const ContentDock = () => {
    // get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
    // get current home screen data
	const CurrentHomeDataHandler = useContext(ApplicationContext).currentHomeDataHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get home id handler 
    const homeDataIDHandler = useContext(ApplicationContext).homeDataIDHandler

    // search useRef
    const searchRef = useRef()

    // diplay the search tasks
    const displayingSearchHandler = () => {
        // get input value
        const currentSearch = searchRef.current.value

        // seaech for tasks
        CurrentHomeDataHandler(gettingDataTasks(currentUserData, 'from-search', null, currentSearch))
        // set homeDataId to the current search values
        homeDataIDHandler(currentSearch)
    }

    // render elements
    return (
        <div className={styles.content_dock__main_box}>
            <div className={styles.content_dock__first_section}>
                <input ref={searchRef} type='search' placeholder='Search for task' maxLength={30}
                        onKeyUp={displayingSearchHandler} className={styles.content_dock__first_section_search} />
                <div className={styles.content_dock__first_section_btn_box}>
                    <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate
                            key='overlay_box_template' 
                            contentHandler={contentHandler} 
                            content={<NewFolderLayout />} />
                    ])}
                            className={styles.content_dock__first_section_btn}>Add Folder</button>
                    <button onClick={_ => contentHandler([
                        <OverlayBoxTemplate
                            key='overlay_box_template' 
                            contentHandler={contentHandler} 
                            content={<NewListLayout />} />
                    ])}
                            className={styles.content_dock__first_section_btn}>Add List</button>
                </div>
            </div>
            <div className={styles.content_dock__second_section}>
                {
                    <ContentDockItems />
                }
            </div>
        </div>
    )
}

export default ContentDock
