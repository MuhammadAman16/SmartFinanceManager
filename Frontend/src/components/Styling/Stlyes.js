import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#1b1b33'
    },
    textWrapper: {
        flexDirection: 'row'
    },
    subText: {
        fontSize: 18,
        color: '#1b1b33'
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTouchableText: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18
    },
    viewTouchable: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 5
    },
    touchableText: {
        fontSize: 16,
        color: 'white'
    },
    loginTouchable: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    signupTouchable: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    scrollViewText: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#1b1b33',
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 8,
        paddingVertical: 5,
    },
    viewInputText: {
        fontWeight: 'bold',
        marginTop: 13
    },
    submitButtonText: {
        fontSize: 18,
        color: 'white'
    },
    submitButton: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 15
    },
    errorText: {
        color: 'red',
        fontSize: 15
    },
    errorTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 5
    },
    image: {
        width: 100,
        height: 100
    }
})

export default styles;