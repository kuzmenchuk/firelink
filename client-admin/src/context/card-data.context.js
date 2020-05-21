import {
    createContext
} from 'react'


const DataContext = createContext({
    linkname: null,
    data: {
        analytics: {
            facebook: null,
            google: null
        },
        design: {
            background: {
                isColor: true,
                color: null,
                image: null,
                imageUrl: null
            },
            branding: true
        },
        links: [],
        messengers: [],
        products: [],
        profileAbout: {
            description: null,
            fullname: null,
            photoUrl: null
        }
    }
})

export default DataContext;