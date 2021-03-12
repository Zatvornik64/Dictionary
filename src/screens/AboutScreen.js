import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Это приложение словарь для изучения иностранных языков.</Text>
      <Text style={styles.text}>В нижней части кнопка "Добавить" открывает редактор для новой записи.</Text>
      <Text style={styles.text}>Нажатие на существующую запись открывает редактор, где можно запись изменить или удалить.</Text>
      <Text style={styles.text}>Шестеренка в шапке ведет на экран настроек. В настройках можно выбрать режим двух или трех языков и отображаемые названия языков.</Text>
      <Text style={styles.text}>При добавлении записи она проверяется на дубликат по первому языку.</Text>
      <Text style={styles.text}>Это приложение делалось для себя.</Text>
      <Text style={styles.text}>Автор: Михаил Пошивалов.</Text>
      <Text style={styles.text}>Если у вас есть пожелания по дальнейшей доработке этого приложения - позвоните автору и скажите об этом!</Text>
      <Text style={styles.version}>v.1.0.0</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center'
  },
  version: {
    fontSize: 12,
    position: 'absolute',
    bottom: 40,
    textAlign: 'center'
  }
})
