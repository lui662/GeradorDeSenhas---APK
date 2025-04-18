import React, {useState} from "react";
import { Text, View, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Styles";
import * as ClipBoard from "expo-clipboard"
import UseStorage from "../../hook/UseStorage";

const SenhaGerada = ({mostrarSenha, fecharModal}) =>{
    const useStorage = UseStorage();


    async function getSenha (){
        await ClipBoard.setStringAsync(mostrarSenha)
        await useStorage.saveItem("@pass", mostrarSenha)
        
        alert("Senha salva com sucesso")
        fecharModal()
    }
    

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.areaModal} >
                <Text style={styles.tituloModal}>
                    Senha Gerada
                </Text>
                <Pressable style={styles.styleSenha} onLongPress={getSenha}>
                    <Text style={styles.textSenhaStyle}>
                        {mostrarSenha}
                    </Text>
                </Pressable>
                <View style={styles.containerBotoes}>
                    <TouchableOpacity onPress={fecharModal} style={[styles.botoes, styles.botaoSair]}>
                        <Text style={styles.textBotaoStyle}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={getSenha} style={[styles.botoes, styles.botaoSalvar]}>
                        <Text style={styles.textBotaoStyle}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SenhaGerada;