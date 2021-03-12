import { LOAD_ITEMS, REMOVE_ITEMS, UPDATE_ITEMS, CREATE_ITEMS } from "../types";
import { DataDB } from "../../dataDB";

export const loadItems = () => {
    return async dispatch => {
        //await DataDB.init();
        const items = await DataDB.getItems();
        //console.log(items)
        dispatch({
            type: LOAD_ITEMS,
            payload: items || []
        })
    }
}

export const updateItems = items => async dispatch => {
    try {
        await DataDB.updateItems(items);
    } catch(e) {console.log('Ошибка обновления базы - ' + e)}
    //console.log("update: ", payload)
    dispatch ({
        type: UPDATE_ITEMS,
        payload: items
    })
}

export const removeItems = id => async dispatch => {
    try {
        await DataDB.removeItems(id)
    } catch (e) {console.log('Ошибка удаления из базы - ' + e)}

    dispatch ({
        type: REMOVE_ITEMS,
        payload: id
    })
}

export const createItems = items => async dispatch => {
    const id = await DataDB.createItems(items);
    //console.log(payload)
    dispatch ({
        type: CREATE_ITEMS,
        payload: {...items, id}
    })
}