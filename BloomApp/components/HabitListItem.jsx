import { View, Text, Pressable, Alert, Button } from "react-native";
import styles from "../styles/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateHabitCard from "./UpdateHabitCard";

export default function HabitListItem({habit, getHabits}) {
    
    const [isHabitCompleted, setIsHabitCompleted] = useState(false)
    const [isUpdatingHabit, setIsUpdatingHabit] = useState(false)

    const toggleIsUpdatingHabit = () => setIsUpdatingHabit(!isUpdatingHabit)

    const findDateIndex = (datesArray, targetDate) => {
        if (datesArray.length > 0) {
            for (let index = 0; index < datesArray.length; index++) {
            const currentDate = datesArray[index];
        
                if (isSpecificDate(currentDate, targetDate)) {
                    return index; 
                }
            }
        } 
        return -1;
    };
      
    const isSpecificDate = (dateObj, targetDate) => {

        const targetYear = new Date(targetDate).getFullYear();
        const targetMonth = new Date(targetDate).getMonth();
        const targetDay = new Date(targetDate).getDate();
        
        const year = new Date(dateObj).getFullYear();
        const month = new Date(dateObj).getMonth();
        const day = new Date(dateObj).getDate();
        
        return year === targetYear && month === targetMonth && day === targetDay;
    };      

    const deleteHabit = async () => {
        let response = await axios.delete(`${process.env.BLOOM_SERVER_ADDRESS}/habits/${habit._id}/delete`)
        if (response.status === 200) {
            Alert.alert("Habit Deleted", "Habit has been deleted") 
            await getHabits()
        } else { 
            Alert.alert("Error", "An error has ocurred. Please try again later")
        }
    }

    const handleChangeCompletion = async () => {
 
        let newCompletions = [...habit.completions]

        if (isHabitCompleted) {
            // Remove completion
            const indexForRemoval = findDateIndex(habit.completions, new Date())
            indexForRemoval >= 0 && newCompletions.splice(indexForRemoval, 1)
        } else {
            // Add completion
            findDateIndex(habit.completions, new Date()) === -1 && newCompletions.push(new Date())
        }

        let response = await axios.put(
            `${process.env.BLOOM_SERVER_ADDRESS}/habits/${habit._id}/update${isHabitCompleted ? '?completed=true' : ''}`,
            {...habit, completions: newCompletions}
        )
        response.status === 200 
        ? setIsHabitCompleted(!isHabitCompleted) 
        : Alert.alert("An Error has ocurred", "The server could not take your completion. Please try again later")

    }

    useEffect(() => {
        if (findDateIndex(habit.completions, new Date()) != -1) {
            setIsHabitCompleted(true)
        }
    }, [])

    useEffect(() => {
        getHabits()
    }, [isHabitCompleted])

    return !isUpdatingHabit ? (
        <View 
            style={styles.habitListItem}
            key={habit._id}
            >
            
            <View style={{marginRight: 10}}>
                <Pressable 
                    style={[styles.habitCompleteButton, isHabitCompleted && styles.habitCompleted]}
                    onPress={handleChangeCompletion}>
                </Pressable>
            </View>

            <View style={{flex: 1}}>
                <Text>{habit.emoji} {habit.title}</Text>
                { habit.notes && <Text style={styles.habitNotesText }>{habit.notes}</Text>}
                <Text style={styles.habitNotesText}>{new Date(habit.start_date).toLocaleDateString()} {'→'} {new Date(habit.end_date).toLocaleDateString()}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Button title="✏️" onPress={toggleIsUpdatingHabit}/>
                <Button title="🗑️" onPress={deleteHabit}/>
            </View>

        </View>
    ) : (
        <UpdateHabitCard
            habit={habit}
            cancelFunction={toggleIsUpdatingHabit}
            getHabits={getHabits}/>
    )
}