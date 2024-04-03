import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TextInput, Pressable, Alert, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../styles";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

export default function CreateAccountScreen({ navigation }) {
    
    const {control, handleSubmit,formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            date_of_birth: new Date()
        }
    })
    
    const onSubmit = (data) => console.log({...data, date_of_birth: new Date()})
    const onChange = arg => {
        return {
          value: arg.nativeEvent.text,
        };
    };

    const [retypePasswordText, setRetypePasswordText] = useState('')

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
                    <Text style={styles.subtitleText}>Username</Text>
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
                        name="username"
                        rules={{ required: true }}
                    />
                </>
                <>
                    <Text style={styles.subtitleText}>Email</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.textField}
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
                </>
                <>
                    <Text style={styles.subtitleText}>Password</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <TextInput
                                style={styles.textField}
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                secureTextEntry={true}
                                returnKeyType="next"
                                autoCorrect={false}
                                autoCapitalize={false}
                                autoComplete={false}
                            />
                        )}
                        name="password"
                        rules={{ 
                            required: true,
                            validate: (value) => {
                                if (value === retypePasswordText) {
                                    return true
                                } else {
                                    Alert.alert("Passwords do not match")
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
                        autoCorrect={false}
                        autoCapitalize={false}
                        autoComplete={false}/>
                </>
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </Pressable>
            </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}