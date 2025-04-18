import React, {useState} from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"


export default function PasswordEditor({data, removePassword}) {

    const[senhaVizivel, setSenhaVizivel] = useState(true)
    const[animacaoOlho, setAnimacaoOlho] = useState("eye")

    function vizibilidade(){
        if(senhaVizivel){
            setAnimacaoOlho("eye-off-outline")
            setSenhaVizivel(false)
        } else {
            setAnimacaoOlho("eye")
            setSenhaVizivel(true)
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
