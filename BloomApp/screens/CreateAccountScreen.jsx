import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TextInput, Pressable, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../styles/styles";
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import UserContext from "../Context";
import { storeData } from "../functions/asyncstorage";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function CreateAccountScreen({ navigation }) {
    
    const [retypePasswordText, setRetypePasswordText] = useState('')
    const [usernameInvalid, setUsernameInvalid] = useState(false)
    const [emailInvalid, setEmailInvalid] = useState(false)

    const { setUser } = useContext(UserContext)

    const {control, handleSubmit,formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
        }
    })
    
    const handleError = (status) => {
        return status < 500
    }

    const onSubmit = async (data) => {
        const newUser = {...data}
        let response = await axios.post(`${process.env.BLOOM_SERVER_ADDRESS}/users/create`, newUser, {validateStatus: handleError})
        console.log(response)
        switch (response.status) {
            case 201:
                await storeData('user', response.data.user)
                setUser(response.data.user)
                break
            case 403:
                setEmailInvalid(true)
                setUsernameInvalid(true)
                break;
            default:
                Alert.alert("Unknown Error", "Please contact support to report this bug")
        }
    }
    const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
    };

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }, [])

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
                <Text style={styles.titleText}>Create Account</Text>
                <>
                    <Text style={styles.subtitleText}>Name</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.textField}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="name"
                        rules={{ required: true }}
                    />
                </>
                <>
                    <Text style={[styles.subtitleText,]}>Username</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={[styles.textField, usernameInvalid && styles.invalidTextField]}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                returnKeyType="next"
                            />
                        )}
                        name="username"
                        rules={{ required: true }}
                    />
                    {usernameInvalid && <Text style={styles.invalidText}>Account with this username already exists!</Text>}
                </>
                <>
                    <Text style={styles.subtitleText}>Email</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={[styles.textField, emailInvalid && styles.invalidTextField]}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                inputMode="email"
                                returnKeyType="next"
                            />
                        )}
                        name="email"
                        rules={{ required: true }}
                    />
                    {emailInvalid && <Text style={styles.invalidText}>Account with this email already exists!</Text>}
                </>
                <>
                    <Text style={styles.subtitleText}>Password</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <>
                                <TextInput
                                    style={[styles.textField, value != retypePasswordText && styles.invalidTextField]}
                                    onBlur={onBlur}
                                    onChangeText={value => onChange(value)}
                                    value={value}
                                    secureTextEntry={true}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                />
                                {value != retypePasswordText && <Text style={styles.invalidText}>Passwords need to match</Text>}
                            </>
                        )}
                        name="password"
                        rules={{ 
                            required: true,
                            validate: (value) => {
                                if (value === retypePasswordText) {
                                    return true
                                } else {
                                    setRetypePasswordText('')
                                }
                            }
                        }}
                    />
                </>
                <>
                    <Text style={styles.subtitleText}>Re-type Password</Text>
                    <TextInput 
                        style={styles.textField}
                        value={retypePasswordText}
                        onChangeText={setRetypePasswordText}
                        secureTextEntry={true}
                        returnKeyType="next"
                        autoCapitalize="none"/>
                </>
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}