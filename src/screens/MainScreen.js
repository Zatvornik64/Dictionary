import React, { useEffect, useState }  from 'react'
import { View, ScrollView ,  StyleSheet, FlatList, ActivityIndicator, Image, Text, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ItemBlock } from '../components/ItemBlock'
import { MainHeaderIcons } from '../components/MainHeaderIcons'
import { loadItems } from '../redux/actions/itemsActions';
import { loadSettings } from '../redux/actions/settingsActions';
import { THEME } from '../theme'



export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onOpen = index => {
    navigation.navigate('Editor', { item: items[index], items } ) 
  }

  const settings = useSelector(state => state.dictionarySettings.settings);
  //console.log("main_setting: ", settings);
  const langNum = settings.langNum || 2;
  const lang1Caption = settings.lang1Caption || "Русский";
  const lang2Caption = settings.lang2Caption || "Английский";
  const lang3Caption = settings.lang3Caption || "Французский";
  const [sorting, setSorting] = useState(settings.sorting);
  //console.log("main_sorting: ", sorting)
  const newItem = {
    lang1: null,
    lang2: null,
    lang3: null,
  }
  


  const addNewItem = () => {
    navigation.navigate('Editor', { item: newItem, items } )
  }

  

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <MainHeaderIcons navigation={navigation} /> ),
    });
    dispatch(loadItems());
    dispatch(loadSettings());
  }, [dispatch])

  useEffect(()=>{
    setSorting(settings.sorting)
  }, [settings])
  
  const items = useSelector(state => state.dictionaryData.items);
  let renderList = [];
  items.forEach(el => {
    if (el[sorting] !== "") renderList.push({title:el[sorting], id: el.id})
  })
  renderList.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
  //console.log("items: ", renderList)
  
  /*if (items) {
    items.forEach(item => {
     if (typeof item.img === "string") item.img = JSON.parse(item.img)
    });
  }
  items.sort((a,b) => b.id - a.id);*/
  const loading = useSelector(state => state.dictionaryData.loading);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.items}>
        {items.length ?
          <View>
            <Text style={styles.title}>Сортировка:</Text>
            <View style={styles.buttonsWrapper}>
              <View style={styles.buttons_left}>
                <Button
                  title={lang1Caption}
                  color={sorting === "lang1" ? THEME.SELECTED : THEME.NOT_SELECTED}
                  onPress={() => setSorting("lang1")}
                />
              </View>
              <View style={styles.buttons_right}>
                <Button
                  title={lang2Caption}
                  color={sorting === "lang2" ? THEME.SELECTED : THEME.NOT_SELECTED}
                  onPress={() => setSorting("lang2")}
                />
                {langNum === 3 &&
                  <Button
                    title={lang3Caption}
                    color={sorting === "lang3" ? THEME.SELECTED : THEME.NOT_SELECTED}
                    onPress={() => setSorting("lang3")}
                  />}
              </View>
            </View>
            <ScrollView>
              {/*items.map(element => {
                return (
                  <>
                    <ItemBlock item={element} onOpen={onOpen} items={items} />
                  </>
                )
              })*/}
            </ScrollView>
            <View>
            <FlatList
              data={renderList}
              keyExtractor={item => item.id.toString()}
              renderItem={ item  => <ItemBlock item={item} onOpen={onOpen} />} 
            />
            </View>
          </View> :
          <View style={styles.loader}>
            <Image
              resizeMode='center'
              source={require('../../assets/emptylist.jpg')}
            />
          </View>
        }
      </View>
      <View style={styles.add}>
        <TouchableOpacity style={styles.addButton} onPress={addNewItem}>
          <Text style={styles.addText}>добавить</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
  }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  items: {
    flex: 10,
    //backgroundColor: '#aaa'
  },
  add: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '5%',
  },
  addButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 3,
    backgroundColor: '#ccc',
    paddingBottom: 10,
  },
  addText: {
    fontSize: 26,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttons_left: {
    width: '45%',
    marginRight: 5,
    justifyContent: 'center',
  },
  buttons_right: {
    width: '45%',
    justifyContent: 'center',
  },
})
