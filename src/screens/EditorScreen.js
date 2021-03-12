import React, { useState , useEffect } from 'react'
import { View,  StyleSheet, FlatList, Image, Text, TextInput, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { THEME } from '../theme'
import { createItems, updateItems, removeItems } from '../redux/actions/itemsActions';
//import { ItemBlock } from '../components/ItemBlock'
import { EditorHeaderIcons } from '../components/EditorHeaderIcons'

export const EditorScreen = ({ navigation , route }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => ( <EditorHeaderIcons navigation={navigation} /> ),
    });
  }, [])
  const items = route.params.items;
  //console.log(items)
  const [lang1, setLang1] = useState(route.params.item.lang1 || "");
  const [lang2, setLang2] = useState(route.params.item.lang2 || "");
  const [lang3, setLang3] = useState(route.params.item.lang3 || "");
  const [validateError, setValidateError] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const id = route.params.item.id;
  
  const settings = useSelector(state => state.dictionarySettings.settings);
  const langNum = settings.langNum || 2;
  const lang1Caption = settings.lang1Caption || "Русский";
  const lang2Caption = settings.lang2Caption || "Английский";
  const lang3Caption = settings.lang3Caption || "Французский";

  useEffect(() => {
    if (validateError) {
      setTimerId(setTimeout(() => setValidateError(false), 3000))
    }
  }, [validateError])

  const goBackHandler = () => {
    if (timerId) clearTimeout(timerId);
    navigation.goBack()
  }

  const saveHandler = () => {
    //console.log(validate(lang1, items, id))
    if (validate(lang1, items, id)) {
      setValidateError(true);
    } else {

      if (!id) {
        dispatch(createItems({lang1, lang2, lang3}));
      } else {
        dispatch(updateItems({id, lang1, lang2, lang3}));
      }
      navigation.goBack();
    }
  }

  const removeHandler = () => {
    dispatch(removeItems(id));
    navigation.goBack();
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{lang1Caption}</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang1(text)} 
          value={lang1} 
        />
        {validateError && 
          <Text style={styles.alarm}>Такое слово уже существует</Text>
        }
        <Text style={styles.title}>{lang2Caption}</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang2(text)} 
          value={lang2} 
        />

        {langNum === 3 && 
        <>
        <Text style={styles.title}>{lang3Caption}</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang3(text)} 
          value={lang3} 
        />
        </>}
      </View>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttons}>
          <Button
            title='Назад'
            color={THEME.MAIN_COLOR}
            onPress={goBackHandler}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title='Сохранить'
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
          />
        </View>
        
      </View>
      <View style={styles.buttonsWrapper}>
      <View style={styles.removeButton}>
        <Button
            title='Удалить'
            color={THEME.DANGER_COLOR}
            onPress={removeHandler}
          />
          </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    //padding: 40,
    marginBottom: 10,
  },
  textWrap: {
    padding: 10
  }, 
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '5%',
  },
  text: {
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 22,
    marginTop: '3%',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 30,
  },
  buttons: {
    width: '40%'
  },
  removeButton: {
    width: '90%'
  },
  alarm: {
    color: 'red',
    textAlign: 'center',
  }
})

const validate = (text, items, id) => {
  let error = false;
  items.forEach(el => {
    if (text === el.lang1 && id !== el.id) error = true;
  })
  return error;
}