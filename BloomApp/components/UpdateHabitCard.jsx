import { View, Text, Button, Pressable, TextInput, Modal, Switch, Alert } from "react-native";
import styles from "../styles/styles";
import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import EmojiSelector from 'react-native-emoji-selector'
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import UserContext from "../Context";

const UpdateHabitFormField = ({formTitle, value, setFunc, additionalProps}) => (
    <>
        <Text>{formTitle}</Text>
        <TextInput
            style={styles.textField}
            placeholder={formTitle}
            value={value}
            onChangeText={setFunc}
            {...additionalProps}/>
    </>
)

export default function UpdateHabitCard({ habit, cancelFunction, getHabits }) {
    
    const { user, setUser } = useContext(UserContext)

    const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false)
    const [updatedHabit, setUpdatedHabit] = useState({
        user: user._id,
        title: habit.title,
        notes: habit.notes,
        emoji: habit.emoji,
        frequency: habit.frequency,
        reminders: habit.reminders,
        start_date: new Date(habit.start_date),
        end_date: new Date(habit.end_date),
        reminder_time: new Date(habit.reminder_time),
        completions: [...habit.completions]
    })

    const handleSubmit = async () => {
        let response = await axios.put(`${process.env.BLOOM_SERVER_ADDRESS}/habits/${habit._id}/update`, updatedHabit)
            .then((response) => {
                getHabits()
                cancelFunction()
            })
            .catch(() => Alert.alert("Error", "Make sure you have input valid data in all fields"))
    }

    return (
        <View style={[styles.cardContainer, {width: '100%'}]}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={emojiSelectorVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setEmojiSelectorVisible(!emojiSelectorVisible);
                }}>
                <View style={styles.container}>
                    <EmojiSelector onEmojiSelected={emoji => {
                        setUpdatedHabit({...updatedHabit, emoji: emoji})
                        setEmojiSelectorVisible(!emojiSelectorVisible)
                    }}/>
                </View>
            </Modal>
                
            <UpdateHabitFormField
                formTitle={"Title"}
                value={updatedHabit.title}
                setFunc={(text) => setUpdatedHabit({...updatedHabit, title: text})}/>

            <UpdateHabitFormField
                formTitle={"Notes"}
                value={updatedHabit.notes}
                setFunc={(text) => setUpdatedHabit({...updatedHabit, notes: text})}
                additionalProps={{
                    multiline: true
                }}/>

            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flex: 0.5, alignItems: "center"}}>
                    <Text>Emoji</Text>
                    {updatedHabit.emoji  && <Text style={{fontSize: 40}}>{updatedHabit.emoji}</Text>}
                    <Button title="Select" onPress={() => setEmojiSelectorVisible(!emojiSelectorVisible)}/>
                </View>
                
                <View style={{flex: 0.5,}}>
                    <Text>Frequency</Text>
                    <Dropdown
                        mode="default"
                        value={updatedHabit.frequency}
                        onChange={(item) => setUpdatedHabit({...updatedHabit, frequency: item.value})}
                        labelField={'label'}
                        valueField={'value'}
                        data={[
                            { label: 'Daily', value: 'daily' },
                            { label: 'Weekly', value: 'weekly' },
                            { label: 'Monthly', value: 'monthly' },
                            { label: 'Yearly', value: 'yearly' },
                        ]}/>
                </View>

            </View>

            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Text>Start Date</Text>
                    <DateTimePicker
                        value={updatedHabit.start_date}
                        mode="date"
                        onChange={(e, date) => {
                            setUpdatedHabit({...updatedHabit, start_date: date})
                        }}
                    />
                </View>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Text>End Date</Text>
                    <DateTimePicker
                        value={updatedHabit.end_date}
                        mode="date"
                        onChange={(e, date) => {
                            setUpdatedHabit({...updatedHabit, end_date: date})
                        }}
                    />
                    {(updatedHabit.end_date && (updatedHabit.end_date < updatedHabit.start_date)) && <Text>End Date has to be later than Start Date</Text>}
                </View>
            </View>
            
            <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Text>Reminders?</Text>
                    <Switch
                        value={updatedHabit.reminders}
                        onValueChange={(value) => setUpdatedHabit({...updatedHabit, reminders: value})}/>
                </View>
                
                {
                    updatedHabit.reminders 
                    && (
                        <View style={{flex: 0.5, alignItems: 'center', }}>
                            <Text>Reminder Time</Text>
                            <DateTimePicker
                                value={updatedHabit.reminder_time}
                                mode="time"
                                onChange={(e, time) => {
                                    setUpdatedHabit({...updatedHabit, reminder_time: time})
                                }}
                            />
                        </View>
                    )
                }
            </View>

            <View style={{flexDirection: 'row'}}>
                <Button title="Cancel" onPress={cancelFunction} color={'red'}/>
                <Button title="Submit" onPress={handleSubmit}/>
            </View>
        </View>
    )
}