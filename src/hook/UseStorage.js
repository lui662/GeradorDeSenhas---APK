import AsyncStorage from "@react-native-async-storage/async-storage";

const UseStorage = () => {

    const getItem = async(key) =>{

        try {
            const passwords = await AsyncStorage.getItem(key)
            return JSON.parse(passwords) || [];
            
        } catch (error) {
            console.log("Não foi possivel concluir a busca ", error)
        }
    }

    const saveItem = async(key, value) => {

        try {
            let passwords = await getItem(key)
            
            passwords.push(value)

            await AsyncStorage.setItem(key, JSON.stringify(passwords))

        } catch (error) {
            console.log("Erro ao savar ", error)
        }

    }


    const removeItem = async(key, item) => {
        try {
            let passwords = await getItem(key)

            let myPasswords = passwords.filter((passwords) =>{
                return(passwords != item)
            })

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))
            return myPasswords
            
        } catch (error) {
            console.log("erro ao deletar ", error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }

}

export default UseStorage;