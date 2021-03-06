import React from 'react'
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native'

export const ItemBlock = ({ item, onOpen }) => {
  //console.log("itemBlock: ",item)
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.touch} onPress={() => onOpen(item.item.id)}>
          <Text style={styles.itemText}>{item.item.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    //flex: 1,
    marginBottom: 15,
    //overflow: 'hidden'
  },
  touch: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 5,
    alignItems: 'center',
    marginLeft: '10%',
    width: '80%',
    marginTop: 10,
  },
  title: {
    color: '#fff',
  },
  itemText: {
    fontSize: 20
  }
})
