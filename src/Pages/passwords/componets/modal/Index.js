import React, {useState} from "react";
import { Text, View, TouchableOpacity, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UseStorage from "../../../../hook/UseStorage";


const EscluirSenha = ({mostrarSenha, fecharModal, setListaDeSenha}) =>{
    const useStorage = UseStorage();

    async function excluirSenha (){
        const password = await useStorage.removeItem("@pass", mostrarSenha)
        setListaDeSenha(password)
        
        alert("Senha excluida com sucesso")
        fecharModal()
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.areaModal} >
                <Text style={styles.tituloModal}>
                    Deseja Escluir essa senha?
                </Text>
                <Pressable style={styles.styleSenha}>
                    <Text style={styles.textSenhaStyle}>
                        {mostrarSenha}
                    </Text>
                </Pressable>
                <View style={styles.containerBotoes}>
                    <TouchableOpacity onPress={fecharModal} style={[styles.botoes, styles.botaoSalvar]}>
                        <Text style={styles.textBotaoStyle}>Sair</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={excluirSenha} style={[styles.botoes, styles.botaoSair]}>
                        <Text style={styles.textBotaoStyle}>Deletar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EscluirSenha;


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(24, 24, 24, 0.7)'
    },
    areaModal: {
        backgroundColor: "#F3F3FF",
        width: 325,
        height: 217,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    tituloModal: {
        fontWeight: "900",
        fontSize: 20,
    },
    styleSenha: {
        backgroundColor: "black", 
        width: 289, 
        height: 44,
        padding: 10,
        borderRadius: 8,
        marginTop: 18,
    },
    textSenhaStyle: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center"
    },
    containerBotoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
    },
    botoes: {
        marginTop: 18,
        padding: 10, 
        borderRadius: 8, 
        width: 136, 
        height: 44,
    },
    botaoSalvar: {
        backgroundColor: "#392DE9",
    },
    botaoSair: {
        backgroundColor: "red",
    },
    textBotaoStyle: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "900",
        color: "white"
    },

})