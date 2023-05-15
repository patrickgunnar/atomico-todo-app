import { useContext } from "react"
import ApplicationContext from "../../store/application-context"


const SavingIntoDBTemplate = () => {
    const savingDBElement = useContext(ApplicationContext).savingIntoDB // get context content

    // return the loading
    return (<>{savingDBElement}</>)
}

export default SavingIntoDBTemplate
