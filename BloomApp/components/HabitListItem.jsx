import { View, Text, Pressable } from "react-native";
import styles from "../styles";
import { useEffect, useState } from "react";

export default function HabitListItem({habit}) {
    
    const [isHabitCompleted, setIsHabitCompleted] = useState(false)

    const checkIfHabitCompleted = (completions) => {
        
        const targetYear = new Date().getFullYear()
        const targetMonth = new Date().getMonth()
        const targetDate = new Date().getDate()
        
        completions.some((completion) => {
          const year = dateObj.getFullYear()
          const month = dateObj.getMonth()
          const day = dateObj.getDate()
      
          if (year === targetYear && month === targetMonth && day === targetDate) {
            return true
          }
        })

        return false
    }

    useEffect(() => {
        console.log(checkIfHabitCompleted(habit.completions))
    }, [])
    
    return (
        <View 
            style={styles.habitListItem}
            key={habit._id}
            >
            
            <View style={{marginRight: 10}}>
                <Pressable 
                    style={[styles.habitCompleteButton, isHabitCompleted && styles.habitCompleted]}
                    onPress={() => setIsHabitCompleted(!isHabitCompleted)}>
                </Pressable>
            </View>

            <View style={{flex: 1}}>
                <Text>{habit.emoji} {habit.title}</Text>
            </View>

        </View>
    )
}