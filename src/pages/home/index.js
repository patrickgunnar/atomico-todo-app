import Head from 'next/head'
import { useContext } from 'react'
import ApplicationContext from '../../store/application-context'
import { useEffect } from 'react'
import Router from 'next/router'
import OverlayBoxTemplate from '../../components/overlay-box/OverlayBoxTemplate'
import NotificationLayout from '../../components/notification-layout/NotificationLayout'

import styles from './page.module.css'
import ProfileLayout from '../../components/home-components/profile-layouts/ProfileLayout'
import ContentDock from '../../components/home-components/content-dock/ContentDock'
import MainContent from '../../components/home-components/main-content/MainContent'


export default function Home() {
	// notification handler
	const notificationHandler = useContext(ApplicationContext).notificationHandler
	// current user context
	const currentUser = useContext(ApplicationContext).user
	// get data context handler
    const currentUserData = useContext(ApplicationContext).currentData
	// get current home screen data
	const currentHomeData = useContext(ApplicationContext).currentHomeData

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
		// function to show the menu on mobile version
		const displayMenuHandler = (ev) => {
			if(ev.target !== ev.currentTarget) return

			// first child element
			const currentElement = ev?.target
			// parent element
			const currentElementParent = currentElement?.parentElement
			// other children
			const currentElementParentChildren = [...currentElementParent?.children].filter(tag => tag.localName === 'div')[0]

			if(currentElementParentChildren) {
				if(currentElementParent.classList.contains(styles.home_page__main_content_left_box_mobile_opened)) {
					currentElementParentChildren.classList.remove(styles.home_page__main_mobile_menu_opened)
					currentElementParent.classList.remove(styles.home_page__main_content_left_box_mobile_opened)
					currentElement.classList.remove(styles.home_page__main_mobile_btn_opened)
		
				} else {
					currentElementParent.classList.add(styles.home_page__main_content_left_box_mobile_opened)
					currentElementParentChildren.classList.add(styles.home_page__main_mobile_menu_opened)
					currentElement.classList.add(styles.home_page__main_mobile_btn_opened)
				}
			}
		}

		// render the page elements
		return (
			<>
				<Head>
					<title>Home - The Atomo To Do App</title>
					<meta name="description" content="Home of the Atomic To Do List" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main className={styles.home_page__main}>
					{currentUser && currentUserData && (
						<section className={styles.home_page__main_content_section}>
							<div className={styles.home_page__main_content_left_box_mobile}>
								<button onClick={displayMenuHandler}
										className={styles.home_page__main_mobile_btn}></button>
								<div className={styles.home_page__main_mobile_menu}>
									<ProfileLayout />
									<ContentDock />
								</div>
							</div>
							<div className={styles.home_page__main_content_left_box}>
								<ProfileLayout />
								<ContentDock />
							</div>
							<div className={styles.home_page__main_content_right_box}>
								<MainContent contentData={currentHomeData} />
							</div>
						</section>
					)}
				</main>
			</>
		)
	}
}
