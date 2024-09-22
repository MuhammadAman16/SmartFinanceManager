import { Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import styles from '../Styling/Stlyes'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'
import user_api from '../../../app/api/user_api'
import { useNavigation } from '@react-navigation/native'

const validationSchema = Yup.object({
    username: Yup.string().trim().min(3, 'Invalid Username').required('Username is required'),
    name: Yup.string().trim().required('Name Field is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().trim().min(8, 'Password must be 8 or more').required('Password is required'),
    confirm: Yup.string().equals([Yup.ref('password'), null], 'Password doesnt match')
})

const SignupForm = () => {
    const navigation = useNavigation();
    const userInfo = {
        username: '',
        name: '',
        email: '',
        password: '',
        confirm: ''
    }

    const signUp = async (values, formikActions) => {
        try {
            const res = await user_api.post('/api/auth/signup', {
                username: values.username,
                name: values.name,
                email: values.email,
                password: values.password
            });
            formikActions.resetForm();
            Alert.alert(res.data.message);
            navigation.navigate('Home');
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
                onSubmit={signUp}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
                    const { username, name, email, password, confirm } = values;
                    return (
                        <>
                            <FormInput label={'Username'} placeHolder={'jamesdawson876'} value={username}
                                onChangeFunction={handleChange('username')} error={touched.username && errors.username} onBlur={handleBlur('username')} autoCapitalize='none'/>
                            <FormInput value={name} label={'Name'} placeHolder={'James Dawson'} onChangeFunction={handleChange('name')}
                                error={touched.name && errors.name} onBlur={handleBlur('name')}/>
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