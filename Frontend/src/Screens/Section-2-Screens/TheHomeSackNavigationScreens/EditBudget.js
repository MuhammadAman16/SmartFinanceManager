import {
    View,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup'
import React, { useRef, useState, useEffect, useContext } from 'react';
import BudgetInputFields from '@/src/components/OnGoingBudget/BudgetInputFields';
import user_api from '@/app/api/user_api';
import styles from '@/src/components/Styling/Stlyes';
import PeriodCurrencyModal from '@/src/components/OnGoingBudget/PeriodCurrencyModal';
import NotificationComponent from '@/src/components/OnGoingBudget/NotificationComponent';
import FormSubmitButton from '@/src/components/Login&Signup/FormSubmitButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AuthContext } from '@/app/context/AuthContext';
import DateInputField from '@/src/components/OnGoingBudget/DateInputField';
import moment from 'moment-timezone';

const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, 'Name must be 3 or more').required('Name field is required'),
    period: Yup.string().test('notNone', 'Please select a Period value', function (val) {
        return val !== 'None';
    }),
    amount: Yup.number()
        .required('Amount field is required')
        .positive('Amount should be positive')
        .integer('Amount should be an integer')
        .moreThan(0, 'Amount cannot be zero'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
        .nullable() // Allow null values
        .typeError('Invalid date selected') // Custom error for invalid dates
        .when('period', {
            is: 'One-time',
            then: schema => schema
                .required('End date is required for One-time period')
                .min(Yup.ref('startDate'), 'End date cannot be before the start date'),
            otherwise: schema => schema.notRequired(),
        }),
});



