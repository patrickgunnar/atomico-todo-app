import { createContext, useState } from "react";
import { useEffect } from 'react'
import LoadingLayout from "../components/loading-layout/LoadingLayout";
import SavingIntoDBLayout from "../components/saving-into-db-layout/SavingIntoDBLayout";
import SavingIntoDBErrorLayout from '../components/saving-into-db-layout/SavingIntoDBErrorLayout'
import { gettingTodaysDate } from '../components/data-handler/display-data'


// Create context
const ApplicationContext = createContext({
    user: {},
    userHandler: (data) => {},
    currentPage: {},
    currentPageHandler: (navIds, navIdx, isNav) => {},
    naviagtion: '',
    navigationHandler: (opt) => {},
    loading: [],
    loadingHandler: (state) => {}, 
    content: [],
    contentHandler: (content) => {},
    notificationContent: [],
    notificationHandler: (content) => {},
    currentData: [],
    currentDataHandler: (data) => {},
    savingIntoDB: [],
    savingIntoDBHandler: (isSaved) => {},
    currentHomeData: [],
    currentHomeDataHandler: (data) => {},
    currentDate: '',
    currentDateHandler: (date) => {},
    selectedDate: '',
    selectedDateHandler: (date) => {},
    homeDataID: '',
    homeDataIDHandler: (id) => {},
    openedFolder: [],
    openedFolderHandler: (ids) => {}
})

export const ApplicationContextProvider = ({ children }) => {
    // set user data
    const [ currentUser, setCurrentUser ] = useState(null)
    // set data to be display on home screen
    const [ currentHomeUserData, setCurrentHomeUserData ] = useState([])
    // set current navigation button
    const [ currentUserPage, setCurrentUserPage ] = useState({navIds: ['home'], navIdx: 0, isNav: false})
    // set navbar option
    const [ currentNavbar, setCurrentNavbar ] = useState('')
    // set loading to true or false
    const [ isLoading, setIsLoading ] = useState([])
    // set content element
    const [ contentElement, setContentElement ] = useState([])
    // set notification element
    const [ notificationElement, setNotificationElement ] = useState([])
    // set user data
    const [ currentUserData, setCurrentUserData ] = useState(null)
    // set saving into db loader to true or false
    const [ isSavingIntoDB, setIsSavingIntoDB ] = useState([])
    // set current date to calender
    const [ currentTodayDate, setCurrentDate ] = useState(gettingTodaysDate())
    // set selected date to calender
    const [ currentSelectedDate, setCurrentSelectedDate ] = useState(gettingTodaysDate())
    // set current data to be displayed at home
    const [ currentHomeDataID, setCurrentHomeDataID ] = useState('')
    // set current folder opened
    const [ currentOpenedFolder, setCurrentOpenedFolder ] = useState([])

    // navigation bar useEffect
    useEffect(() => {
        // get current pathname from the browser
        let currentLocation = location.pathname

        // if current pathname is not '/', replaces the dash for nothing, return the page name
        // if current pathname is '/', return 'home' page name
        currentLocation = currentLocation !== '/' ? currentLocation.replace('/', '') : 'home'
        setCurrentNavbar(currentLocation)
    })

    // user handler
    const currentUserHandler = (data) => {
        setCurrentUser(data)
    }

    // nav page handler
    const setCurrentUserPageHandler = (navIds, navIdx, isNav) => {
        setCurrentUserPage({
            navIds: navIds,
            navIdx: navIdx,
            isNav: isNav
        })
    }

    // navigation bar handler
    const navigationBarHandler = (opt) => {
        setCurrentNavbar(opt)

        if(currentUserPage.isNav) {
            currentUserPage.navIds = currentUserPage.navIds.slice(0, currentUserPage.navIdx + 1)
            currentUserPage.isNav = false
            currentUserPage.navIds.push(opt)
            currentUserPage.navIdx = currentUserPage.navIds.length - 1
        } else {
            if(currentUser !== null && opt !== 'about') {
                currentUserPage.navIds.push(opt)
                currentUserPage.navIdx = currentUserPage.navIds.length - 1
                currentUserPage.isNav = false
            }
        }
    }

    // loading handler
    const loadingHandler = (state = false) => {
        if(state) setIsLoading([<LoadingLayout key='loading-layout' />])
        else setIsLoading([])
    }

    // content handler
    const contentElementHandler = (content) => {
        setContentElement(content)
    }

    // content handler
    const notificationElementHandler = (content) => {
        setNotificationElement(content)
    }

    // user data handler
    const userDataHandler = (data) => {
        setCurrentUserData(data)
    }

    // saving handler
    const savingUserDataIntoDBHandler = (isSaved = 'clear') => {
        if(isSaved === 'true') setIsSavingIntoDB([<SavingIntoDBLayout key='saving-into-db-layout' />])
        else if(isSaved === 'false') setIsSavingIntoDB([<SavingIntoDBErrorLayout key='saving-into-db-error-layout' />])
        else if(isSaved === 'clear') setIsSavingIntoDB([])
    }

    // home screen data handler
    const setCurrentHomeUserDataHandler = (data) => {
        setCurrentHomeUserData(data)
    }

    // date handler
    const currentTodayDateHandler = (date) => {
        setCurrentDate(date)
    }

    // selected date handler
    const currentSelectedDateHandler = (date) => {
        setCurrentSelectedDate(date)
    }

    // save current home data id 
    const homeDataIDHandler = (id) => {
        setCurrentHomeDataID(id)
    }

    // current opened folder
    const currentOpenedFolderHandler = (ids) => {
        setCurrentOpenedFolder(ids)
    }

    // current context
    const context = {
        user: currentUser,
        userHandler: currentUserHandler,
        currentPage: currentUserPage,
        currentPageHandler: setCurrentUserPageHandler,
        naviagtion: currentNavbar,
        navigationHandler: navigationBarHandler,
        loading: isLoading,
        loadingHandler: loadingHandler,
        content: contentElement,
        contentHandler: contentElementHandler,
        notificationContent: notificationElement,
        notificationHandler: notificationElementHandler,
        currentData: currentUserData,
        currentDataHandler: userDataHandler,
        savingIntoDB: isSavingIntoDB,
        savingIntoDBHandler: savingUserDataIntoDBHandler,
        currentHomeData: currentHomeUserData,
        currentHomeDataHandler: setCurrentHomeUserDataHandler,
        currentDate: currentTodayDate,
        currentDateHandler: currentTodayDateHandler,
        selectedDate: currentSelectedDate,
        selectedDateHandler: currentSelectedDateHandler,
        homeDataID: currentHomeDataID,
        homeDataIDHandler: homeDataIDHandler,
        openedFolder: currentOpenedFolder,
        openedFolderHandler: currentOpenedFolderHandler
    }

    return ( // Render the Elements
        <ApplicationContext.Provider value={context}>
            {children}
        </ApplicationContext.Provider>
    )
}

export default ApplicationContext
