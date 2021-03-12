import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Button, TextInput, Alert, FlatList, LogBox } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { THEME } from '../theme'
import { OptionsHeaderIcons } from '../components/OptionsHeaderIcons'
import { updateSettings } from '../redux/actions/settingsActions'

export const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
//console.log(image)
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () => ( <OptionsHeaderIcons navigation={navigation} /> ),
    })
  }, [])

  const settings = useSelector(state => state.dictionarySettings.settings);
  const [langNum, setLangNum] = useState(settings.langNum || 2);
  const [lang1Caption, setLang1Caption] = useState(settings.lang1Caption || "Русский");
  const [lang2Caption, setLang2Caption] = useState(settings.lang2Caption || "Английский");
  const [lang3Caption, setLang3Caption] = useState(settings.lang3Caption || "Французский");
  const [sorting, setSorting] = useState(settings.sorting || "lang1");

  const settingsRequest = { langNum, lang1Caption, lang2Caption, lang3Caption, sorting };

  const goBackHandler = () => {
    navigation.goBack()
  }

  const saveHandler = () => {
    dispatch(updateSettings(settingsRequest));
    navigation.goBack();
  }

  return (
    <ScrollView>
      <Text style={styles.title}>Сколько языков</Text>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttons}>
          <Button
            title='Два'
            color={langNum === 2 ? THEME.SELECTED : THEME.NOT_SELECTED}
            onPress={() => setLangNum(2)}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title='Три'
            color={langNum === 3 ? THEME.SELECTED : THEME.NOT_SELECTED}
            onPress={() => setLangNum(3)}
          />
        </View>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>Языки</Text>
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang1Caption(text)} 
          value={lang1Caption} 
        />
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang2Caption(text)} 
          value={lang2Caption} 
        />
        {langNum === 3 && 
        <TextInput 
          style={styles.text}
          multiline={true}
          onChangeText={text => setLang3Caption(text)} 
          value={lang3Caption} 
        />}
      </View>
      <Text style={styles.title}>Сортировка по умолчанию</Text>
      <View style={styles.sortWrapper}>
        <View style={styles.buttons}>
          <Button
            title={lang1Caption}
            color={sorting === "lang1" ? THEME.SELECTED : THEME.NOT_SELECTED}
            onPress={() =>setSorting("lang1")}
          />
        </View>
        <View style={styles.buttons}>
          <Button
            title={lang2Caption}
            color={sorting === "lang2" ? THEME.SELECTED : THEME.NOT_SELECTED}
            onPress={() => setSorting("lang2")}
          />
        </View>
        {langNum === 3 && 
        <View style={styles.buttons}>
          <Button
            title={lang3Caption}
            color={sorting === "lang3" ? THEME.SELECTED : THEME.NOT_SELECTED}
            onPress={() => setSorting("lang3")}
          />
        </View>
        }
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
      <View>
      {/*<FlatList
        data={image}
        keyExtractor={i => i}
        renderItem={(item, i) => <PhotoItem image={item} deletePhoto={deletePhotoHandler} id={i}/>}
      />*/}
      {/*image.map((item, i) => {
          //console.log(item)
          return (
            <View key={i}>
              <PhotoItem image={item} deletePhoto={deletePhotoHandler} id={i}/>
            </View>
          )
        })*/}
      </View>
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  button: {
    width: '90%',
    marginTop: 10
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  buttons: {
    width: '45%',
    marginBottom: 10,
  },
  sortWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  }
})
