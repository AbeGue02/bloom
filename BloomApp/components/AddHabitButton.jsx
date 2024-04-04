import { Pressable, Text } from "react-native";
import styles from "../styles";


export default function AddHabitButton({toggleFunc}) {
    return (
        <Pressable 
            style={[styles.cardContainer, {flexDirection: 'row',}]}
            onPress={toggleFunc}>
            <Text style={[styles.searchBar, styles.addNewHabitButtonText]}>+ Add New Habit</Text>
        </Pressable>
    )
}