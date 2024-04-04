import { View, Text, Button, Pressable, TextInput, Modal } from "react-native";
import styles from "../styles";
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import EmojiSelector from 'react-native-emoji-selector'


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
    
    const [newHabit, setNewHabit] = useState({})
    const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false)

    const handleSubmit = (data) => {
        setNewHabit(data)
        getHabits()
        cancelFunction()
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
                setFunc={(text) => setNewHabit({...newHabit, notes: text})}/>

            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.5}}>
                    <Text>Emoji</Text>
                    {newHabit.emoji && <Text>{newHabit.emoji}</Text>}
                    <Button title="Select" onPress={() => setEmojiSelectorVisible(!emojiSelectorVisible)}/>
                </View>
                
                <View style={{flex: 0.5}}>
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

            <View style={{flexDirection: 'row'}}>
                <Button title="Cancel" onPress={cancelFunction} color={'red'}/>
                <Button title="Submit" onPress={handleSubmit}/>
            </View>
        </View>
    )
}