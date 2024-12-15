import { Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from '../Styling/Stlyes'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'
import user_api from '../../../app/api/user_api'
import { AuthContext } from '@/app/context/AuthContext'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Email is Required'),
    password: Yup.string().trim().min(8, 'Password must be 8 or more').required('Password is Required')
})

const LoginForm = () => {
    const {login} = useContext(AuthContext);
    const userInfo = {
        email: '',
        password: ''
    }

    const loginsubmit = async (values, formikActions) => {
        try{
            const res = await user_api.post('auth/login', {
                ...values
            });
            formikActions.resetForm();
            Alert.alert(res.data.message);
            login(res.data.token) 
        } catch(error) {
            if (error.response){
                Alert.alert(`Error: ${error.response.data.error}`)
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error.error);
            }
        } finally {
            formikActions.setSubmitting(false);
        }
    }

    return <>
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null} style={[styles.scrollView, { width: Dimensions.get('window').width }]}>
            <Formik initialValues={userInfo} validationSchema={validationSchema}
                onSubmit={loginsubmit}
                >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => {
                    const {email, password} = values;
                    return (
                        <>
                            <FormInput label={'Email'} placeHolder={'example@example.com'} value={email}
                                onChangeFunction={handleChange('email')} autoCapitalize='none'
                                error={touched.email && errors.email} onBlur={handleBlur('email')}/>
                            <FormInput label={'Password'} placeHolder={'*******'} secureTextEntry={true} value={password}
                                onChangeFunction={handleChange('password')} autoCapitalize='none'
                                error={touched.password && errors.password} onBlur={handleBlur('password')}/>
                            <FormSubmitButton title={'Login'} onPressFunction={handleSubmit} submitting={isSubmitting}/>
                        </>
                    );
                }}
            </Formik>
        </KeyboardAvoidingView>
    </>
}

export default LoginForm