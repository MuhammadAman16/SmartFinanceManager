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
        justifyContent: 'center',
        marginHorizontal: 15
    },
    modalView: {
        backgroundColor: 'white',
        padding: 40,
        borderRadius: 10,
        boxShadow: 'black',
        elevation: 15
    },
    textModal: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold'
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
    },
    OnGoingBudgetContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    addButton: {
        backgroundColor: 'rgb(174,198,207)',
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '30%',
        borderRadius: 10
    },
    section: {
        marginBottom: 16,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        elevation: 3,
    },
    ongoingCard: {
        backgroundColor: '#e0f7fa', // Light cyan for ongoing budgets
    },
    successfulCard: {
        backgroundColor: '#dcedc8', // Light green for successful budgets
    },
    unsuccessfulCard: {
        backgroundColor: '#ffebee', // Light red for unsuccessful budgets
    },
    budgetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    positiveIncomeMessage: {
        fontSize: 14,
        color: '#2e7d32', // Dark green for positive message
        fontWeight: 'bold',
        marginTop: 8,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ongoingCategory: {
        color: '#2196F3', // Blue for ongoing budgets
    },
    successfulCategory: {
        color: '#4CAF50', // Green for successful budgets
    },
    unsuccessfulCategory: {
        color: '#F44336', // Red for unsuccessful budgets
    },
    viewMore: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    ongoingViewMore: {
        color: '#2196F3', // Blue for ongoing budgets
    },
    successfulViewMore: {
        color: '#4CAF50', // Green for successful budgets
    },
    unsuccessfulViewMore: {
        color: '#F44336', // Red for unsuccessful budgets
    },
    amount: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#333',
    },
    amountSpent: {
        fontSize: 14,
        color: '#666',
    },

    progressBarContainer: {
        marginVertical: 5
    },

    progressBar: {
        borderRadius: 6,
        overflow: 'hidden',

    },
    remainingAmount: {
        fontSize: 14,
        fontWeight: 'bold',

    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginTop: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    createBudgetButonText: {
        fontSize: 20,
        color: 'white'
    },
    BudgetInputFieldStyling: {
        borderBottomWidth: 1,
        borderColor: '#1b1b33',
        fontSize: 16,
        paddingLeft: 10,
        borderRadius: 8,
        paddingVertical: 5,
        flex: 1,
        paddingRight: 10
    },
    activityIndicatorViewStyle: {
        flex: 1,
        justifyContent: 'center'
    },
    BudgetInputFieldView: {
        flexDirection: 'row',          // Set the input and icon in a row
        justifyContent: 'space-between',
        alignItems: 'center',          // Align items vertically centered
        borderRadius: 5,
    },
    iconContainer: {
        paddingHorizontal: 5,          // Space around the icon
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default styles;