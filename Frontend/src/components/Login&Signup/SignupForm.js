import { Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from '../Styling/Stlyes'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'
import user_api from '../../../app/api/user_api'

const validationSchema = Yup.object({
    username: Yup.string().trim().min(3, 'Invalid Username').required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().trim().min(8, 'Password must be 8 or more').required('Password is required'),
    confirm: Yup.string().equals([Yup.ref('password'), null], 'Password doesnt match')
})

const SignupForm = () => {
    const userInfo = {
        username: '',
        email: '',
        password: '',
        confirm: ''
    }

    const signUp = async (formikActions) => {
        try {
            const res = await user_api.post('/create-user', {
                username, email, password
            });
            formikActions.resetForm();
        } catch(error){
            console.log(`Error while creating this user ${error}`);
        } finally{
            formikActions.setSubmitting(false);
            Alert.alert("Registration Succesfull");
        }
    }

    return <>
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null} style={[styles.scrollView, { width: Dimensions.get('window').width }]}>
            <Formik initialValues={userInfo} validationSchema={validationSchema}
                onSubmit={signUp}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    const { username, email, password, confirm } = values;
                    return (
                        <>
                            <FormInput label={'Username'} placeHolder={'James Dawson'} value={username}
                                onChangeFunction={handleChange('username')} error={touched.username && errors.username} onBlur={handleBlur('username')} />
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