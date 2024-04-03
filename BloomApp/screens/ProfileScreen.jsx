import { 
    View, KeyboardAvoidingView, 
    TouchableWithoutFeedback, Platform, Keyboard, Button 
} from "react-native";
import { clearData, storeData } from "../functions/asyncstorage";
import { useContext } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";

export default function ProfileScreen() {
    
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
                <View style={styles.cardContainer}>
                    <Button 
                        title="Log Out" 
                        onPress={() => {
                            clearData()
                            setUser()
                        }}/>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}