import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { HeaderBar } from '../../../../../components';
import SIZES, { ColorPrimary } from '../../../../../utils/constanta';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TambahParfum = ({ navigation }) => {
  const [name, setName] = useState('')

  const addParfumePressed = async () => {
    if (name) {
      const laundry = await AsyncStorage.getItem('laundry')
      const laundryParse = JSON.parse(laundry);

      const token = await AsyncStorage.getItem('token');

      await fetch(`http://192.168.42.174:8000/api/v1/owner/laundries/${laundryParse.id}/parfumes`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: name,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.errors == null) {
            navigation.replace('Parfum')
          }
        });
    } else {
      alert('Masukkan semua field');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderBar
        navigation={navigation}
        screenName="Parfum"
        title="Tambah Parfum"
      />
      <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        <Fumi
          label={'Nama'}
          iconClass={FontAwesomeIcon}
          iconName={'certificate'}
          iconColor={ColorPrimary}
          iconSize={20}
          iconWidth={40}
          inputPadding={20}
          onChangeText={text => setName(text)}
          autoCapitalize="none"
          value={name}
          style={styles.textInput}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={styles.button}
          onPress={addParfumePressed}>
          <Text style={styles.btnText}>Simpan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TambahParfum;

const styles = StyleSheet.create({
  button: {
    backgroundColor: ColorPrimary,
    width: SIZES.width - 50,
    height: 66,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  textInput: {
    width: SIZES.width - 50,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'grey'
  },
});
