import { 
    View, KeyboardAvoidingView, Pressable, Text,
    TouchableWithoutFeedback, Platform, Keyboard, TextInput, StatusBar 
} from "react-native";
import { clearData } from "../functions/asyncstorage";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles";
import axios from "axios";
import AddHabitButton from "../components/AddHabitButton";
import AddHabitCard from "../components/AddHabitCard";

export default function HomeScreen({ navigation }) {
    
    const { user, setUser } = useContext(UserContext)

    const [searchBarText, setSearchBarText] = useState('')
    const [habits, setHabits] = useState('')
    const [isUserAddingHabit, setIsUserAddingHabit] = useState(false)

    const toggleIsUserAddingHabit = () => setIsUserAddingHabit(!isUserAddingHabit)

    const getHabits = async () => {
        let response = await axios.get(`${process.env.BLOOM_SERVER_ADDRESS}/users/${user._id}/habits`)
        console.log(response.data)
        setHabits(response.data)
    }

    useEffect(() => {
        getHabits()
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
                
                <View style={[styles.cardContainer, {flexDirection: 'row',}]}>
                    <TextInput 
                        style={styles.searchBar}
                        placeholder="Search..."
                        value={searchBarText}
                        onChangeText={setSearchBarText}/>
                </View>
            
                {
                    isUserAddingHabit
                    ? (
                        <AddHabitCard 
                            getHabits={getHabits}
                            cancelFunction={toggleIsUserAddingHabit}/>
                    ) : (
                        <AddHabitButton toggleFunc={toggleIsUserAddingHabit}/>
                    )
                }
                <StatusBar barStyle={'default'}/>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}