import { 
    View, Text, Pressable, Button, KeyboardAvoidingView, 
    TouchableWithoutFeedback, Platform, Keyboard 
} from "react-native";
import { clearData } from "../functions/asyncstorage";
import { useContext } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";

export default function HomeScreen() {
    
    const { user, setUser } = useContext(UserContext)
    
    return (
        <KeyboardAvoidingView 
            style={styles.appContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient
              colors={['#BBE783', '#0C5300']}
              style={styles.background}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View></View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}