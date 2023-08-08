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
					<h1>Introducing Atomico: Where Productivity Meets Artistry in Perfect Harmony</h1>
					<div className={styles.about_page__main_text}>
						<div>
					            <h2>Next.js: Pioneering Seamlessness and Agility</h2>
					            <p>Atomico's foundation is built upon <strong>Next.js</strong>, ensuring your tasks are at your fingertips in an instant. With the power of server-side rendering and dynamic routing, navigating through your to-do list is a breeze, offering unparalleled performance and eliminating the need for tedious page reloads.</p>
					        </div>
					        <div>
					            <h2>React.js: Breathing Life into Your Tasks</h2>
					            <p>Infused with <strong>React.js</strong>, Atomico boasts an interface that's as dynamic as your thoughts. Seamlessly transitioning between tasks, each interaction is a testament to the fluidity of modern web applications. Your to-do list becomes a canvas of interactivity, responding to your every command with grace.</p>
					        </div>
					        <div>
					            <h2>HTML5 & CSS: A Visual Symphony of Elegance</h2>
					            <p>The visual masterpiece of Atomico is a symphony of colors, typography, and layout crafted using <strong>HTML5</strong> and <strong>CSS</strong>. It's not just about task management; it's about indulging in an aesthetic journey. Every pixel is meticulously placed, ensuring that your to-do list is not only organized but also visually pleasing.</p>
					        </div>
					        <div>
					            <h2>MongoDB: Fortifying Your Data with Security</h2>
					            <p>Behind the scenes, Atomico relies on <strong>MongoDB</strong> to safeguard your tasks. Your data finds a secure haven, shielded by the robustness of this database technology. Atomico ensures that your tasks remain private and accessible only to you, embodying the essence of security and reliability.</p>
					        </div>
					        <div>
					            <h2>JavaScript: Unleashing Interactive Magic</h2>
					            <p><strong>JavaScript</strong> lends Atomico its enchanting interactivity. Your actions have real-time effects, creating a user experience that's engaging and immersive. It's not just a to-do list; it's a playground of interaction where your tasks respond to your commands with delightful responsiveness.</p>
					        </div>
					        <div>
					            <h2>Next Auth: Personalization at Your Fingertips</h2>
					            <p>Atomico incorporates <strong>Next Auth</strong> to grant you effortless registration and login capabilities. The secure integration guarantees your privacy, allowing you to personalize your to-do list journey. It's a portal to your tasks, ensuring that you have the keys to a tailored and secure experience.</p>
					        </div>
					        <div>
					            <h2>Aesthetic Marvels: Animated Backgrounds and Beyond</h2>
					            <p>Prepare to be mesmerized by Atomico's visual elegance. An animated background welcomes you, setting the stage for a productive day. With every task you conquer, you contribute to this dynamic canvas of productivity. It's not just about checking tasks off; it's about crafting a visual narrative of accomplishment.</p>
					        </div>
					        <div>
					            <h2>In the realm of task management...</h2>
					            <p>Atomico stands as a testament to the seamless fusion of technology and aesthetics. It embodies the essence of innovation brought to life through <strong>Next.js</strong>, <strong>React.js</strong>, <strong>HTML5</strong>, <strong>CSS</strong>, <strong>MongoDB</strong>, <strong>JavaScript</strong>, and <strong>Next Auth</strong>. Welcome to Atomico, where the mundane becomes exceptional and the ordinary transforms into the extraordinary – a realm where productivity meets artistry in perfect harmony.</p>
					        </div>
					</div>
					<footer>© <a href="https://www.linkedin.com/in/patrickgunnar/" className={styles.about_page__margin}>Patrick Gunnar</a> - All Rights Reserved</footer>
				</section>
			</main>
		</>
	)
}
