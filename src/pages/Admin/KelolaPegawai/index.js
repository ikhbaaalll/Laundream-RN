import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FAB, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBar } from '../../../components';
import { ColorDanger, ColorPrimary, token } from '../../../utils/constanta';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pegawai = ({ navigation }) => {
  const [pegawai, setPegawai] = useState();

  const fetchPegawaiApi = async () => {
    const laundry = await AsyncStorage.getItem('laundry')
    const laundryParse = JSON.parse(laundry);

    const token = await AsyncStorage.getItem('token');

    await fetch(`http://192.168.42.63:8000/api/v1/owner/laundries/${laundryParse.id}/employees`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
      });
  }

  useEffect(() => {
    fetchPegawaiApi();
  }, [])

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F6F6F6',
        padding: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10
      }}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>Lastri</Text>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#64CB7B',
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('DetailPegawai')}>
          <Icon name="eye-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: ColorPrimary,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
            marginRight: 10,
          }}
          onPress={() => navigation.navigate('EditPegawai')}>
          <Icon name="create-outline" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: ColorDanger,
            padding: 5,
            borderRadius: 10,
            justifyContent: 'center',
          }}
          onPress={() => alert('Hapus')}>
          <Icon name="trash-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PegawaiScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderBar
        navigation={navigation}
        screenName="HomePage"
        title="Kelola Pegawai"
      />
      <ScrollView
        style={{ paddingHorizontal: 20, paddingVertical: 5 }}>
        <Pegawai navigation={navigation} />
        <Pegawai navigation={navigation} />
      </ScrollView>

      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => navigation.navigate('TambahPegawai')}
      />
    </View>
  );
};

export default PegawaiScreen;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: ColorPrimary,
  },
});

