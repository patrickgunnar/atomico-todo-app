import { useContext } from 'react'
import ContentTable from '../../content-table/ContentTable'
import NavigationHeader from '../../nav-header/NavigationHeader'
import OverlayBoxTemplate from '../../overlay-box/OverlayBoxTemplate'
import styles from './MainContent.module.css'
import ApplicationContext from '../../../store/application-context'
import AddTaskLayout from './AddTaskLayout'


const MainContent = ({ contentData }) => {
    // get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler

    // if contentData is empty, renders no content msg
    // if contentData length is one and there's content name, renders the add task button
    // else is at search, does not render element
    const [ currentTitle, currentElement ] = contentData.length === 0 ? [
        'Home Page', <div className={styles.main_data__content__empty}><p>No content to display</p></div>
    ] : ((contentData.length === 1 && contentData[0]?.name) ? [
        contentData[0].name, <div className={styles.main_data__content_header}>
                                <button onClick={_ => contentHandler([
                                    <OverlayBoxTemplate
                                        key='overlay_box_template' 
                                        contentHandler={contentHandler} 
                                        content={<AddTaskLayout currentId={contentData[0].id} />} />
                                ])}>Add Task</button>
                            </div>
    ] : ['Search', <></>])

    // render elements
    return (
        <section className={styles.main_data__content_section}>
            <NavigationHeader currentName={currentTitle} />
            <ContentTable contentData={contentData}>
                {currentElement}
            </ContentTable>
        </section>
    )
}

export default MainContent
