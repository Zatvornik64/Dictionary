import { LOAD_SETTINGS, UPDATE_SETTINGS } from "../types";
import { SettingsDB } from "../../settingsDB";

export const loadSettings = () => {
    return async dispatch => {
        //await SettingsDB.init();
        const settings = await SettingsDB.getSettings();
        //console.log("loadSetting: ",settings)
        dispatch({
            type: LOAD_SETTINGS,
            payload: settings || []
        })
    }
}

export const updateSettings = settings => async dispatch => {
    const initialSettings = await SettingsDB.getSettings();
    if (initialSettings) {
        try {
            await SettingsDB.updateSettings({...settings, id: 1});
        } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    } else {
        try {
            await SettingsDB.createSettings({...settings, id: 1});
        } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    }
    /*try {
        await SettingsDB.removeSettings(1);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}*/
    dispatch ({
        type: UPDATE_SETTINGS,
        payload: settings
    })
}


