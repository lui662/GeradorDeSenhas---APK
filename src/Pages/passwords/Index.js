import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {StyleSheet, Text, View, FlatList, Modal} from "react-native"
import { useIsFocused } from "@react-navigation/native"
import UseStorage from "../../hook/UseStorage";
import PasswordEditor from "./componets/PasswordEditor";
import EscluirSenha from "./componets/modal/Index";

export function MinhasSenhas(){
    const[listaDeSenhas, setListaDeSenhas] = useState([])
    const focused = useIsFocused();
    const{ getItem } = UseStorage()
    const[visibilidadeModal, setVizibilidadeModal] = useState(false);
    const[itemSelecionado, setItemSelecionado] = useState("")

    useEffect(() => {

        async function load(passwords) {
            const senhas = await getItem("@pass")
            setListaDeSenhas(senhas)
        }

        load()

    }, [focused])

    function deletarSenhaEscolhida(item){
        setItemSelecionado(item)
        setVizibilidadeModal(true)
    }

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text style={styles.textContainer}>
                    Minhas Senhas
                </Text>
            </View>
            <View style={styles.listPasswordContainer}>
            <FlatList
                style={{flex: 1, marginTop: 14}}
                data={listaDeSenhas}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({item}) => (
                    <PasswordEditor data={item} removePassword={() => deletarSenhaEscolhida(item)} />
                )}
                />
            </View>

            <Modal animationType="fade" visible={visibilidadeModal} transparent={true}> 
                <EscluirSenha setListaDeSenha={setListaDeSenhas} mostrarSenha={itemSelecionado}  fecharModal={()=> setVizibilidadeModal(false)} />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    container: {
        backgroundColor: "#392DE9",
        padding: 20, 
        alignItems: "center"
    },
    textContainer: {
        fontSize: 22, 
        fontWeight: "900",
        color: "white"
    }, 
    listPasswordContainer: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    }, 

})
