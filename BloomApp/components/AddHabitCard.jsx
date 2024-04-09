import { View, Text, Button, Pressable, TextInput, Modal, Switch, Alert } from "react-native";
import styles from "../styles";
import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import EmojiSelector from 'react-native-emoji-selector'
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import UserContext from "../Context";

const NewHabitFormField = ({formTitle, value, setFunc, additionalProps}) => (
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

export default function AddHabitCard({ cancelFunction, getHabits }) {
    
    const { user, setUser } = useContext(UserContext)

    const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false)
    const [newHabit, setNewHabit] = useState({
        user: user._id,
        title: "",
        notes: "",
        emoji: "",
        frequency: "daily",
        reminders: false,
        start_date: new Date(),
        end_date: new Date(),
        reminder_time: new Date()
    })

    const handleSubmit = async () => {
        await axios.post(`${process.env.BLOOM_SERVER_ADDRESS}/habits/create`, newHabit)
            .then(() => {
                getHabits()
                cancelFunction()
            })
            .catch(() => Alert.alert("Error", "Make sure you have input valid data in all fields"))
    }
    
    useEffect(() => {
        console.log(newHabit)
    }, [newHabit])

    return (
        <View style={styles.cardContainer}>

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
                        setNewHabit({...newHabit, emoji: emoji})
                        setEmojiSelectorVisible(!emojiSelectorVisible)
                    }}/>
                </View>
            </Modal>
                
            <NewHabitFormField
                formTitle={"Title"}
                value={newHabit.title}
                setFunc={(text) => setNewHabit({...newHabit, title: text})}/>

            <NewHabitFormField
                formTitle={"Notes"}
                value={newHabit.notes}
                setFunc={(text) => setNewHabit({...newHabit, notes: text})}
                additionalProps={{
                    multiline: true
                }}/>

            <View style={{flexDirection: 'row', paddingVertical: 10}}>
                <View style={{flex: 0.5, alignItems: "center"}}>
                    <Text>Emoji</Text>
                    {newHabit.emoji  && <Text style={{fontSize: 40}}>{newHabit.emoji}</Text>}
                    <Button title="Select" onPress={() => setEmojiSelectorVisible(!emojiSelectorVisible)}/>
                </View>
                
                <View style={{flex: 0.5,}}>
                    <Text>Frequency</Text>
                    <Dropdown
                        mode="default"
                        value={newHabit.frequency}
                        onChange={(item) => setNewHabit({...newHabit, frequency: item.value})}
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
                        value={newHabit.start_date}
                        mode="date"
                        onChange={(e, date) => {
                            setNewHabit({...newHabit, start_date: date})
                        }}
                    />
                </View>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Text>End Date</Text>
                    <DateTimePicker
                        value={newHabit.end_date}
                        mode="date"
                        onChange={(e, date) => {
                            setNewHabit({...newHabit, end_date: date})
                        }}
                    />
                    {(newHabit.end_date && (newHabit.end_date < newHabit.start_date)) && <Text>End Date has to be later than Start Date</Text>}
                </View>
            </View>
            
            <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View style={{flex: 0.5, alignItems: 'center'}}>
                    <Text>Reminders?</Text>
                    <Switch
                        value={newHabit.reminders}
                        onValueChange={(value) => setNewHabit({...newHabit, reminders: value})}/>
                </View>
                
                {
                    newHabit.reminders 
                    && (
                        <View style={{flex: 0.5, alignItems: 'center', }}>
                            <Text>Reminder Time</Text>
                            <DateTimePicker
                                value={newHabit.reminder_time}
                                mode="time"
                                onChange={(e, time) => {
                                    setNewHabit({...newHabit, reminder_time: time})
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