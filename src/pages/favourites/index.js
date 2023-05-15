import Head from 'next/head'
import { useContext } from 'react'
import ApplicationContext from '../../store/application-context'
import { useEffect } from 'react'
import Router from 'next/router'

import styles from './page.module.css'
import OverlayBoxTemplate from '../../components/overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../components/notification-layout/NotificationLayout'
import { gettingDataTasks } from '../../components/data-handler/display-data'
import NavigationHeader from '../../components/nav-header/NavigationHeader'
import ContentTable from '../../components/content-table/ContentTable'
import AddingOtherTask from '../../components/other-components/AddingOtherTask'


export default function Favourite() {
	// notification handler
	const notificationHandler = useContext(ApplicationContext).notificationHandler
	// current user context
	const currentUser = useContext(ApplicationContext).user
	// get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
	// get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler

	// if there's no user or user data redirect to "/" main --> login, register or run no save page
	useEffect(() => {
		if(!currentUser && !currentUserData) {
			Router.push('/')
			notificationHandler([
				<OverlayBoxTemplate
					key='notification_box_template' 
					contentHandler={notificationHandler} 
					content={
						<NotificationLayout
							title='Content Error'
							content='No current user set or data: make login, register or select "No Saving Run" option.' />
					} />
			])
		}
	}, [])

	// if there's user and user data render my day page
	if(currentUser && currentUserData) {
		// get the favourite tasks
		const favouriteElements = gettingDataTasks(currentUserData, 'from-favourite', null, null)
		// if no tasks, show "No content to display"
		// if tasks, show "Add Task" button
		const currentElement = favouriteElements.length === 0 ? (
								<div className={styles.favourite_page__content__empty}><p>No content to display</p></div>) : (
								<div className={styles.favourite_page__content_header}>
									<button onClick={_ => contentHandler([
										<OverlayBoxTemplate
											key='overlay_box_template' 
											contentHandler={contentHandler} 
											content={<AddingOtherTask />} />
									])}>Add Task</button>
								</div>)

		// render the page elements
		return (
			<>
				<Head>
					<title>Favourite - The Atomo To Do App</title>
					<meta name="description" content="Favourite of the Atomic To Do List" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.favourite_page__main}>
					{currentUser && currentUserData && (
						<section className={styles.favourite_page__main_content_section}>
							<NavigationHeader currentName="My Favourite's Task" />
							<ContentTable contentData={favouriteElements}>
								{currentElement}
							</ContentTable>
						</section>
					)}
				</main>
			</>
		)
	}
}
