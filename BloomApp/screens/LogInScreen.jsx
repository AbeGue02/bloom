import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert, Button, useWindowDimensions, Animated } from "react-native";
import UserContext from "../Context";
import styles from "../styles/styles";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { storeData } from "../functions/asyncstorage";
import landscapeStyles from "../styles/landscapeStyles";
import * as ScreenOrientation from 'expo-screen-orientation'

export default function LogInScreen({ navigation }) {

    const { setUser } = useContext(UserContext)
    const { height, width } = useWindowDimensions()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInvalid, setLoginInvalid] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0)).current

    const portraitMode = height > width

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start()
    }

    const handleSubmit = async () => {
        const requestBody = {
            email: email,
            password: password
        }
        let response = await axios.post(
            `${process.env.BLOOM_SERVER_ADDRESS}/users/login`, 
            requestBody, 
            {
                validateStatus: (status) => status < 500
            }
        )
        switch (response.status) {
            case 201: 
                await storeData('user', response.data)
                setUser(response.data)
                break
            case 403:
                setLoginInvalid(true)
                break
            default:
                Alert.alert('Unhandled Error', 'Please report this to us and we will fix it')
        }
    }

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
        fadeIn()
    },[])

    return (
        <KeyboardAvoidingView 
            style={styles.appContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <LinearGradient
              colors={['#BBE783', '#0C5300']}
              style={styles.background}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[ portraitMode ? styles.cardContainer : landscapeStyles.cardContainer , {opacity: fadeAnim}]}>
                    <Text style={styles.titleText}>Bloom Habit</Text>
                    <>
                        <Text style={styles.subtitleText}>Email</Text>
                        <TextInput 
                            style={[styles.textField, loginInvalid && styles.invalidTextField]}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}/>
                        
                    </>
                    <>
                        <Text style={styles.subtitleText}>Password</Text>
                        <TextInput 
                            style={[styles.textField, loginInvalid && styles.invalidTextField]}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}/>
                        <Button title="Forgot Password?"/>
                    </>
                    {
                        loginInvalid && <Text style={styles.invalidText}>Login Information Invalid</Text>
                    }
                    <View style={ !portraitMode ? {flexDirection: 'row', alignItems: 'center'} : {alignItems: 'stretch'} }>
                        <Pressable 
                            style={styles.button}
                            onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>
                        <Text style={styles.subtitleText}>or</Text>
                        <Pressable 
                            style={styles.button}
                            onPress={() => navigation.navigate('Create Account')}>
                            <Text style={styles.buttonText}>Create Account</Text>
                        </Pressable>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}