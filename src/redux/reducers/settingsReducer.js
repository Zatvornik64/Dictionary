import { LOAD_SETTINGS, UPDATE_SETTINGS } from "../types"

const initialState = {
    settings: {
        langNum: 2, 
        lang1Caption: "Русский",
        lang2Caption: "Английский",
        lang3Caption: "Французский",
        sorting: "lang1",
        loading: true,
    }
}

export const settingsReducer = (state=initialState, action) => {
    //console.log(action)
    switch (action.type) {
        case LOAD_SETTINGS: return { ...state, settings: action.payload, loading: false }

        case UPDATE_SETTINGS: return { ...state, settings: action.payload, loading: false }

        default: return state
    }
}