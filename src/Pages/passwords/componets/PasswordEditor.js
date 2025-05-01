import React, {useState, useEffect} from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"


export default function PasswordEditor({data, removePassword}) {

    const[senhaVizivel, setSenhaVizivel] = useState(true)
    const[animacaoOlho, setAnimacaoOlho] = useState("eye")

    useEffect(() => {
         const carregarEstado = async() => {
            try {
                const valorSalvo = await AsyncStorage.setItem("senhaVizivel")
                
                if(valorSalvo != null){
                    const estadoBoleano = valorSalvo === "true";
                    setSenhaVizivel(estadoBoleano)	
                    setAnimacaoOlho(estadoBoleano ? "eye" : "eye-off-outline")
                }
            } catch (error) {
                console.log("Erro ao carregar Estado ", error)
            }
        }

        carregarEstado()
    }, [])

    async function vizibilidade(){
        try {
            const novoEstado = !senhaVizivel;
            setSenhaVizivel(novoEstado)
            setAnimacaoOlho(novoEstado ? "eye" : "eye-off-outline")
            await AsyncStorage.setItem("senhaVizivel", novoEstado.toString())
        } catch (error) {
            console.log("Erro ao salvar estado ", error)
        }  
    }

    return (
        <SafeAreaView>
            <View>
                <Pressable 
                    onLongPress={removePassword} style={styles.container}> 
                    
                    <View>
                        {senhaVizivel ? (<Text style={{color: "white"}}>{data}</Text>): 
                        <Text style={styles.barraBranca}></Text>}
                    </View>
                    <Pressable onPress={vizibilidade}>
                        <Ionicons name={animacaoOlho} color={"white"} size={20}/>
                    </Pressable>
                    
                </Pressable>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e0e0e",
        padding: 14, 
        width: "100%",
        borderRadius: 8,
        justifyContent: "space-between", 
        flexDirection: "row",
    },
    barraBranca: {
        backgroundColor: "white",
        width: 200,
        borderRadius: 4, 
    }
})
