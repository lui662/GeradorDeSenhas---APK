import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { HomeScrean } from "./Pages/Home/Index"
import { MinhasSenhas } from "./Pages/passwords/Index"
import { Ionicons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()


function Routes(){
    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="Home"
                component={HomeScrean}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        if(focused){
                            return<Ionicons size={size} color={color} name="home-sharp"/>
                        }

                        return<Ionicons size={size} color={color} name="home-outline"/>
                    }
                }}
            />
            
            <Tab.Screen 
                name="Password" 
                component={MinhasSenhas}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        if(focused){
                            return<Ionicons size={size} color={color} name="lock-closed"/>
                        }

                        return<Ionicons size={size} color={color} name="lock-closed-outline"/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Routes;