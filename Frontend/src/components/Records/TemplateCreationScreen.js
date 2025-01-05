import { ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Dimensions, Keyboard, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import BudgetInputFields from '../OnGoingBudget/BudgetInputFields'
import { useNavigation } from '@react-navigation/native'
import PaymentTypeModal from './PaymentTypeModal'
import TemplateType from './TemplateType'
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

const TemplateCreationScreen = ({ route }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { selectedAccount, selectedCategory, selectedLabels } = route?.params || {};
    const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState(false);
    const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
    const [account, setAccount] = useState({ id: 0, name: "", currency: "" });
    const [category, setCategory] = useState({ id: 0, name: "" });
    const [labels, setLabels] = useState();
    const [formData, setFormData] = useState({
        name: '',
        amount: 0,
        note: '',
        payee: '',
        paymentType: "Cash",
        type: 'EXPENSE'
    })

    useEffect(() => {
        // console.log(selectedAccount);
        if (selectedAccount) {
            setAccount(selectedAccount);
        }
    }, [selectedAccount])

    useEffect(() => {
        // console.log(selectedCategory);
        if (selectedCategory) {
            setCategory(selectedCategory);
        }
    }, [selectedCategory])

    useEffect(() => {
        if (selectedLabels) {
            setLabels(selectedLabels);
        }
    }, [selectedLabels])

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
            // console.log("The Labels are : ",labelIds);
            // console.log(`The Values are :  ${values.name} and accound is ${values.account.id}`);
            await user_api.post('record', {
                isTemplate: "Yes",
                name: values.name,
                userId: user.id,
                amount: values.amount,
                currency: values.account.currency,
                accountId: values.account.id,
                paymentType: values.paymentType,
                type: values.type,
                categoryId: values.category.id,
                note: values.note,
                payee: values.payee,
                labelIds: labelIds
            })

            formikActions.resetForm();
            Alert.alert("Template Created Successfully");
            navigation.goBack();
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.message}`)
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error);
            }
        }
    }

    return (
        <KeyboardAvoidingView
            enabled
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ width: Dimensions.get('window').width, flex: 1 }}
            keyboardVerticalOffset={100}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingVertical: 10,
                    paddingHorizontal: 20
                }}
            >
                <Formik
                    initialValues={{
                        ...formData,
                        account: account,
                        category: category,
                        label: labels || [],
                    }}
                    validationSchema={validationSchema}
                    onSubmit={submit}
                    enableReinitialize
                >
                    {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => {
                        const {
                            name,
                            amount,
                            paymentType,
                            account,
                            category,
                            label,
                            note,
                            payee,
                            type
                        } = values;

                        const displayLabel = getLabelItesm(label);
                        // console.log("Error in Formik : ", errors);
                        return (
                            <>
                                <BudgetInputFields
                                    label={"Name"}
                                    value={name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    error={touched.name && errors.name}
                                />

                                <BudgetInputFields
                                    label={"Amount"}
                                    value={amount}
                                    onChangeText={handleChange('amount')}
                                    onBlur={handleBlur('amount')}
                                    error={touched.amount && errors.amount}
                                    keyboardype={'numeric'}
                                />

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Select Account', { income: 'template' })}
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
                                    onPress={() => navigation.navigate('Select Category', { income: 'template' })}
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
                                        value={displayLabel} // Join array for display
                                        editable={false}
                                        color={label.length === 0 ? 'blue' : 'black'}
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
                                    label={'Note'}
                                    value={note}
                                    onChangeText={handleChange('note')}
                                    onBlur={handleBlur('note')}
                                    placeHolder={"Description"}
                                />

                                <BudgetInputFields
                                    label={'Payee'}
                                    value={payee}
                                    onChangeText={handleChange('payee')}
                                    onBlur={handleBlur('payee')}
                                />

                                <TouchableOpacity
                                    onPress={() => setIsTypeModalOpen(true)}
                                >
                                    <BudgetInputFields
                                        label={'Type'}
                                        value={type}
                                        iconName={'down'}
                                        editable={false}
                                        color={'black'}
                                    />
                                </TouchableOpacity>

                                <FormSubmitButton
                                    title={'Save'}
                                    onPressFunction={handleSubmit}
                                />

                                {isPaymentTypeModalOpen && (
                                    <PaymentTypeModal
                                        isModalVisible={isPaymentTypeModalOpen}
                                        setModalVisible={setIsPaymentTypeModalOpen}
                                        value={paymentType}
                                        setFieldValue={(text) => setFieldValue('paymentType', text)}
                                    />
                                )}

                                {isTypeModalOpen && (
                                    <TemplateType
                                        isModalVisible={isTypeModalOpen}
                                        setModalVisible={setIsTypeModalOpen}
                                        value={type}
                                        setFieldValue={(text) => setFieldValue('type', text)}
                                    />
                                )}
                            </>
                        );
                    }}

                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default TemplateCreationScreen