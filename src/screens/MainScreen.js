import React, { useEffect, useState }  from 'react'
import { View, KeyboardAvoidingView ,  StyleSheet, FlatList, ActivityIndicator, Image, Text, TouchableOpacity, Button, TextInput  } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ItemBlock } from '../components/ItemBlock'
import { MainHeaderIcons } from '../components/MainHeaderIcons'
import { loadItems } from '../redux/actions/itemsActions';
import { loadSettings } from '../redux/actions/settingsActions';
import { THEME } from '../theme'



export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onOpen = id => {
    //console.log(items.filter(el => el.id === id)[0])
    navigation.navigate('Editor', { item: items.filter(el => el.id === id)[0], items } ) 
  }

  const settings = useSelector(state => state.dictionarySettings.settings);
  //console.log("main_setting: ", settings);
  const langNum = settings.langNum || 2;
  const lang1Caption = settings.lang1Caption || "Русский";
  const lang2Caption = settings.lang2Caption || "Английский";
  const lang3Caption = settings.lang3Caption || "Французский";
  const [sorting, setSorting] = useState(settings.sorting || "lang1");
  const [filterText, setFilterText] = useState("");
  //console.log("main_sorting: ", sorting)
  const newItem = {
    lang1: null,
    lang2: null,
    lang3: null,
  }
  //console.log("filter: ", filterText)


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
    if (settings.sorting) setSorting(settings.sorting)
  }, [settings])
  
  const items = useSelector(state => state.dictionaryData.items);
  
  let renderList = [];
  items.forEach(el => {
    if (el[sorting] !== "") renderList.push({title:el[sorting], id: el.id})
  })
  if (renderList[0]) {
    renderList.sort((a,b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
    renderList = renderList.filter(el => el.title ? el.title.toLowerCase().includes(filterText.toLowerCase()) : false)
  }
  //console.log("items: ", renderList)
  
  const loading = useSelector(state => state.dictionaryData.loading);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView 
      style={styles.wrapper}
      behavior='height'
      keyboardVerticalOffset="-200"
    >
      <View style={styles.items}>
        {items.length ?
          <View style={styles.flex}>
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
            <View style={styles.finderBlock}>
              <Text style={styles.finderTitle}>Поиск</Text>
              <TextInput 
                style={styles.finderText}
                multiline={false}
                onChangeText={text => setFilterText(text)} 
                value={filterText} 
                placeholder="Введите текст фильтра"
              />
                </View>
            <View style={styles.flatlist}>
            <FlatList
              scrollEnabled={true}
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
    </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  flatlist: {
    flex: 15,
  },
  add: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    //marginTop: '5%',
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
  finderBlock: {
    flex: 2,
    flexDirection: 'row',
  },
  finderTitle: {
    flex: 1,
    marginLeft: '5%',
  },
  finderText: {
    flex: 6,
    height: 35,
    borderWidth: 2,
    marginHorizontal: '5%',
    paddingLeft: 10,
  }
})
