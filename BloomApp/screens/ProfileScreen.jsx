import { 
    View, KeyboardAvoidingView, 
    TouchableWithoutFeedback, Platform, Keyboard, Button, ScrollView, Image, Text, Alert 
} from "react-native";
import { clearData, storeData } from "../functions/asyncstorage";
import { useContext, useEffect } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import axios from "axios";

export default function ProfileScreen() {
    
    const { user, setUser } = useContext(UserContext)

    const getUser = async () => {
        let response = await axios.get(`${process.env.BLOOM_SERVER_ADDRESS}/users/${user._id}`)
        console.log(response.data)
        setUser(response.data)
    }

    useEffect(() => {
        getUser()
    }, [])
    
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
                    contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center'}}>
                    
                    <View>
                        <Image 
                            source={{uri: user.profile_picture}}
                            style={styles.profilePictureImage}/>
                    </View>

                    <View style={styles.cardContainer}>
                        {
                            user.name && (
                                <>
                                    <Text style={styles.subtitleText}>{user.name} ({user.tier.name} {user.tier.emoji})</Text>
                                    <Text>{user.score}</Text>

                                    <Text style={styles.subtitleText}>Username</Text>
                                    <Text>{user.username}</Text>

                                    <Text style={styles.subtitleText}>Email</Text>
                                    <Text>{user.email}</Text>

                                    <Text style={styles.subtitleText}>Date of Birth</Text>
                                    <Text>{new Date(user.date_of_birth).toDateString()}</Text>

                                    <Button title="Edit Profile Info"/>
                                </>
                            )
                        }
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
                            onPress={async () => {
                                let response = await axios.delete(`${process.env.BLOOM_SERVER_ADDRESS}/users/${user._id}/delete`)
                                if (response.status === 200) {
                                    clearData()
                                    setUser()
                                } else {
                                    Alert.alert("Error", "There was an error deleting your account. Please try again later")
                                }
                            }}/>
                    </View>
                    

                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}