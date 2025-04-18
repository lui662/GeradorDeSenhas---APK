import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PasswordEditor({data, removePassword}) {
    return (
        <SafeAreaView>
            <View>
                <Pressable onLongPress={removePassword} style={styles.container}>
                    <Text style={{color: "white"}}>{data}</Text>
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
        justifyContent: "center"
    }
})
