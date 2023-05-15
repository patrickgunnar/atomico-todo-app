import Head from 'next/head'
import { useContext } from 'react'
import ApplicationContext from '../../store/application-context'
import Router from 'next/router'
import { useEffect } from 'react'

import styles from './page.module.css'
import OverlayBoxTemplate from '../../components/overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../components/notification-layout/NotificationLayout'
import AddingOtherTask from '../../components/other-components/AddingOtherTask'
import NavigationHeader from '../../components/nav-header/NavigationHeader'
import ContentTable from '../../components/content-table/ContentTable'
import { gettingDataTasks, monthList } from '../../components/data-handler/display-data'
import { generatingCalenderDays, setZeroInFront } from '../../components/data-handler/extra-functions'


export default function Calender() {
	// notification handler
	const notificationHandler = useContext(ApplicationContext).notificationHandler
	// current user context
	const currentUser = useContext(ApplicationContext).user
	// get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
	// get content context handler
    const contentHandler = useContext(ApplicationContext).contentHandler
	// get current date content
	const currentDate = useContext(ApplicationContext).currentDate
	// get current date handler
	const currentDateHandler = useContext(ApplicationContext).currentDateHandler
	// get selected date
	const selectedDate = useContext(ApplicationContext).selectedDate
	// get selected date handler
	const selectedDateHandler = useContext(ApplicationContext).selectedDateHandler

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
	if (currentUser && currentUserData && currentDate && selectedDate) {
		const prevMonth = (date) => { // function get previous month
			const dateElements = date.split('-')
			let currentMonth = parseInt(dateElements[1]) // current context month
			let currentYear = parseInt(dateElements[0]) // current context year
			
			currentMonth -= 1 // sub 1 to the current month
		
			if(currentMonth < 1) { // if currentMonth is less than 0
				currentMonth = 12 // set currentMonth to 11 (December)
				currentYear -= 1 // sub 1 to the current year
			}
		
			currentDateHandler(`${currentYear}-${setZeroInFront(currentMonth)}-01`) // changing date
		}
	
		const nextMonth = (date) => { // function to get next month
			const dateElements = date.split('-')
			let currentMonth = parseInt(dateElements[1]) // current context month
			let currentYear = parseInt(dateElements[0]) // current context year
		
			currentMonth += 1 // sum 1 to the current month
		
			if(currentMonth > 12) { // if currentMonth is greater than 11
				currentMonth = 1 // set currentMonth to 0 (January)
				currentYear += 1 // sum 1 to the current year 
			}
		
			currentDateHandler(`${currentYear}-${setZeroInFront(currentMonth)}-01`) // changing date
		}
		
		// creates the calender template
		const currentCalender = generatingCalenderDays(currentDate, selectedDateHandler, 
									styles.calender_page__calender_inactive, 
									styles.calender_page__calender_today)

		const monthString = `${monthList[currentCalender[0]]} of ${currentCalender[1]}`
		// get the tasks of selected day
		const calenderElements = gettingDataTasks(currentUserData, 'from-calender', selectedDate, null)
		// if no tasks, show "No content to display"
		const currentElement = calenderElements.length === 0 ? (
									<div className={styles.calender_page__content__empty}><p>No content to display</p></div>) : (<></>)

		// render the page elements
		return (
			<>
				<Head>
					<title>Calender - The Atomo To Do App</title>
					<meta name="description" content="Calender of the Atomic To Do List" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.calender_page__main}>
					{currentUser && currentUserData && currentDate && selectedDate && (
						<>
							<section className={styles.calender_page__header_content_section}>
								<NavigationHeader currentName="My Calender's Task" inheritClasse={styles.calender_page__header_table} />
								<div className={styles.calender_page__header_content_calender}>
									<section className={styles.calender_page__calender_header}>
										<button onClick={_ => prevMonth(currentDate)}
												className={styles.calender_page__calender_nav}>Previous</button>
										<h4 className={styles.calender_page__calender_title}>{monthString}</h4>
										<button onClick={_ => nextMonth(currentDate)}
												className={styles.calender_page__calender_nav}>Next</button>
									</section>
									<section className={styles.calender_page__calender_main_content}>
										<div className={styles.calender_page__calender_main_content_week_days_group}>
											<div key='mon' className={styles.calender_page__calender_main_content_week_days}><p>Mon</p></div>
											<div key='tue' className={styles.calender_page__calender_main_content_week_days}><p>Tue</p></div>
											<div key='wed' className={styles.calender_page__calender_main_content_week_days}><p>Wed</p></div>
											<div key='thu' className={styles.calender_page__calender_main_content_week_days}><p>Thu</p></div>
											<div key='fri' className={styles.calender_page__calender_main_content_week_days}><p>Fri</p></div>
											<div key='sat' className={styles.calender_page__calender_main_content_week_days}><p>Sat</p></div>
											<div key='sun' className={styles.calender_page__calender_main_content_week_days}><p>Sun</p></div>
										</div>
										<div className={styles.calender_page__calender_main_content_days}>
											{currentCalender[2]}
										</div>
									</section>
								</div>
							</section>
							<section className={styles.calender_page__main_content_section}>
								<ContentTable contentData={calenderElements} 
											inheritClasse={styles.calender_page__main_table} 
											inheritTaskClasse={styles.calender_page__main_table_task}>
									<div className={styles.calender_page__content_header}>
										<button onClick={_ => contentHandler([
											<OverlayBoxTemplate key='overlay_box_template' 
												contentHandler={contentHandler} 
												content={<AddingOtherTask isFavourite={false} />} />
										])}>Add Task</button>
									</div>
									{currentElement}
								</ContentTable>
							</section>
						</>)
					}
				</main>
			</>
		)
	}
}
