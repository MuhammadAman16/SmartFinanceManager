// AccountForm.js
import React, { useState, useEffect, useContext } from "react";
import { View, Alert, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import BudgetInputFields from "@/src/components/OnGoingBudget/BudgetInputFields";
import PeriodCurrencyModal from "@/src/components/OnGoingBudget/PeriodCurrencyModal";
import { AuthContext } from "@/app/context/AuthContext";
import user_api from "@/app/api/user_api";

const validationSchema = Yup.object({
  name: Yup.string().trim().min(3, 'Name should be greater than 3').required('Name is required')
});

const AccountForm = ({ handleSubmitRef, navigation }) => {
  const { user } = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState({ value: false, modalName: '' });
  const account = {
    name: '',
    bankAccountNumber: '',
    type: 'General',
    initialValue: 0,
    currency: 'PKR'
  };

  const saveaccount = async (values, formikActions) => {
    try {
      await user_api.post('accounts', {
        ...values,
        userId: user.id
      });
      formikActions.resetForm();
      Alert.alert("Account Created Successfully");
      navigation.goBack()
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
    <View
      style={{
        flex: 1,
        padding: 20
      }}
    >
      <Formik
        initialValues={account}
        validationSchema={validationSchema}
        onSubmit={saveaccount}
      >
        {({ handleSubmit, ...formikProps }) => {
          useEffect(() => {
            if (handleSubmitRef) {
              handleSubmitRef.current = handleSubmit;
            }
          }, [handleSubmit]);

          const {
            values,
            setFieldValue,
            handleChange,
            handleBlur,
            errors,
            touched
          } = formikProps;

          const {
            name,
            bankAccountNumber,
            type,
            initialValue,
            currency
          } = values;

          return (
            <>
              <BudgetInputFields
                label={'Account Name'}
                value={name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
              />
              <BudgetInputFields
                label={'Bank Account Number'}
                value={bankAccountNumber}
                onChangeText={handleChange('bankAccountNumber')}
                onBlur={handleBlur('bankAccountNumber')}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible({ value: true, modalName: 'Type' });
                }}
              >
                <BudgetInputFields
                  label={'Type'}
                  value={type}
                  iconName={'down'}
                  editable={false}
                  color={'black'}
                />
              </TouchableOpacity>
              <BudgetInputFields
                label={'Initial Value'}
                value={initialValue}
                keyboardType={'numeric'}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, '');
                  handleChange('initialValue')(numericValue);
                }}
                onBlur={handleBlur('initialValue')}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible({ value: true, modalName: 'Currency' });
                }}
              >
                <BudgetInputFields
                  label={'Currency'}
                  value={currency}
                  iconName={'down'}
                  editable={false}
                  color={'black'}
                />
              </TouchableOpacity>

              {isModalVisible.value &&
                <PeriodCurrencyModal
                  isModalVisible={isModalVisible.value}
                  setInputField={(value) => {
                    setFieldValue(isModalVisible.modalName.toLowerCase(), value);
                  }}
                  setModalVisible={setModalVisible}
                  value={isModalVisible.modalName === 'Currency' ? currency : type}
                  modalName={isModalVisible.modalName}
                />
              }
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default AccountForm;
