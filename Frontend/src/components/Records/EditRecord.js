import { KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, View, ScrollView, Keyboard, Alert, Text, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import BudgetInputFields from '../OnGoingBudget/BudgetInputFields'
import StatusModal from './StatusModal'
import PaymentTypeModal from './PaymentTypeModal'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment-timezone'
import { useNavigation } from '@react-navigation/native'
import FormSubmitButton from '../Login&Signup/FormSubmitButton'
import user_api from '@/app/api/user_api'
import { AuthContext } from '@/app/context/AuthContext'


const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, 'Name should be more than 3').required('Name is required'),
    amount: Yup.number().typeError('Amount must be number').moreThan(0, 'Amount must be greater than 0').required('Amount is required'),
    account: Yup.object()
        .test(
            'account-id-check',
            'Account is required',
            (value) => value && value.id !== 0
        ),
    category: Yup.object()
        .test(
            'account-id-check',
            'Account is required',
            (value) => value && value.id !== 0
        )
})

const EditRecord = ({ route }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { selectedAccount } = route?.params || {};
    const { selectedCategory } = route?.params || {};
    const { selectedLabels } = route?.params || {};
    const { itemId } = route?.params || 0;
    const [recordById, setRecordById] = useState();
    const today = recordById?.date || new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const now = new Date();
    const currentTime = recordById?.time || `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const status = recordById?.status || 'Cleared';
    const paymentType = recordById?.paymentType || 'Cash';
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePicerOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [account, setAccount] = useState({ id: 0, name: "", currency: "" });
    const [category, setCategory] = useState({ id: 0, name: "" });
    const [labels, setLabels] = useState();
    const [isLoading, setIsLoading] = useState(true);


    const record = {
        name: recordById?.name || 'Test Record',
        amount: recordById?.amount || 0,
        note: recordById?.note || '',
        payer: recordById?.payee || '',
        warranty: recordById?.warranty ?? 0
    };

    const fetchRecordById = async () => {
        try {
            const result = await user_api.get(`record/${itemId}`);
            setAccount(
                result.data?.Account
                    ? { id: result.data.Account.id, name: result.data.Account.name, currency: result.data.Account.currency }
                    : { id: 0, name: "", currency: "" }
            );
            // console.log("Working ", result.data.datetime.split("T")[1].slice(0, 5));
            setCategory(
                result.data?.Category
                    ? { id: result.data.Category.id, name: result.data.Category.name }
                    : { id: 0, name: "" }
            );
            setLabels(
                result.data?.Labels?.length !== undefined && result.data?.Labels?.length > 0
                    ? result.data?.Labels?.map((label) => ({ id: label.id, name: label.name }))
                    : []
            );
            setRecordById({
                note: result.data?.note || '',
                payee: result.data?.payee || '',
                paymentType: result.data?.paymentType || 'Cash',
                warranty: result.data?.warranty || 0,
                status: result.data?.status || 'Cleared',
                amount: result.data?.amount,
                name: result.data?.name || 'Test Record',
                date: result.data?.datetime?.split("T")[0],
                time: result.data?.datetime?.split("T")[1].slice(0, 5)
            })
        } catch (error) {
            if (error.response) {
                // Alert.alert(`Error: ${error.response.data.message}`);
                console.log("Error : ", error.response.data);
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (selectedAccount) {
            setAccount(selectedAccount);
        }
    }, [selectedAccount])

    useEffect(() => {
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
    }, [selectedCategory])

    useEffect(() => {
        setLabels(selectedLabels);
    }, [selectedLabels])

    useEffect(() => {
        fetchRecordById();
    }, [itemId])

    const handleConfirm = (date, setFieldValue) => {
        if (!moment(date).isValid()) {
            console.error('Invalid date:', date);
            return;
        }
        const formattedDate = moment(date).tz('Asia/Karachi').format('YYYY-MM-DD');
        setFieldValue('date', formattedDate);
        setIsDatePicerOpen(false);
    };

    const handleConfirmTime = (time, setFieldValue) => {
        if (!moment(time, 'HH:mm').isValid()) {
            console.error('Invalid time:', time);
            return;
        }
        const formattedTime = moment(time, 'HH:mm').tz('Asia/Karachi').format('HH:mm');
        setFieldValue('time', formattedTime);
        setIsDatePicerOpen(false);
    };

    const getLabelItesm = (label) => {
        if (label !== undefined) {
            if (label.length !== 0) {
                return label.map(lab => lab.name).join(', ')
            }
            return "Add a Label+"
        }
    }


    const submit = async (values, formikActions) => {
        try {
            const labelIds = values.label.map(label => label.id);
            // console.log(`The labelIds are ${labelIds} and values are ${values.name}`);
            await user_api.put(`record/${itemId}`, {
                name: values.name,
                userId: user.id,
                amount: values.amount,
                currency: values.account.currency,
                accountId: values.account.id,
                paymentType: values.paymentType,
                datetime: `${values.date} ${values.time}`,
                status: values.status,
                categoryId: values.category.id,
                note: values.note,
                payee: values.payee,
                warranty: values.warranty,
                labelIds: labelIds,
                payee: values.payer
            })
            
            formikActions.resetForm();
            Alert.alert("Record Updated Successfully");
            navigation.goBack();
        } catch (error) {
            if (error.response) {
                // Alert.alert(`Error: ${error.response.data.message}`);
                console.log("Error : ", error.response.data);
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error);
            }
        }
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={'blue'} />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ paddingHorizontal: 20, width: Dimensions.get('window').width, flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View
                    style={{
                        padding: 20
                    }}
                >
                    <View
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 24,
                                fontStyle: 'italic'
                            }}
                        >EDIT RECORD</Text>
                    </View>
                    <Formik
                        initialValues={{
                            ...record,
                            status: status,
                            paymentType: paymentType,
                            date: today,
                            time: currentTime,
                            account: account,
                            category: category,
                            label: labels || []
                        }}
                        validationSchema={validationSchema}
                        onSubmit={submit}
                        enableReinitialize
                    >
                        {({ handleSubmit, ...formikProps }) => {
                            // useEffect(() => {
                            //     if (handleSubmitRef) {
                            //         handleSubmitRef.current = handleSubmit;
                            //     }
                            // }, [handleSubmit]);

                            const {
                                values,
                                setFieldValue,
                                handleChange,
                                handleBlur,
                                errors,
                                touched
                            } = formikProps;

                            const {
                                amount,
                                account,
                                category,
                                note,
                                payer,
                                label,
                                date,
                                time,
                                paymentType,
                                warranty,
                                status
                            } = values;

                            const displayLabels = getLabelItesm(label);
                            // console.log("Error in Formik : ", errors);

                            return (
                                <>
                                    <BudgetInputFields
                                        label={'Amount'}
                                        value={amount}
                                        onChangeText={handleChange('amount')}
                                        onBlur={handleBlur('amount')}
                                        error={touched.amount && errors.amount}
                                        keyboardype={'numeric'}
                                    />
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Select Account', { income: 'income' })}
                                    >
                                        <BudgetInputFields
                                            label={'Account'}
                                            value={account.name}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                            error={touched.account && errors.account}
                                            placeHolder={'Select Account'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Select Category', { income: 'income' })}
                                    >
                                        <BudgetInputFields
                                            label={'Category'}
                                            value={category.name}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                            error={touched.category && errors.category}
                                            placeHolder={'Select Category'}
                                        />
                                    </TouchableOpacity>
                                    <BudgetInputFields
                                        label={'Note'}
                                        value={note}
                                        onChangeText={handleChange('note')}
                                        onBlur={handleBlur('note')}
                                        placeHolder={"Description"}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            navigation.navigate('Select Labels', {
                                                selectedLabels: values.label,
                                                onLabelsSelected: (selectedLabels) => {
                                                    setFieldValue('label', selectedLabels)
                                                }
                                            })
                                        }}
                                    >
                                        <BudgetInputFields
                                            label={'Labels'}
                                            value={displayLabels} // Join array for display
                                            editable={false}
                                            color={label.length === 0 ? 'blue' : 'black'}
                                        />
                                    </TouchableOpacity>
                                    <BudgetInputFields
                                        label={'Payer'}
                                        value={payer}
                                        onChangeText={handleChange('payer')}
                                        onBlur={handleBlur('payer')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsDatePicerOpen(true)}
                                    >
                                        <BudgetInputFields
                                            label={'Date'}
                                            value={date}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setIsTimePickerOpen(true)}
                                    >
                                        <BudgetInputFields
                                            label={'Time'}
                                            value={time}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setIsPaymentTypeModalOpen(true)}
                                    >
                                        <BudgetInputFields
                                            label={'Payment Type'}
                                            value={paymentType}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                        />
                                    </TouchableOpacity>
                                    <BudgetInputFields
                                        label={'Warranty In Months'}
                                        value={warranty}
                                        onChangeText={handleChange('warranty')}
                                        onBlur={handleBlur('warranty')}
                                        keyboardype={'numeric'}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsStatusModalOpen(true)}
                                    >
                                        <BudgetInputFields
                                            label={'Status'}
                                            value={status}
                                            iconName={'down'}
                                            editable={false}
                                            color={'black'}
                                        />
                                    </TouchableOpacity>
                                    <FormSubmitButton
                                        title={'Save'}
                                        onPressFunction={handleSubmit}
                                    />
                                    {isStatusModalOpen && (
                                        <StatusModal
                                            isModalVisible={isStatusModalOpen}
                                            setModalVisible={setIsStatusModalOpen}
                                            value={status}
                                            setFieldValue={(val) => setFieldValue('status', val)}
                                        />
                                    )}
                                    {isPaymentTypeModalOpen && (
                                        <PaymentTypeModal
                                            isModalVisible={isPaymentTypeModalOpen}
                                            setModalVisible={setIsPaymentTypeModalOpen}
                                            value={paymentType}
                                            setFieldValue={(text) => setFieldValue('paymentType', text)}
                                        />
                                    )}
                                    {isDatePickerOpen && (
                                        <DateTimePickerModal
                                            isVisible={true}
                                            mode="date"
                                            onConfirm={(date) => handleConfirm(date, setFieldValue)}
                                            onCancel={() => setIsDatePicerOpen(false)}
                                        />
                                    )}
                                    {isTimePickerOpen && (
                                        <DateTimePickerModal
                                            isVisible={true}
                                            mode="time"
                                            onConfirm={(time) => handleConfirmTime(time, setFieldValue)}
                                            onCancel={() => setIsTimePickerOpen(false)}
                                        />
                                    )}
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditRecord