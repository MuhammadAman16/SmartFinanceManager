import { Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from '../Styling/Stlyes'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'
import user_api from '../../../app/api/user_api'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '@/app/context/AuthContext'

const validationSchema = Yup.object({
    fullName: Yup.string().trim().required('Full Name Field is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().trim().min(8, 'Password must be 8 or more').required('Password is required'),
    confirm: Yup.string().equals([Yup.ref('password'), null], 'Password doesnt match')
})

const SignupForm = () => {
    const {signup} = useContext(AuthContext);
    const navigation = useNavigation();
    const userInfo = {
        fullName: '',
        email: '',
        password: '',
        confirm: ''
    }

    const signUpSubmit = async (values, formikActions) => {
        try {
            const res = await user_api.post('/api/auth/signup', {
                fullName: values.fullName,
                email: values.email,
                password: values.password
            });
            formikActions.resetForm();
            Alert.alert(res.data.message);
            signup(res.data.user);
        } catch(error){
            if (error.response) {
                Alert.alert(`Error : ${error.response.data.message}`);
            } else if (error.request){
                console.log("No response from the server");
            } else {
                console.log('Error: ', error.message);
            }
        } finally{
            formikActions.setSubmitting(false);
        }
    }

    return <>
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null} style={[styles.scrollView, { width: Dimensions.get('window').width }]}>
            <Formik initialValues={userInfo} validationSchema={validationSchema}
                onSubmit={signUpSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    const { fullName, email, password, confirm } = values;
                    return (
                        <>
                            <FormInput value={fullName} label={'Full Name'} placeHolder={'James Dawson'} onChangeFunction={handleChange('fullName')}
                                error={touched.fullName && errors.fullName} onBlur={handleBlur('fullName')}/>
                            <FormInput autoCapitalize='none' label={'Email'} placeHolder={'example@example.com'} value={email}
                                onChangeFunction={handleChange('email')} onBlur={handleBlur('email')} error={touched.email && errors.email} />
                            <FormInput autoCapitalize='none' label={'Password'} placeHolder={'*******'} secureTextEntry={true} value={password} onChangeFunction={handleChange('password')} onBlur={handleBlur('password')} error={touched.password && errors.password} />
                            <FormInput autoCapitalize='none' label={'Confirm Password'} placeHolder={'*******'} secureTextEntry={true} value={confirm} onChangeFunction={handleChange('confirm')} onBlur={handleBlur('confirm')} error={touched.confirm && errors.confirm} />
                            <FormSubmitButton onPressFunction={handleSubmit} submitting={isSubmitting} title={'Signup'} />
                        </>
                    )
                }}
            </Formik>
        </KeyboardAvoidingView>
    </>
}

export default SignupForm