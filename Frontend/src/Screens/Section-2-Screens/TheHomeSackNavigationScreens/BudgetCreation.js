import { View, KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, Keyboard, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import React, { useRef, useState, useEffect } from 'react';
import BudgetInputFields from '@/src/components/OnGoingBudget/BudgetInputFields';
import DatePickerModal from '@/src/components/OnGoingBudget/DatePickerModal';
import user_api from '@/app/api/user_api';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '@/src/components/Styling/Stlyes';
import PeriodCurrencyModal from '@/src/components/OnGoingBudget/PeriodCurrencyModal';
import NotificationComponent from '@/src/components/OnGoingBudget/NotificationComponent';

const BudgetCreation = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [currentFieldVaslue, setCurrentFieldValue] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, seIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();
    const { selectedCategories } = props.route.params || [];
    const [periodValue, setPeriodValue] = useState('None');
    const [currencyValue, setCurrencyValue] = useState('PKR');
    const [isModalVisible, setModalVisible] = useState({ value: false, modalName: '' });
    const endDateInputRef = useRef(null);


    const budgetInfo = {
        name: '',
        period: 'None',
        amount: '0',
        currency: 'PKR',
        account: 'All',
        categoryIds: [],
        labelIds: ['Add a Label+'],
        startDate: '',
        endDate: '',
    };

    const getCategoriesItems = (categ) => {
        // console.warn('Good')
        if (categ !== undefined) {
            if (categ.length === 9) {
                return 'All';
            }
            return `${categ.length} items`;
        }
    };

    const categoriesScreenIds = () => {
        setCategories(selectedCategories);
    }

    const fetchCategories = async () => {
        try {
            let res = await user_api.get('/api/category');
            const dataArray = res.data.data;
            const categ = dataArray.map(item => item.id);
            setCategories(categ);
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
    };

    useEffect(() => {
        if (selectedCategories === undefined) {
            fetchCategories();
        }
    }, []);

    useEffect(() => {
        categoriesScreenIds();
    }, [selectedCategories])

    const scrollViewRef = useRef(null);

    const handleFocus = (inputRef) => {
        inputRef?.current?.measureLayout(scrollViewRef.current, (x, y, width, height) => {
            scrollViewRef.current?.scrollTo({ y: y, animated: true });
        });
    };


    const showDatePicker = () => {
        setShowModal(true);
    };

    const hideDatePicker = () => {
        setShowModal(false);
    };

    const handleConfirm = (date, setFieldValue) => {
        setFieldValue('startDate', date);
        hideDatePicker();
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
                            {showModal &&
                                <DatePickerModal datePickerVisible={true} handleConfirm={handleConfirm} hideDatePicker={hideDatePicker} />}
                            {isModalVisible.value &&
                                <PeriodCurrencyModal
                                    isModalVisible={isModalVisible.value}
                                    setInputField={isModalVisible.modalName === 'Period' ? setPeriodValue : setCurrencyValue}
                                    setModalVisible={setModalVisible}
                                    value={isModalVisible.modalName === 'Period' ? periodValue : currencyValue}
                                    modalName={isModalVisible.modalName}
                                />
                            }
                            <Formik
                                initialValues={{ ...budgetInfo, categoryIds: categories }}
                                enableReinitialize={true}
                            >
                                {({ handleChange, handleBlur, values, setFieldValue }) => {
                                    const { name, period, amount, account, currency, categoryIds, labelIds, startDate, endDate } = values;
                                    const displayCategories = getCategoriesItems(categoryIds);
                                    return (
                                        <>
                                            <BudgetInputFields
                                                label={'Name'}
                                                value={name}
                                                onChangeText={handleChange('name')}
                                                onBlur={handleBlur('name')}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible({ value: true, modalName: 'Period' })
                                                }}>
                                                <BudgetInputFields
                                                    label={'Period'}
                                                    value={periodValue}
                                                    iconName={'down'}
                                                    editable={false}
                                                    color={'black'}
                                                />
                                            </TouchableOpacity>
                                            <BudgetInputFields
                                                label={'Amount'}
                                                value={amount.toString()} // Ensure amount is a string
                                                onChangeText={handleChange('amount')}
                                                onBlur={handleBlur('amount')}
                                                keyboardType="numeric"
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    props.navigation.navigate('Select Categories', { fieldName: 'Account', title: 'Select Accounts' })
                                                }}
                                            >
                                                <BudgetInputFields
                                                    label={'Account'}
                                                    value={account}
                                                    editable={false}
                                                    iconName={'down'}
                                                    color={'black'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalVisible({ value: true, modalName: 'Currency' })
                                                }}
                                            >
                                                <BudgetInputFields
                                                    label={'Currency'}
                                                    value={currencyValue}
                                                    iconName={'down'}
                                                    editable={false}
                                                    color={'black'}
                                                />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Keyboard.dismiss();
                                                    props.navigation.navigate('Select Categories', { fieldName: 'Category' })
                                                }}  // Navigate to the Select Categories screen
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
                                                    props.navigation.navigate('Select Labels')
                                                }}
                                            >
                                                <BudgetInputFields
                                                    label={'Labels'}
                                                    value={labelIds.join(', ')} // Join array for display
                                                    editable={false}
                                                    color={'blue'}
                                                />
                                            </TouchableOpacity>
                                            <BudgetInputFields
                                                label={'Start Date'}
                                                value={startDate}
                                                onChangeText={handleChange('startDate')}
                                                onBlur={handleBlur('startDate')}
                                                onFocus={() => handleFocus(startDate)}
                                            />
                                            <BudgetInputFields
                                                label={'End Date'}
                                                value={endDate}
                                                onChangeText={handleChange('endDate')}
                                                onBlur={handleBlur('endDate')}
                                                onFocus={() => handleFocus(endDate)}
                                                inputRef={endDateInputRef}
                                            />
                                        </>
                                    );
                                }}
                            </Formik>
                            <NotificationComponent />
                        </View>
                    </ScrollView>
                )
            }
        </KeyboardAvoidingView>
    );
};

export default BudgetCreation;
