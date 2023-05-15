import Head from 'next/head'
import { useContext } from 'react'
import HomeNoSessionLayout from '../components/home-no-session/HomeNoSessionLayout'
import ApplicationContext from '../store/application-context'
import Router from 'next/router'
import { useEffect } from 'react'

import styles from './Home.module.css'


export default function Home() {
	// current user context
	const currentUser = useContext(ApplicationContext).user
	// get data context handler
    const currentUserData = useContext(ApplicationContext).currentData

	// if user, redirect to "home" page
	useEffect(() => {
		if(currentUser && currentUserData) Router.push('/home')
	})

	// render elements
	return (
		<>
			<Head>
				<title>The Atomo To Do App</title>
				<meta name="description" content="The Atomic To Do List" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main_content__holder}>
				{!currentUser && !currentUserData && (<HomeNoSessionLayout />)}
			</main>
		</>
	)
}
