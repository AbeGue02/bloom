import { 
    View, KeyboardAvoidingView, Text,
    TouchableWithoutFeedback, Platform, Keyboard, TextInput, StatusBar, ScrollView 
} from "react-native";
import { useContext, useState, useEffect } from "react";
import UserContext from "../Context";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import axios from "axios";
import AddHabitButton from "../components/AddHabitButton";
import AddHabitCard from "../components/AddHabitCard";
import HabitListItem from "../components/HabitListItem";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function HomeScreen({ navigation }) {
    
    const { user, setUser } = useContext(UserContext)

    const [searchBarText, setSearchBarText] = useState('')
    const [habits, setHabits] = useState([])
    const [isUserAddingHabit, setIsUserAddingHabit] = useState(false)

    const toggleIsUserAddingHabit = () => setIsUserAddingHabit(!isUserAddingHabit)

    const getHabits = async () => {
        let response = await axios.get(`${process.env.BLOOM_SERVER_ADDRESS}/users/${user._id}/habits`)
        setHabits(response.data)
    }

    const getUser = async () => {
        let response = await axios.get(`${process.env.BLOOM_SERVER_ADDRESS}/users/${user._id}`)
        console.log(response.data)
        setUser(response.data)
        await getHabits()
    }

    useEffect(() => {
        getUser()
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }, [])
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={[styles.appContainer]}
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
                    isUserAddingHabit ? (
                        <AddHabitCard 
                            getHabits={getHabits}
                            cancelFunction={toggleIsUserAddingHabit}/>
                    ) : (
                        <AddHabitButton toggleFunc={toggleIsUserAddingHabit}/>
                    )
                }

                <ScrollView 
                    style={styles.habitList}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}
                    vertical
                    alwaysBounceVertical={true}
                    >
                    <View style={[styles.cardContainer, styles.habitSectionHeader]}>
                        <Text>Active Habits</Text>
                    </View>

                    {
                        habits.length > 0 ? habits.filter((habit) => {
                            let isTodayValid = Date.now() > new Date(habit.start_date) && Date.now() < new Date(habit.end_date)
                            if (isTodayValid) {
                                return searchBarText === ''  ? true : habit.title.includes(searchBarText)
                            } else {
                                return false
                            }
                        }).map((habit, index, habitsArray) => (
                            <HabitListItem 
                                habit={habit}
                                getHabits={getHabits}
                                key={habit._id}/>
                        )) : (
                            <View>
                                <Text>No Habits were found</Text>
                            </View>
                        )
                    }

                    <View style={[styles.cardContainer, styles.habitSectionHeader]}>
                        <Text>Inactive Habits</Text>
                    </View>

                    {
                        habits.length > 0 ? habits.filter((habit) => {
                            let isTodayValid = Date.now() > new Date(habit.start_date) && Date.now() < new Date(habit.end_date)
                            if (!isTodayValid) {
                                return searchBarText === ''  ? true : habit.title.includes(searchBarText)
                            } else {
                                return false
                            }
                        }).map((habit, index, habitsArray) => (
                            <HabitListItem 
                                habit={habit}
                                getHabits={getHabits}
                                key={habit._id}/>
                        )) : (
                            <View>
                                <Text>No Habits were found</Text>
                            </View>
                        )
                    }

                </ScrollView>

                <StatusBar barStyle={'default'}/>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}