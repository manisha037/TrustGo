
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid @gmail.com address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSend = () => {
    if (validateEmail(email)) {
      navigation.navigate('VerificationCodeScreen', { email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        
      </View>
      
      
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/Forgot.png')}
            style={styles.shieldIcon}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Please enter the email address to continue & verify your account
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) validateEmail(text);
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tryAnotherWay}>
          <Text style={styles.tryAnotherWayText}>Try Another Way</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom : 80,
  },
  logo: {
    width: 120,
    height: 120,
    marginLeft : 20,
    
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginLeft : 20,
    marginTop : 20,

  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#e6f7f4',
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  shieldIcon: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: 'hsla(166, 41%, 40%, 1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  tryAnotherWay: {
    marginTop: 16,
  },
  tryAnotherWayText: {
    color: 'hsla(166, 41%, 40%, 1)',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;