import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextInput } from 'react-native-web';
import asyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
const [cep, setCep] = useState('')
const [endereco, setEndereco] = useState('')

const salvar = async(cep) => {
  asyncStorage.setItem('cep', cep )
  .then(() =>{
    console.log('Dados armazenados com sucesso!')
  })
  .catch (error => {
    console.log('erro', error)
  })
}



const carregar = async() => {
  const axiosConfig = {
    headers: {
      'Accept' : 'application/json',
    }
  }

  try {
    const respostaCep = await axios.get('https://viacep.com.br/ws/'+cep+'/json/', null, axiosConfig)
    console.log(respostaCep.data) 
    setEndereco(respostaCep.data)
  } catch (error) {
    console.log(error)
    return false;
  }
}

  return (
    <View style={styles.container}>
      <View style={styles.areaInputBotao}>
        <View style={styles.areaInput}>
          <TextInput style={styles.input} onChangeText={setCep} value={cep} placeholder='CEP'/>
        </View>
        <View style={styles.areaBotao}>
          <TouchableOpacity onPress={() => {carregar()}} style={styles.botao}>
            <Text style={styles.texto}>Pesquisar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {salvar(cep)}} style={styles.botao}>
            <Text style={styles.texto}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.areaResp}> 
          <Text style={styles.texto}>CEP: {endereco.cep}</Text>
          <Text style={styles.texto}>Logradouro: {endereco.logradouro}</Text>
          <Text style={styles.texto}>Bairro: {endereco.bairro}</Text>
          <Text style={styles.texto}>UF: {endereco.uf}</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  areaResp: {
    flex: 4,
    justifyContent: 'center',
    padding: 100,
  },
  
  areaInputBotao: {
    flex: 1,
    backgroundColor: 'grey',
    borderBottomWidth: 2,
    flexDirection: 'row',
  },
  areaInput: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  areaBotao:{
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  input: {
    height: 45,
    width: "90%",
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: 'white'
  },
  botao: {
    backgroundColor: 'red',
    borderWidth: 2,
    borderRadius: 30,
    height: 40,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});
