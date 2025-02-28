import React, { useState } from "react";
import { View, Text, TextInput, Modal, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";

const { width } = Dimensions.get("window");

function MainScreen() {
    const [name, setName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [budget, setBudget] = useState("");
    const [serviceType, setServiceType] = useState("homeService");
    const [summary, setSummary] = useState(null);

    const services = [
        { label: "Electrical", value: "Electrical" },
        { label: "Cellphone Repair", value: "Cellphone Repair" },
        { label: "Editing", value: "Editing" },
        { label: "Make Up", value: "Make Up" },
        { label: "Layout", value: "Layout" },
        { label: "Welding", value: "Welding" },
        { label: "Massage", value: "Massage" }
    ];

    const handleSubmit = () => {
        if (name.trim() !== "") {
            setModalVisible(true);
        }
    };

    const handleModalSubmit = () => {
        setSummary({ name, selectedService, budget, serviceType });
        setModalVisible(false);
        setName("");
        setSelectedService(null);
        setBudget("");
        setServiceType("homeService");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.logo}>KARL&M Services</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                Submit
            </Button>
            
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.welcomeText}>Welcome, {name}!</Text>
                        <Dropdown
                            style={styles.dropdown}
                            data={services}
                            labelField="label"
                            valueField="value"
                            placeholder="Select a service"
                            value={selectedService}
                            onChange={(item) => setSelectedService(item.value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your budget"
                            value={budget}
                            onChangeText={setBudget}
                            keyboardType="numeric"
                        />
                        <RadioButton.Group onValueChange={setServiceType} value={serviceType}>
                            <View style={styles.radioContainer}>
                                <RadioButton.Item label="Home Service" value="homeService" />
                                <RadioButton.Item label="Walk In" value="walkIn" />
                            </View>
                        </RadioButton.Group>
                        <Button mode="contained" onPress={handleModalSubmit} style={styles.button}>
                            Confirm
                        </Button>
                    </View>
                </View>
            </Modal>

            {summary && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.summaryText}>Summary</Text>
                    <Text>Name: {summary.name}</Text>
                    <Text>Service: {summary.selectedService}</Text>
                    <Text>Budget: {summary.budget}</Text>
                    <Text>Service Type: {summary.serviceType === "homeService" ? "Home Service" : "Walk In"}</Text>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 70,
        backgroundColor: "#f4f4f4",
    },
    logo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
    button: {
        width: "90%",
        borderRadius: 10,
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 25,
        borderRadius: 15,
        width: width * 0.9,
        alignItems: "center",
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
    },
    radioContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    summaryContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#fff",
        width: "90%",
        elevation: 5,
    },
    summaryText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dropdown: {
        width: "90%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 20,
        backgroundColor: "#fff",
    },
});

export default MainScreen;
