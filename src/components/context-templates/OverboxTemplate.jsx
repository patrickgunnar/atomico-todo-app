import { useContext } from "react"
import ApplicationContext from "../../store/application-context"


// Overflow box 
const OverboxTemplate = () => {
    const contentElement = useContext(ApplicationContext).content // get context content

    // return the content
    return (<>{contentElement}</>)
}

export default OverboxTemplate
