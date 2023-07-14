import Head from 'next/head'
import styles from './page.module.css'


export default function Home() {
	const aboutData = `Hello, I'm Patrick Gunnar, I am a full-stack web developer. 
 	I'm collaborative and motivated team player who is passionate about finding solutions to problems. 
  	I have over two years of experience in coding programming languages, frameworks, and libraries, 
   	using bootcamps and other resouces to learn. I am proficient in Next.js, React.js, JavaScript, 
    	TypeScript, HTML 5, CSS, tailwind and python. The Atomico To-Do List is a personal project of mine, 
     	I wanted this application to be more than just a simple to-do list application. 
      	I design it to be colourful and animated, using Next.js, React.js, HTML 5, CSS, MongoDB and JavaScript. 
       	The application is completelly done and functional from the front-end to the back-end and database, 
	I used for the registration and login handlers of this app, the Next Auth built-in tecnology.`  

	return (
		<>
			<Head>
				<title>About - The Atomo To Do App</title>
				<meta name="description" content="About of the Atomic To Do List" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.about_page__main}>
				<section className={styles.about_page__main_section}>
					<h1>About</h1>
					<div>
						<p className={styles.about_page__main_text}>{aboutData}</p>
					</div>
					<footer>© <a href="https://www.linkedin.com/in/patrickgunnar/" style="margin: 0 2px;">Patrick Gunnar</a> - All Rights Reserved</footer>
				</section>
			</main>
		</>
	)
}
