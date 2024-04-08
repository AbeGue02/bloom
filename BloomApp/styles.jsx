import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    // SETTINGS AND CONTAINER STYLES
    
    container: {
        flex: 1,
        backgroundColor: '#BBE783',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#BBE783',
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    cardContainer: {
        // flex: 0.6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 30,
        shadowOffset: {
            height: -5,
            width: 5
        }
    },
    habitList: {
        width: '90%',
    },
    habitListItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 10,
        width: '100%',
    },

    // TEXT STYLES

    titleText: {
        fontSize: 36,
        fontFamily: "AmericanTypewriter-Bold",
        marginVertical: 10,
    },
    subtitleText: {
        fontSize: 20,
        fontFamily: "American Typewriter"
    },
    textField: {
        width: '100%',
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        fontFamily: 'American Typewriter'
    },
    invalidTextField: {
        borderColor: '#ff0000'
    },
    hyperlinkedText: {
        color: 'blue'
    },
    invalidText: {
        color: '#ff0000'
    },
    addNewHabitButtonText: {
        color: '#0C5300'
    },
    habitNotesText: {
        paddingLeft: 5,
        fontStyle: 'italic',
        fontSize: 12,
        color: 'gray'
    },

    //COMPONENT STYLES

    button: {
        backgroundColor: '#0C5300',
        padding: 10,
        borderRadius: 30,
        marginVertical: 10
    },
    buttonText: {
        color: 'white'
    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 18,
    },
    habitCompleteButton: {
        height: 30,
        width: 30,
        borderRadius: '50%',
        borderWidth: 1,
    },
    habitCompleted: {
        backgroundColor: '#0C5300'
    }, 
    habitSectionHeader: {
        width: '50%'
    },
    profilePictureImage: {
        height: 200,
        width: 200,
        borderRadius: 90,
        marginVertical: 20
    }
})

export default styles