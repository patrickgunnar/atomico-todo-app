import { useContext } from "react"
import ApplicationContext from "../../../store/application-context"
import LoginRegisterBtn from "./LoginRegisterBtn"
import ProfileContent from "./ProfileContent"


const ProfileLayout = () => {
    // current user context
	const currentUser = useContext(ApplicationContext).user

    // render layout
    return (currentUser.user === 'no-current-user') ? <LoginRegisterBtn /> : <ProfileContent />
}

export default ProfileLayout
