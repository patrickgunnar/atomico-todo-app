import TaskLayout from '../task-layout/TaskLayout'
import styles from './ContentTable.module.css'


const ContentTable = ({ contentData, children, inheritClasse='', inheritTaskClasse='' }) => {
    // if no data to be displayed
    const noDataDisplay = (<div className={styles.content_table__content__empty}><p>No task to display</p></div>)

    // loop over passed data to create the task layout
    // return an array with the elements to be render
    const displayingCurrentData = (data) => {
        if(data !== undefined) {
            if(data.length > 0) return data.map(item => <TaskLayout inheritClasse={inheritTaskClasse} key={item.id} currentTask={item} />)
        }

        return noDataDisplay
    }

    // loop over passed data to create the task layout - ON SERACH
    // return an array with the elements to be render
    const displayingCurrentDataOnSearch = (data) => {
        if(data !== undefined) {
            if(data.length > 0) return data.map(item => <TaskLayout inheritClasse={inheritTaskClasse} key={item.id} currentTask={item} />)
        }

        return noDataDisplay
    }

    // render elements
    return (
        <div className={`${styles.content_table__main_section} ${inheritClasse}`}>
            {children}
            {
                contentData[0]?.content && (
                    <div className={styles.content_table__main_content}>
                        {displayingCurrentData(contentData[0].content)}
                    </div>
                )
            }
            {
                !contentData[0]?.content && contentData.length > 0 && (
                    <div className={styles.content_table__main_content_on_search}>
                        {displayingCurrentDataOnSearch(contentData)}
                    </div>
                )
            }
        </div>
    )
}

export default ContentTable
