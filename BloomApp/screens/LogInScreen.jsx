import { useContext } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import UserContext from "../Context";
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';


export default function LogInScreen() {

    const { user, setUser } = useContext(UserContext)

    return (
        // <Stack.Navigator initialRouteName="Log In">
        <View style={styles.appContainer}>
            <LinearGradient
              colors={['#BBE783', '#0C5300']}
              style={styles.background}
            />
            <View style={styles.cardContainer}>
                <Text style={styles.titleText}>Bloom Habit</Text>
                <>
                    <Text style={styles.subtitleText}>Email</Text>
                    <TextInput style={styles.textField}/>
                </>
                <>
                    <Text style={styles.subtitleText}>Password</Text>
                    <TextInput style={styles.textField}/>
                    <Text style={styles.hyperlinkedText}>Forgot Password?</Text>
                </>
                <>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                    <Text style={styles.subtitleText}>or</Text>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </Pressable>
                </>
            </View>
        </View>
        // </Stack.Navigator>
    )
}