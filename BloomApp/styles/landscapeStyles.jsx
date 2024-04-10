import { StyleSheet } from "react-native";

const landscapeStyles = StyleSheet.create({
    cardContainer: {
        // flex: 0.6,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 30,
        width: '60%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 30,
        shadowOffset: {
            height: -5,
            width: 5
        }
    },
})

export default landscapeStyles