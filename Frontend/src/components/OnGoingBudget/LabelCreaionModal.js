import { View, Text, Modal, Button } from 'react-native'
import React from 'react'
import styles from '../Styling/Stlyes'
import { Formik } from 'formik'
import LabelInputField from './LabelInputField'
import FormInput from '../Login&Signup/FormInput'
import FormSubmitButton from '../Login&Signup/FormSubmitButton'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, 'Label Name must be 3 or more').required('Name field is required'),
    color: Yup.string().matches(
        /^(#[0-9A-Fa-f]{3,6}|rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*0*(?:0?\.\d+|1\.?0*)\s*)?\)|[a-zA-Z]+)$/,
        'Invalid color format'
    ).required('Color field is required')
});


const LabelCreaionModal = () => {
    const Label = {
        name: '',
        color: ''
    }

    const labelsubmit = async(values, formikActions) => {
        try{
            const res = await user_api.post('/api/label', {
                ...values
            });
            formikActions.resetForm();
            Alert.alert(res.data.message);
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
    return (
        <Modal
            transparent={true}
            visible={true}
            animationType="fade"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textModal}>Add New Label</Text>
                    <Formik
                        initialValues={Label}
                        validationSchema={validationSchema}
                        onSubmit={labelsubmit}
                    >
                        {({ values, handleChange, handleBlur, touched, handleSubmit, isSubmitting, errors }) => {
                            const { name, color } = values;
                            return (
                                <>
                                    <FormInput
                                        label={'Name'}
                                        placeHolder={'Ener Name'}
                                        value={name}
                                        onChangeFunction={handleChange('name')}
                                        error={touched.name && errors.name}
                                        onBlur={handleBlur('name')}
                                    />
                                    <FormInput
                                        label={'Color'}
                                        placeHolder={'Ener Color Value'}
                                        value={color}
                                        onChangeFunction={handleChange('color')}
                                        error={touched.color && errors.color}
                                        onBlur={handleBlur('color')}
                                    />
                                    <FormSubmitButton
                                        title={'Save'}
                                        onPressFunction={handleSubmit}
                                        submitting={isSubmitting}
                                    />
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </View>
        </Modal>

    )
}

export default LabelCreaionModal