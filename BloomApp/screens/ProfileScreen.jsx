import { 
    View, KeyboardAvoidingView, 
    TouchableWithoutFeedback, Platform, Keyboard, Button, ScrollView, Image, Text 
} from "react-native";
import { clearData, storeData } from "../functions/asyncstorage";
import { useContext } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";

export default function ProfileScreen() {
    
    const { user, setUser } = useContext(UserContext)
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={styles.appContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <LinearGradient
                    colors={['#BBE783', '#0C5300']}
                    style={styles.background}
                    />

                <ScrollView 
                    style={{flex: 1, width: '100%'}}
                    contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    
                    <View>
                        <Image 
                            source={{uri: user.profile_picture}}
                            style={styles.profilePictureImage}/>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.subtitleText}>{user.name}</Text>
                    </View>
                    
                    <View style={styles.cardContainer}>
                        <Button 
                            title="Log Out" 
                            onPress={() => {
                                clearData()
                                setUser()
                            }}/>
                    </View>

                    <View style={styles.cardContainer}>
                        <Button 
                            title="Delete Account" 
                            color={'red'}
                            onPress={() => {
                                clearData()
                                setUser()
                            }}/>
                    </View>
                    

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}