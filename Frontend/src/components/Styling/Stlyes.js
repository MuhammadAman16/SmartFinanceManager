import { StyleSheet, StatusBar } from "react-native";

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
    },
    // LABEL SCREEN STYLING
    LabelScreenCancelButton: {
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 5,
        alignItems: 'center'
    },
    LabelScreenCancelButtonText: {
        padding: 10,
        fontSize: 18
    },
    LabelScreenScrollViewStyling: {
        flex: 1,
        backgroundColor: '#dcdcdc'
    },
    LabelScreenMapViewStyling: {
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        backgroundColor: 'white'
    },
    LabelScreenColorViewSyling: {
        marginHorizontal: 20,
        width: 30,
        height: 30,
        borderRadius: 10
    },
    LabelScreenLabelTextStyling: {
        fontSize: 16
    },
    LabelScreenAddLabelButtonViewStyling: {
        backgroundColor: '#dcdcdc',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    LabelScreenAddLabelButtonStyling: {
        margin: 20,
        backgroundColor: 'rgba(34,68,35,255)',
        borderRadius: 50,
        boxShadow: 'black',
        elevation: 5
    },
    LabelScreenAddLablePlusIconStyling: {
        margin: 15
    },
    LabelScreenTTextColorView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    // CATEGORIES SCREEN STYLING
    CategoriesScreenScrollViewStyling: {
        flex: 1
    },
    CategoriesScreenViewStyling: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    CategoriesScreenAllCategoryViewStyling: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    CategoriesScreenAllCategoryTextFeatherViewStyling: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#8fbc8f',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    CategoriesScreenAllCategoryTextStyling: {
        marginLeft: 20
    },
    CategoriesScreenSelectCategoryTextStyling: {
        backgroundColor: '#dcdcdc',
        paddingHorizontal: 30
    },
    CategoriesScreenItemIamageStyling: {
        width: 35,
        height: 35,
        borderRadius: 50
    },
    // Profile Screen Styling
    ProfileScreencontainer: {
        flexGrow: 1,
        backgroundColor: '#f0f4f7',
        padding: 16,
    },
    profileContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        marginBottom: 24,
    },
    ProfileScreenTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    ProfileScreenInfoContainer: {
        marginBottom: 24,
    },
    ProfileScreenlabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#555',
        marginBottom: 8,
    },
    ProfileScreenInfo: {
        fontSize: 18,
        color: '#333',
        marginBottom: 8,
    },
    ProfileScreenEmailNote: {
        fontSize: 14,
        color: '#888',
    },
    ProfileScreenResetPasswordContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
    },
    ProfileScreenSubTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    ProfileScreenInput: {
        height: 48,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    ProfileScreenButton: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 12,
        alignSelf: 'center',
    },
    ProfileScreenButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    ProfileScreenErrorText: {
        color: '#ff4d4d',
        marginBottom: 12,
        textAlign: 'center',
    },
    // FAQ Screen Styling
    FAQScreenContainer: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        padding: 16,
    },
    FAQScreenTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#333",
    },
    FAQScreenItem: {
        marginBottom: 12,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
        overflow: "hidden",
    },
    FAQScreenQuestionContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#e0e0e0",
    },
    FAQScreenQuestion: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    FAQScreenAnswerContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        overflow: "hidden",
    },
    FAQScreenAnswer: {
        fontSize: 14,
        color: "#555",
    },
    // Follow ScreenStyling
    FollowScreenContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        alignItems: 'center',
    },
    FollowScreenTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    FollowScreenLinksContainer: {
        width: '100%',
        paddingHorizontal: 16,
    },
    FollowScreenLink: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 4,
    },
    FollowScreenLinkText: {
        fontSize: 20,
        marginLeft: 12,
        color: '#fff',
        fontWeight: '500',
    },
    // About Screen Styling
    AboutScreenContainer: {
        flexGrow: 1,
        backgroundColor: '#f0f4f7',
        padding: 16,
    },
    AboutScreenHeader: {
        alignItems: 'center',
        marginBottom: 24,
    },
    AboutScreenLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    AboutScreenTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    AboutScreenDescription: {
        fontSize: 18,
        color: '#555',
        marginBottom: 24,
        textAlign: 'center',
    },
    AboutScreenFeatureSection: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        elevation: 4,
        marginBottom: 24,
    },
    AboutScreenFeatureTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    AboutScreenFeatureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    AboutScreenFeatureIcon: {
        fontSize: 28,
        marginRight: 12,
    },
    AboutScreenFeatureText: {
        fontSize: 16,
        color: '#444',
        flex: 1,
    },
    AboutScreenFooter: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
    // Help Screen Styling
    HelpScreenContainer: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    HelpScreenSearchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    HelpScreenSearchIcon: {
        marginRight: 8,
    },
    HelpScreenSearchInput: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    HelpScreenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    HelpScreenSection: {
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    HelpScreenSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    HelpScreenSectionContent: {
        fontSize: 14,
        color: '#555',
    },
    HelpScreenNoResult: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    ColorComponentView: {
        width: 250,
        height: 30
    },
    ColorView: {
        marginVertical: 5
    }
})

export default styles;