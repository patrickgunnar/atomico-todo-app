// place a 0 in front of a number less than 10
const formatNumTo2Pos = (num) => `${(num < 10 ? '0' : '')}${num}`

// get current date
const getCurrentDate = () => {
    const date = new Date()

    return `${date.getFullYear()}-${formatNumTo2Pos(date.getMonth() + 1)}-${formatNumTo2Pos(date.getDate())}`
}

// no user run profile date
export const noCurrentUserProfileData = {
    user: 'no-current-user',
    email: 'no-current-email',
    photo: 'no-current-photo'
}

// no user run start date
export const noCurrentUserStartData = [
    {
        "name": "Colection of Atoms",
        "id": "FOLDER202302260842181051679830938105",
        "folder": true,
        "lists": [
            {
                "name": "Work Meetings",
                "id": "FOLDER202302260842181051679830938105LIST202302260842324201679830952420",
                "content": [
                    {
                        "text": "Meet Max at the Buena Restaurent at 13 o'clock.",
                        "id": "FOLDER202302260842181051679830938105LIST202302260842324201679830952420TASK202302260838352091679830715209",
                        "date": getCurrentDate(),
                        "favourite": false,
                        "complete": false,
                    },
                    {
                        "text": "After lunch with Max at the Buena Restaurent, go to Karl's office.",
                        "id": "FOLDER202302260842181051679830938105LIST202302260842324201679830952420TASK202302260841241871679830589414",
                        "date": getCurrentDate(),
                        "favourite": true,
                        "complete": true,
                    }
                ]
            },
            {
                "name": "Relaxing Time",
                "id": "FOLDER202302260842181051679830938105LIST202302260854158741679830974136",
                "content": [
                    {
                        "text": "Go to the movies at 18:30.",
                        "id": "FOLDER202302260842181051679830938105LIST202302260854158741679830974136TASK202302260850332091679830487510",
                        "date": getCurrentDate(),
                        "favourite": false,
                        "complete": false,
                    },
                    {
                        "text": "Sarah's Spa at 15:00.",
                        "id": "FOLDER202302260842181051679830938105LIST202302260854158741679830974136TASK202302260821402091679830325601",
                        "date": getCurrentDate(),
                        "favourite": true,
                        "complete": false,
                    }
                ]
            }
        ]
    },
    {
        "name": "Atomic To Dos",
        "id": "LIST202302260838098481679830689848",
        "folder": false,
        "content": [
            {
                "text": "Meet college friends at the Joe's bar",
                "id": "LIST202302260838098481679830689848TASK202302260901162091679830687924",
                "date": getCurrentDate(),
                "favourite": true,
                "complete": false
            },
            {
                "text": "Microsoft's event at noon",
                "id": "LIST202302260838098481679830689848TASK202302260960112091679830457102",
                "date": getCurrentDate(),
                "favourite": false,
                "complete": false,
            }
        ]
    }
]

export default function handler(req, res) {
    if(req.method === 'GET') {
        res.status(201).json({
            title: 'Successfully Start', 
            message: 'The app started successfully, but with no account logged in to save the data.',
            status: true,
            content: [
                JSON.stringify(noCurrentUserProfileData),
                JSON.stringify(noCurrentUserStartData)
            ]
        })

        return
    }

    res.status(400).json({
        title: 'Process Error', 
        message: 'An error occurred while attempting to process the request!',
        status: false
    })

    return
}
