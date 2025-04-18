import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import VizualizadorDeSenhas from '../../componets/modal/Index';

export function HomeScrean() {
  const[numero, setNumero] = useState(10)
  const[valorSenha, setValorSenha] = useState("");
  const[visibilidadeModal, setVizibilidadeModal] = useState(false);

  function testaBotao(){
    let senha = ``;

    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    
    for(let i = 0; i < numero; i++){
      const indiceAleatorio  = Math.floor(Math.random() * caracteres.length)
      senha += caracteres[indiceAleatorio]
    }

    setValorSenha(senha)
    setVizibilidadeModal(true)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}> 

        <View> 
          <Image source={require("../../assets/images/logo.png")}
            style={styles.logo}/>
        </View>

        <View>
          <Text style={styles.texto}>{numero} caracteres</Text>
        </View>
        
        <View style={styles.areaSlide} >
            <Slider style={styles.styleSlide}
            minimumValue={6}
            maximumValue={20}
            value={numero}
            step={1}
            onValueChange={setNumero}
            maximumTrackTintColor='#ff0000'
            minimumTrackTintColor='#00008B'
            thumbTintColor='#392DE9'/>    
        </View>

        <View>
          <TouchableOpacity style={styles.botao} onPress={testaBotao}>
            <Text style={styles.textoBotao} >Gerar Senha</Text>
          </TouchableOpacity>
        </View>

        <Modal animationType="fade" visible={visibilidadeModal} transparent={true}>
            <VizualizadorDeSenhas mostrarSenha={valorSenha} fecharModal={()=> setVizibilidadeModal(false)}/>
        </Modal>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    justifyContent: 'center',
    alignItems: "center",
  },
  logo: {
      marginBottom: 30,
  },
  texto: {
    fontWeight: "900",
    textAlign: "center", 
    fontSize: 28,
  },
  botao: {
    backgroundColor: "#392DE9",
    width: 289, 
    height: 44,
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  textoBotao: {
    color: 'white',
    fontWeight: "900",
    fontSize: 20,
    textAlign: "center"
  }, 
  areaSlide: {
    marginTop: 20, 
    marginBottom: 10, 
    width: 289, 
    height: 44,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center", 
  }
});
