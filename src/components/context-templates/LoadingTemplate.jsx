import { useContext } from "react"
import ApplicationContext from "../../store/application-context"


const LoadingTemplate = () => {
    const loadingElement = useContext(ApplicationContext).loading // get context content

    // return the loading
    return (<>{loadingElement}</>)
}

export default LoadingTemplate
