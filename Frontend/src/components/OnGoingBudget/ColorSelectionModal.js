import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "../Styling/Stlyes";
import ColorComnponent from "./ColorComponent";
import { ColorContext } from "@/app/context/ColorContext";

const ColorSelectionModal = ({ setModalVisible, setFieldValue }) => {
    const {setSelectedColor} = useContext(ColorContext)
    return (
        <Modal
            transparent={true}
            visible={true}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textModal}>Select a Color</Text>
                    {/* Example color options */}
                    <ColorComnponent
                        backgroundColor={'rgb(0,106,78)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(0,159,107)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(0,255,127)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(208,219,97)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(116,195,101)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(0,139,139)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(0,183,235)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(155,221,255)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(106,90,205)'}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                    <ColorComnponent
                        backgroundColor={'rgb(206,200,239) '}
                        setModalVisible={setModalVisible}
                        onColorSelect={(color) => {
                            setFieldValue( 'color', color);
                            setModalVisible(false);
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ColorSelectionModal;
