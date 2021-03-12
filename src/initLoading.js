import * as Font from 'expo-font';
import { DataDB } from './dataDB';
import { SettingsDB } from './settingsDB';


export async function initLoading() {
  try {
    await DataDB.init();
  } catch (e) { console.log('DB loading error - ' + e) }
  try {
    await SettingsDB.init();
  } catch (e) { console.log('DB loading error - ' + e) }
}
