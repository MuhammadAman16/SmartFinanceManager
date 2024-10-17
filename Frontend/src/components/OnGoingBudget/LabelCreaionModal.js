import { View, Text, Modal, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import styles from '../Styling/Stlyes';
import { Formik } from 'formik';
import FormInput from '../Login&Signup/FormInput';
import FormSubmitButton from '../Login&Signup/FormSubmitButton';
import * as Yup from 'yup';
import user_api from '@/app/api/user_api';
import ColorSelectionModal from './ColorSelectionModal';
import { ColorContext } from '@/app/context/ColorContext';

const validationSchema = Yup.object({
    name: Yup.string().trim().min(3, 'Label Name must be 3 or more').required('Name field is required')
});

const LabelCreationModal = ({ setModalOpen, addNewLabel }) => {
    const { selectedColor, setSelectedColor } = useContext(ColorContext)
    const [isModalVisible, setModalVisible] = useState(false);
    const Label = {
        name: '',
        color: selectedColor
    };

    const labelsubmit = async (values, formikActions) => {
        try {
            const res = await user_api.post('/api/label', {
                ...values
            });
            formikActions.resetForm();
            Alert.alert(res.data.message);
            addNewLabel(values);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log(`No response from server`);
            } else {
                console.log("Error: ", error.error);
            }
        } finally {
            formikActions.setSubmitting(false);
            setModalOpen(false);
        }
    };

    return (
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textModal}>Add New Label</Text>
                    <Formik
                        initialValues={{
                            ...Label,
                            color: selectedColor
                        }}
                        validationSchema={validationSchema}
                        onSubmit={labelsubmit}
                    >
                        {({ values, handleChange, handleBlur, touched, handleSubmit, isSubmitting, errors, setFieldValue }) => {
                            const { name, color } = values;
                            return (
                                <>
                                    <FormInput
                                        label={'Name'}
                                        placeHolder={'Enter Name'}
                                        value={name}
                                        onChangeFunction={handleChange('name')}
                                        error={touched.name && errors.name}
                                        onBlur={handleBlur('name')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <FormInput
                                            label={'Color'}
                                            placeHolder={'Enter Color'}
                                            value={color}
                                            editable={false}
                                            color={'black'}
                                        />
                                    </TouchableOpacity>

                                    <FormSubmitButton
                                        title={'Save'}
                                        onPressFunction={handleSubmit}
                                        submitting={isSubmitting}
                                    />
                                    <TouchableOpacity
                                        style={styles.LabelScreenCancelButton}
                                        onPress={() => setModalOpen(false)}
                                    >
                                        <Text style={styles.LabelScreenCancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    {isModalVisible &&
                                        <ColorSelectionModal
                                            setModalVisible={setModalVisible}
                                            setFieldValue={setFieldValue}
                                        />
                                    }
                                </>
                            );
                        }}
                    </Formik>
                </View>
            </View>
        </Modal>
    );
};

export default LabelCreationModal;
