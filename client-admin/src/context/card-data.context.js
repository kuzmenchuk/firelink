import {
    createContext
} from 'react'

function noop() {};

const DataContext = createContext({
    save: noop,
    loading: false,
    request: noop,
    error: null,
    clearError: noop,
    exit: noop,
    theDataObject: {},
    changeProfile: noop,
    profile: {},
    changeDesign: noop,
    changeLinks: noop,
    changeMessengers: noop,
    changeProducts: noop
})

export default DataContext;