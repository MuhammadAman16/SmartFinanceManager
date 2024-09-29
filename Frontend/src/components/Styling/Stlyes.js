import { StyleSheet, StatusBar } from "react-native-web";

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
    },
    safeWrapper: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#eeeeee'
    },
    viewInput: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20
    },
    labelsContainer: {
        justifyContent: 'space-around',
        marginHorizontal: 5
    },
    label: {
        color: 'grey',
    },
    inputsContainer: {
        justifyContent: 'space-around',
        flex: 1, // Make the input fields take more space than the labels
        marginHorizontal: 5,
    },
    textinput: {
        borderBottomWidth: 2,
        fontSize: 15,
        color: 'black'
    },
    descView: {
        flex: 1,
        backgroundColor: 'white',
        marginVertical: 10,
        paddingHorizontal: 25
    },
    desc: {
        marginVertical: 10,
    },
    save: {
        backgroundColor: '#4890db',
        flex: 3,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 2
    },
    cancel: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5
    },
    touchtext: {
        alignSelf: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        borderRadius: 10
    },
    maptouch: {
        backgroundColor: 'white',
        borderColor: '#d5d5d5',
        borderWidth: 1,
        padding: 20,
        width: '45%',
        alignItems: 'center'
    },
    mapText: {
        fontSize: 15
    },
    buttonView: {
        flexDirection: 'row',
        paddingVertical: 30,
        paddingHorizontal: 5,
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    textView: {
        backgroundColor: 'black',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons: {
        flexDirection: 'row'
    },
    drawerSecionStyle: {
        marginHorizontal: 5,
        borderBottomWidth: 1,
        borderColor: '#e4e4e4'
    },
    AvatarViewStyle: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgb(50,205,50)',
        padding: 50,
        flexDirection: 'row',
        marginTop: 0
    },
    userFullNameAvatar: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    AppNameAvatar: {
        fontSize: 10
    },
    drawerScrollViewStyling: {
        marginTop: -40
    },
    StatsViewStyling: {
        marginLeft: 20
    }
})

export default styles;