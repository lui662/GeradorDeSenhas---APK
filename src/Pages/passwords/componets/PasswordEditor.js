import React, {useState, useEffect} from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GestureDetector, Gesture} from "react-native-gesture-handler"
import Animated, {
    useSharedValue, 
    withSpring, 
    runOnJS,
    useAnimatedStyle,
    useAnimatedReaction,
} from "react-native-reanimated";

export default function PasswordEditor({data, removePassword}) {

    const[senhaVizivel, setSenhaVizivel] = useState(true)
    const [animacaoOlho, setAnimacaoOlho] = useState("eye")
    const [direcaoDoTexto, setDirecaoDoTexto] = useState("flex-start")

    const translatex = useSharedValue(0)
    const SWIPE_LEFT_LIMITED = -100
    const SWIPE_RIGHT_LIMITED = 100

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translatex.value = Math.max(Math.min(e.translationX, 150), -150)
        })
        .onEnd(() => {
            if (translatex.value < SWIPE_LEFT_LIMITED) {
                translatex.value = withSpring(-300)
                runOnJS(removePassword)()
            } else if (translatex.value > SWIPE_RIGHT_LIMITED) {
                translatex.value = withSpring(300)
                runOnJS(removePassword)()
            }else {
                translatex.value = withSpring(0)
            }
        })
    
    useAnimatedReaction(
    () => translatex.value,
        (value) => {
            if (value > -10) {
                runOnJS(setDirecaoDoTexto)("flex-start");    
            } else {
                runOnJS(setDirecaoDoTexto)("flex-end");
            }
        },
    []);
    
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

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translatex.value }],
    }))

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

    return (
        <SafeAreaView>
            
             <View style={[styles.containerArea, {justifyContent: direcaoDoTexto}]}>
                <Text style={styles.deleteText}>Acesse menu</Text>
            </View>

             <GestureDetector
                    gesture={panGesture}
                >
                    <Animated.View
                        style={[styles.container, animatedStyle]}
                    >
                        <View>

                            {senhaVizivel ? (<Text style={{color: "white"}}>{data}</Text>): 
                            <Text style={styles.barraBranca}></Text>}
                        
                        </View> 

                         <Pressable onPress={vizibilidade}>
                            <Ionicons name={animacaoOlho} color={"white"} size={20}/>
                        </Pressable>

                    </Animated.View>

                </GestureDetector>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  containerArea: {
    backgroundColor: "#ff3b30",
    padding: 17,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
  },
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    position: "absolute",
    zIndex: 1,
  },
  barraBranca: {
    backgroundColor: "white",
    width: 200,
    borderRadius: 4,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});