import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, TextInput, ScrollView, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuizApp = () => {
    // State variables for the username and answers
    const [username, setUsername] = useState('');
    const [answers, setAnswers] = useState(['', '', '']);

    // Correct answers for the quiz
    const correctAnswers = ['Rhino', 'Leopard', 'Stork'];

    // Update answers based on user selection
    const handleAnswerChange = (value, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    // Calculate score and show result
    const handleSubmit = () => {
        let score = 0;
        // Check each answer against the correct answers
        for (let i = 0; i < answers.length; i++) {
            if (answers[i] === correctAnswers[i]) score++;
        }

        // Create a message based on the score
        const message = score === 3
            ? "Well done! You have all answers correct!"
            : `You have ${score} correct answer${score !== 1 ? 's' : ''}!`;

        Alert.alert(message);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitle}>
                    <Icon name="paw" size={24} color="#ffffff" style={styles.icon} />
                    <Text style={styles.headerText}>Animal Quiz</Text>
                </View>
                <Image
                    source={{ uri: 'https://www.example.com/path-to-paw-logo.png' }}
                    style={styles.logo}
                />
            </View>

            {/* Username Input */}
            <View style={styles.usernameContainer}>
                <TextInput
                    style={styles.usernameInput}
                    placeholder="Enter your name"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Quiz Questions */}
            <ScrollView style={styles.scrollContainer}>
                {['Rhino', 'Leopard', 'Stork'].map((animal, index) => (
                    <View key={index} style={styles.questionContainer}>
                        {/* Display the image for the question */}
                        <Image
                            source={{ uri: getImageUri(animal) }}
                            style={styles.image}
                        />
                        <Text style={styles.questionText}>What animal is this?</Text>
                        {/* Dropdown for selecting answer */}
                        <RNPickerSelect
                            onValueChange={(value) => handleAnswerChange(value, index)}
                            items={getAnimalOptions(animal)}
                            style={pickerSelectStyles}
                        />
                    </View>
                ))}

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <Button title="Submit Answers" onPress={handleSubmit} color="#0066cc" />
                </View>
            </ScrollView>
        </View>
    );
};

const getImageUri = (animal) => {
    switch (animal) {
        case 'Rhino':
            return 'https://cdn.britannica.com/52/181052-050-F750FB03/rhinoceros-Kenya-Ol-Pejeta-Conservancy-Laikipia-rhinoceroses-December-2014.jpg';
        case 'Leopard':
            return 'http://felids.files.wordpress.com/2011/12/amur-leopard-5.jpg';
        case 'Stork':
            return 'https://tse2.mm.bing.net/th?id=OIP.eJ4FQUmn_ihKw0h-CXn4fgHaE8&pid=Api&P=0&h=180';
        default:
            return '';
    }
};

// Function to get options for each animal's question
const getAnimalOptions = (animal) => {
    switch (animal) {
        case 'Rhino':
            return [
                { label: 'Rhino', value: 'Rhino' },
                { label: 'Elephant', value: 'Elephant' },
                { label: 'Lion', value: 'Lion' },
            ];
        case 'Leopard':
            return [
                { label: 'Leopard', value: 'Leopard' },
                { label: 'Tiger', value: 'Tiger' },
                { label: 'Jaguar', value: 'Jaguar' },
            ];
        case 'Stork':
            return [
                { label: 'Stork', value: 'Stork' },
                { label: 'Eagle', value: 'Eagle' },
                { label: 'Parrot', value: 'Parrot' },
            ];
        default:
            return [];
    }
};

export default QuizApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E9',
        paddingTop: 40,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        backgroundColor: '#388E3C',
        borderBottomWidth: 4,
        borderBottomColor: '#2C6B2F',
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 12,
    },
    usernameContainer: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        marginTop: 24,
        marginHorizontal: 20,
        borderRadius: 15
    },
    usernameInput: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#B0BEC5',
        borderRadius: 12,
        backgroundColor: '#F1F8E9',
        marginBottom: 18,
        color: '#263238',
    },
    scrollContainer: {
        paddingHorizontal: 18,
        marginBottom: 30,
    },
    questionContainer: {
        marginBottom: 20,
        padding: 22,
        backgroundColor: '#81C784',
        borderRadius: 20,
    },
    image: {
        height: 240,
        width: '100%',
        borderRadius: 20,
        marginBottom: 18,
        borderColor: '#B0BEC5',
        borderWidth: 1,
    },
    questionText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 22,
        marginBottom: 40,
        paddingHorizontal: 60,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: '#66BB6A',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    buttonPress: {
        backgroundColor: '#43A047',
    },
});

const pickerSelectStyles = {
    inputIOS: {
        fontSize: 16,
        color: '#388E3C',
        backgroundColor: '#fff',
    },
    inputAndroid: {
        fontSize: 16,
        color: '#388E3C',
        backgroundColor: '#fff',
    },
};
