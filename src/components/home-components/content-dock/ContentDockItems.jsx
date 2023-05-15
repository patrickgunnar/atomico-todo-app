import styles from './ContentDockItems.module.css'
import { useContext } from 'react'
import ApplicationContext from '../../../store/application-context'
import { filteringSelectedDataFromFolderHandler, filteringSelectedDataHandler } from '../../data-handler/display-data'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import SettingsLayout from '../dock-layouts/SettingsLayout'


const ContentDockItems = () => {
    // get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
    // get current home screen data
	const CurrentHomeDataHandler = useContext(ApplicationContext).currentHomeDataHandler
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
    // get home id handler 
    const homeDataIDHandler = useContext(ApplicationContext).homeDataIDHandler
    // get opened folders
    const openedFolder = useContext(ApplicationContext).openedFolder
    // set opened folders
    const openedFolderHandler = useContext(ApplicationContext).openedFolderHandler

    // display selected list data from outside folder
    const displayingElementDataList = (id) => {
        CurrentHomeDataHandler(filteringSelectedDataHandler(currentUserData, id))
        homeDataIDHandler(id)
    }

    // display selected list data from inside folder
    const displayingElementDataListInFolder = (parentId, childId) => {
        CurrentHomeDataHandler(filteringSelectedDataFromFolderHandler(currentUserData, parentId, childId))
        homeDataIDHandler(childId)
    }

    // folder or list setting layout
    const settingsDisplayHandler = (currentName, currentId, parentId) => {
        contentHandler([
            <OverlayBoxTemplate
                key='overlay_box_template' 
                contentHandler={contentHandler} 
                content={<SettingsLayout currentName={currentName} currentId={currentId} parentId={parentId} />} />
        ])
    }

    // using css to open a folder or close it
    const applyingOpenedClass = (currentElement, currentElementParent, currentElementParentChildren, id) => {
        if(currentElementParentChildren && currentElementParentChildren.length > 0) {
            // if folder is opened
            if(currentElementParent.classList.contains(styles.content_dock__items_folder_opened)) {
                openedFolderHandler(openedFolder.filter(item => item !== id))

                currentElementParentChildren.forEach(element => {
                    element.classList.remove(styles.content_dock__items_folder_content_display)
                });
    
                currentElementParent.classList.remove(styles.content_dock__items_folder_opened)
                currentElement.classList.remove(styles.content_dock__items_folder_header_opened)
    
                // if folder is close
            } else {
                openedFolderHandler([...openedFolder, id])
                currentElement.classList.add(styles.content_dock__items_folder_header_opened)
                currentElementParent.classList.add(styles.content_dock__items_folder_opened)
    
                currentElementParentChildren.forEach(element => {
                    element.classList.add(styles.content_dock__items_folder_content_display)
                });
            }
        }
    }

    // openiing folder function call
    const openingFolderHandler = (id, ev) => {
        if(ev.target !== ev.currentTarget) return

        // get dt element
        const currentElement = ev?.target
        // get dl element
        const currentElementParent = currentElement?.parentElement
        // get all dds elements
        const currentElementParentChildren = [...currentElementParent?.children].filter(tag => tag.localName === 'dd')

        applyingOpenedClass(currentElement, currentElementParent, currentElementParentChildren, id) 
    }

    // content dock items to be return
    const currentItems = currentUserData.map(item => {
        // if folder, receives the lists inside of it
        // if list, keeps empty
        let currentItemLists = []
        // varibales receives a function to display data, if is a list outside folder
        // if a folder, it changes the function to be call
        let currentListFolderHandler = displayingElementDataList.bind(this, item.id)
        // variable receives a css class to be applied on lists outside folder
        // if a folder, it changes the class
        let currentListFolderClass = styles.content_dock__items_list_item
        // css classes array to be applied to folders and lists inside folders
        // if the current folder is opened
        const currentIsOpened = openedFolder.includes(item.id) ? [
            styles.content_dock__items_folder_opened,
            styles.content_dock__items_folder_header_opened,
            styles.content_dock__items_folder_content_display
        ] : ''

        if(item.folder === true) {
            // if folder has at least one list inside of it
            // variable receives the function to open the folder
            // else receives null
            currentListFolderHandler = item.lists.length > 0 ? openingFolderHandler.bind(this, item.id) : null
            // variable receives the css class to be applied on folders
            currentListFolderClass = `${styles.content_dock__items_list_item} ${styles.content_dock__items_folder_item}`

            currentItemLists = item.lists.map(list => {
                // return an inside list
                // dd on click => call function to display the data
                // button on click => call function to display the settings layout
                return (
                    <dd onClick={displayingElementDataListInFolder.bind(this, item.id, list.id)}
                        key={list.id} className={`${styles.content_dock__items_list_item} ${styles.content_dock__items_folder_list} ${currentIsOpened[2]}`}>
                        <p className={styles.content_dock__items_list_item_title}>{list.name}</p>
                        <button onClick={settingsDisplayHandler.bind(this, list.name, list.id, item.id)}
                                className={styles.content_dock__items_list_item_settings}></button>
                    </dd>
                )
            })
        }

        // return a outside list or folder
        // dt on click => call function to display the data
        // button on click => call function to display the settings layout
        return (
            <dl key={item.id} className={`${styles.content_dock__items_list_folder} ${currentIsOpened[0]}`}>
                <dt id={item.id} onClick={currentListFolderHandler} className={`${currentListFolderClass} ${currentIsOpened[1]}`}>
                    <p className={styles.content_dock__items_list_item_title}>{item.name}</p>
                    <button onClick={settingsDisplayHandler.bind(this, item.name, item.id, undefined)}
                            className={styles.content_dock__items_list_item_settings}></button>
                </dt>
                {currentItemLists}
            </dl>
        )
    })

    // return elements
    return (
        <>
            {
                (currentItems.length > 0) ? currentItems : (
                    <div className={styles.content_dock__items_empty}>
                        <p className={styles.content_dock__items_empty_title}>
                            Add new list or folder
                        </p>
                    </div>
                )
            }
        </>
    )
}

export default ContentDockItems
