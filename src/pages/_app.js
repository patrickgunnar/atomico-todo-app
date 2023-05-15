import CanvasTemplate from '../components/animated-canvas/canvas-template'
import MainContent from '../components/main-content/MainContent'
import Navbar from '../components/navbar/Navbar'
import { ApplicationContextProvider } from '../store/application-context'
import OverboxTemplate from '../components/context-templates/OverboxTemplate'
import LoadingTemplate from '../components/context-templates/LoadingTemplate'
import NotificationTemplate from '../components/context-templates/NotificationTemplate'
import SavingIntoDBTemplate from '../components/context-templates/SavingIntoDBTemplate'
import '../styles/globals.css'


export default function App({ Component, pageProps }) {
	return (
		<>
			<CanvasTemplate />
			<ApplicationContextProvider>
				<Navbar />
				<MainContent>
					<Component {...pageProps} />
				</MainContent>
				<OverboxTemplate />
				<NotificationTemplate />
				<LoadingTemplate />
				<SavingIntoDBTemplate />
			</ApplicationContextProvider>
		</>
	)
}
