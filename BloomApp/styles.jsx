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
        padding: 20,
        borderRadius: 30,
        marginHorizontal: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 30,
        shadowOffset: {
            height: -10,
            width: 10
        }
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
        height: 30,
        width: '100%',
        paddingHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        fontFamily: 'American Typewriter'
    },
    hyperlinkedText: {
        color: 'blue'
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
    }
})

export default styles