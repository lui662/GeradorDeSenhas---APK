import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
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