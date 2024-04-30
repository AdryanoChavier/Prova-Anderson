import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import api from './src/Services/Api';


const App = () => {
  const [genre, setGenre] = useState('');
  const [genreEncontrado, setGenreEncontrado] = useState(null);
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const buscarGenre= async () => {
    try {
      const response = await api.get('/filmes')
      
      if (response.data && response.data.length > 0) {
        setGenreEncontrado(response.data);
          setErro('');
          setModalVisible(true);
        }else {
        setGenreEncontrado(null);
        setErro('Nenhum genero encontrado com o filme .');
      }
      
    } catch (error) {
      console.error('Erro ao buscar filme:', error);
      setGenreEncontrado(null);
      setErro('Erro ao buscar o produto. Verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar filme por genero:</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira o genero do filme"
        value={genre}
        onChangeText={text => setGenre(text)}
        keyboardType="numeric"
      />
      <Button
        title="Buscar"
        onPress={buscarGenre}
      />
      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      
      {

      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.produtoContainer}>
          {genreEncontrado && (
        <>
          <Text style={styles.nome}>{genreEncontrado.Title}</Text>
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </>
      )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50 ,
    justifyContent: 'top',
    alignItems: 'top',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  produtoContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  error: {
    color: 'red',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default App;