const EditBudget = (props) => {
    const formatDate = (rawDate) => {
        const dateToBeFormat = new Date(rawDate);

        return `${dateToBeFormat.getFullYear()}-${dateToBeFormat.getMonth() + 1}-${dateToBeFormat.getDate()}`
    };

    const todaysDate = new Date();
    const { user } = useContext(AuthContext);
    const [budget, setBudget] = useState();
    const [showModal, setShowModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [labels, setLabels] = useState();
    const [loading, setLoading] = useState(true);
    const { selectedCategories, selectedLabels, selectedAccounts } = props.route.params || [];
    const [periodValue, setPeriodValue] = useState('None');
    const [currencyValue, setCurrencyValue] = useState('PKR');
    const [isModalVisible, setModalVisible] = useState({ value: false, modalName: '' });
    const [selectedField, setSelectedField] = useState(null);

    const budgetInfo = {
        name: budget?.name || '',
        startDate: budget?.startDate || formatDate(todaysDate),
        endDate: budget?.endDate || null,
        // amount: budget?.amount || 0
    };

    const getCategoriesItems = (categ) => {
        if (categ !== undefined) {
            if (categ.length === 9) {
                return 'All';
            }
            return categ.map(cat => cat.name).join(', ')
        }
    };
    const getAccountItems = (account) => {
        // console.log("Accounts : ", account);
        if (account !== undefined) {
            if (account.length >= 16) {
                return 'All';
            }
            return account.map(acc => acc.name).join(', ')
        }
    };

    const getLabelItesm = (label) => {
        if (label !== undefined) {
            if (label.length !== 0) {
                return label.map(lab => lab.name).join(', ')
            }
            return "Add a Label+"
        }
    }

    const fetchBudgetByID = async () => {
        try {
            const result = await user_api.get(`budget/${props.route.params.itemId}`);
            setBudget(result.data);
            setPeriodValue(result.data.period);
            setCurrencyValue(result.data.currency);
            setCategories(result.data.Categories.map(cat => ({
                id: cat.id,
                name: cat.name
            })));
            setAccounts(result.data.Accounts.map(acc => ({
                id: acc.id,
                name: acc.name
            })));
            setLabels(result.data.Labels.map(lab => ({
                id: lab.id,
                name: lab.name
            })));
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBudgetByID();
    }, [])

    useEffect(() => {
        if (selectedCategories) {
            setCategories(selectedCategories);
        }
    }, [selectedCategories])

    useEffect(() => {
        if (selectedAccounts) {
            setAccounts(selectedAccounts);
        }
    }, [selectedAccounts])

    useEffect(() => {
        setLabels(selectedLabels);
    }, [selectedLabels])

    const scrollViewRef = useRef(null);

    // const handleFocus = (inputRef) => {
    //     inputRef?.current?.measureLayout(scrollViewRef.current, (x, y, width, height) => {
    //         scrollViewRef.current?.scrollTo({ y: y, animated: true });
    //     });
    // };

    const handleConfirm = (date, setFieldValue, fieldValue) => {
        // Check if the date is valid
        if (!moment(date).isValid()) {
            console.error('Invalid date:', date);
            return; // Exit if the date is not valid
        }

        // Convert the date to Karachi timezone
        const formattedDate = moment(date).tz('Asia/Karachi').format('YYYY-MM-DD'); // Format as needed
        setFieldValue(fieldValue, formattedDate); // Update formik state
        setShowModal(false);
    };



    const saveBudget = async (values, formikActions) => {
        // if (values.endDate === '') {
        //     console.log('Good');
        // } else {
        //     console.log('Bad');
        // }
        try {
            const categ = values.categoryIds.map(cat => cat.id);
            const labels = values.labelIds.map(lab => lab.id);
            const acc = values.accountIds.map(acc => acc.id);
            let endDate = values.endDate;

            switch (values.period) {
                case 'Week':
                    const weekDate = new Date();
                    weekDate.setDate(weekDate.getDate() + 7);
                    endDate = formatDate(weekDate);
                    break;

                case 'Month':
                    const monthDate = new Date();
                    monthDate.setMonth(monthDate.getMonth() + 1);
                    endDate = formatDate(monthDate);
                    break;

                case 'Year':
                    const yearDate = new Date();
                    yearDate.setFullYear(yearDate.getFullYear() + 1);
                    endDate = formatDate(yearDate);
                    break;

                default:
                    endDate = values.endDate;
                    break;
            }

            await user_api.put(`budget/${props.route.params.itemId}`, {
                name: values.name,
                period: values.period,
                currency: values.currency,
                amount: values.amount,
                accountIds: acc,
                labelIds: labels,
                categoryIds: categ,
                startDate: values.startDate,
                endDate: endDate,
                userId: user.id
            });

            formikActions.resetForm();
            Alert.alert("Budget Updated Successfully");
            props.navigation.navigate('Your Budgets');
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.message}`)
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error.error);
            }
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            {loading ? (
                <View style={styles.activityIndicatorViewStyle}>
                    <ActivityIndicator size={'large'} color={'blue'} />
                </View>
            ) :
                (
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={{ padding: 20 }}>
                            <Formik
                                initialValues={{
                                    ...budgetInfo,
                                    categoryIds: categories,
                                    period: periodValue,
                                    currency: currencyValue,
                                    labelIds: labels || [],
                                    accountIds: accounts,
                                    amount: String(budget?.amount) || '0'
                                }}
                                validationSchema={validationSchema}
                                onSubmit={saveBudget}
                                enableReinitialize
                            >
                                {({ handleChange, handleBlur, values, errors, touched, handleSubmit, setFieldValue }) => {
                                    const { name, period, amount, accountIds, categoryIds, currency, labelIds, startDate, endDate } = values;
                                    // console.log("accountIds : ", accountIds);
                                    const displayCategories = getCategoriesItems(categoryIds);
                                    const displayAccounts = getAccountItems(accountIds);
                                    const displayLabels = getLabelItesm(labelIds);
                                    console.log("Error in Formik : ", errors);
                                    return (
                                        <>
                                            <BudgetInputFields
                                                label={'Name'}
                                                value={name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                                error={touched.name && errors.name}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible({ value: true, modalName: 'Period' })
                                                }}>
                                                <BudgetInputFields
                                                    label={'Period'}
                                                    value={period}
                                                    iconName={'down'}
                                                    editable={false}
                                                    color={'black'}
                                                    error={touched.period && errors.period}
                                                />
                                            </TouchableOpacity>
                                            {period === 'One-time' && (
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-start',
                                                    justifyContent: 'space-between',
                                                    marginTop: 20,
                                                    marginHorizontal: 5
                                                }}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedField('startDate');
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        <DateInputField
                                                            lable={'Start Date'}
                                                            value={startDate}
                                                            error={touched.startDate && errors.startDate}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setSelectedField('endDate');
                                                            setShowModal(true);
                                                        }}

                                                    >
                                                        <DateInputField
                                                            lable={'End Date'}
                                                            value={endDate}
                                                            error={touched.endDate && errors.endDate}
                                                        />
                                                    </TouchableOpacity>
                                                    {/* <View style={{ flex: 1 }}>
                                                        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Start Date</Text>
                                                        <TextInput
                                                            style={{
                                                                borderBottomWidth: 1,
                                                                paddingVertical: 8,
                                                                width: '100%',
                                                                borderRadius: 5,
                                                                paddingHorizontal: 10
                                                            }}
                                                            editable={false}
                                                            value={startDate}
                                                        />
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setShowModal(true); // This will trigger the DatePickerModal
                                                        }}
                                                        activeOpacity={0.7} // Optional: gives visual feedback when pressed
                                                    >
                                                        <View style={{ flex: 1, marginHorizontal: 10 }}>
                                                            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>End Date</Text>
                                                            <TextInput
                                                                style={{
                                                                    borderBottomWidth: 1,
                                                                    paddingVertical: 8,
                                                                    width: '100%',
                                                                    borderRadius: 5,
                                                                    paddingHorizontal: 10,
                                                                }}
                                                                placeholder="Select End Date"
                                                                editable={false} // Make sure TextInput is non-editable
                                                                value={endDate}
                                                            />
                                                        </View>
                                                    </TouchableOpacity> */}

                                                </View>
                                            )}


                                            <BudgetInputFields
                                                label={'Amount'}
                                                value={amount}
                                                onChangeText={handleChange('amount')}
                                                onBlur={handleBlur('amount')}
                                                keyboardType="numeric"
                                                error={touched.amount && errors.amount}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    props.navigation.navigate('Select Categories', {
                                                        fieldName: 'Account', title: 'Select Accounts',
                                                        selectedAccounts: values.accountIds,
                                                        onAccountsSelected: (selectedAccounts) => {
                                                            setFieldValue('accountIds', selectedAccounts);
                                                        }
                                                    })
                                                }}
                                            // props.navigation.navigate('Select Categories', {
                                            //     fieldName: 'Category',
                                            //     selectedCategories: values.categoryIds,
                                            //     onCategoriesSelected: (selectedCategories) => {
                                            //         setFieldValue('categoryIds', selectedCategories)
                                            //     }
                                            // })
                                            >
                                                <BudgetInputFields
                                                    label={'Account'}
                                                    value={displayAccounts}
                                                    editable={false}
                                                    iconName={'down'}
                                                    color={'black'}
                                                />
                                            </TouchableOpacity>
                                            {/* <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible({ value: true, modalName: 'Currency' })
                                                }}
                                            > */}
                                                <BudgetInputFields
                                                    label={'Currency'}
                                                    value={currency}
                                                    editable={false}
                                                />
                                            {/* </TouchableOpacity> */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    props.navigation.navigate('Select Categories', {
                                                        fieldName: 'Category',
                                                        selectedCategories: values.categoryIds,
                                                        onCategoriesSelected: (selectedCategories) => {
                                                            setFieldValue('categoryIds', selectedCategories)
                                                        }
                                                    })
                                                }}
                                            >
                                                <BudgetInputFields
                                                    label={'Category'}
                                                    value={displayCategories}
                                                    editable={false}
                                                    iconName={'down'}
                                                    color={'black'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    props.navigation.navigate('Select Labels', {
                                                        selectedLabels: values.labelIds,
                                                        onLabelsSelected: (selectedLabels) => {
                                                            setFieldValue('labelIds', selectedLabels)
                                                        }
                                                    })
                                                }}
                                            >
                                                <BudgetInputFields
                                                    label={'Labels'}
                                                    value={displayLabels} // Join array for display
                                                    editable={false}
                                                    color={labelIds.length === 0 ? 'blue' : 'black'}
                                                />
                                            </TouchableOpacity>
                                            <FormSubmitButton
                                                title={'Save'}
                                                onPressFunction={handleSubmit}
                                            />
                                            {isModalVisible.value &&
                                                <PeriodCurrencyModal
                                                    isModalVisible={isModalVisible.value}
                                                    setInputField={(value) => {
                                                        setFieldValue(isModalVisible.modalName.toLowerCase(), value);
                                                        if (isModalVisible.modalName === 'Period') {
                                                            setPeriodValue(value);
                                                        } else { setCurrencyValue(value); }
                                                    }}
                                                    setModalVisible={setModalVisible}
                                                    value={isModalVisible.modalName === 'Period' ? periodValue : currencyValue}
                                                    modalName={isModalVisible.modalName}
                                                />
                                            }
                                            {showModal &&
                                                <DateTimePickerModal
                                                    isVisible={true}
                                                    mode="date"
                                                    onConfirm={(date) => handleConfirm(date, setFieldValue, selectedField)}
                                                    onCancel={() => setShowModal(false)}
                                                />}
                                        </>
                                    );
                                }}
                            </Formik>
                            <NotificationComponent />
                        </View>
                    </ScrollView>
                )
            }
        </KeyboardAvoidingView >
    );
};

export default EditBudget;
