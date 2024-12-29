import { Text, KeyboardAvoidingView, Platform, Dimensions, TouchableOpacity, View, ScrollView, Keyboard, Alert } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import styles from '../Styling/Stlyes'
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

const ExpenseForm = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { selectedAccount } = route?.params || {};
  const { selectedCategory } = route?.params || {};
  const { selectedLabels } = route?.params || {};
  const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const status = 'Cleared';
  const paymentType = 'Cash';
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePicerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [account, setAccount] = useState({ id: 0, name: "", currency: "" });
  const [category, setCategory] = useState({ id: 0, name: "" });
  const [labels, setLabels] = useState();


  const record = {
    isTemplate: 'No',
    name: 'Test Record',
    amount: 0,
    note: '',
    currency: 'PKR',
    payee: '',
    warranty: 0,
    attachment: 'Add Receipt'
  };

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
      await user_api.post('/record', {
        isTemplate: record.isTemplate,
        name: record.name,
        userId: user.id,
        amount: values.amount,
        currency: account.currency,
        accounId: values.account.id,
        paymentType: values.paymentType,
        datetime: `${values.date} ${values.time}`,
        type: "EXPENSE",
        status: values.status,
        categoryId: values.category.id,
        note: values.note,
        payee: values.payee,
        warranty: values.warranty,
        labelIds: labelIds,
        attachment: values.attachment,
        payee: values.payee
      })

      formikActions.resetForm();
      Alert.alert("Expense Record Created Successfully");
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
      style={[styles.scrollView, { width: Dimensions.get('window').width, flex: 1 }]}
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around'
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'grey',
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: 'rgb(229, 228, 226)',
                borderRadius: 7
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text>Income</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'rgba(56,142,60,255)',
                padding: 10,
                paddingHorizontal: 20,
                backgroundColor: 'rgb(229, 228, 226)',
                borderRadius: 7
              }}
              onPress={() => {
                console.warn('You Already on the Expense Form');
              }}
            >
              <Text>Expense</Text>
            </TouchableOpacity>
          </View>
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
            >EXPENSE</Text>
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
              label: labels || [],
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
                payee,
                label,
                date,
                time,
                paymentType,
                warranty,
                status,
                attachment
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
                    onPress={() => navigation.navigate('Select Account', { income: false })}
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
                    onPress={() => navigation.navigate('Select Category', { income: false })}
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
                    label={'Payee'}
                    value={payee}
                    onChangeText={handleChange('payee')}
                    onBlur={handleBlur('payee')}
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
                  {/* <BudgetInputFields
                    label={'Attachment'}
                    value={attachment}
                    onChangeText={handleChange('attachment')}
                    onBlur={handleBlur('attachment')}
                  /> */}
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

export default ExpenseForm