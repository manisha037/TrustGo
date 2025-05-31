import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handlePhoneNumberChange = (text) => {
    if (text.length > 10) {
      setError('Enter a valid 10-digit number');
    } else {
      setError('');
    }
    setPhoneNumber(text.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = () => {
    if (phoneNumber.length === 10) {
      navigation.navigate('VerificationCodeScreen', { phoneNumber });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../assets/Rating.png')} 
        style={styles.illustration}
      />
      
      <Text style={styles.title}>Please enter Your Mobile Number</Text>

      <View style={styles.inputContainer}>
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryContainer}>
            <Image 
              source={require('../assets/Wrap.png')} 
              style={styles.flag}
            />
            <Text style={styles.countryCode}>+91</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="9910478839"
            placeholderTextColor="#666"
            keyboardType="number-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.button, { opacity: phoneNumber.length === 10 ? 1 : 0.7 }]}
          onPress={handleSubmit}
          disabled={phoneNumber.length !== 10}
        >
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing up, you agree to our{' '}
          <Text style={styles.linkText}>Terms</Text> and how we use your data in our{' '}
          <Text style={styles.linkText}>Privacy policy</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  illustration: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginTop: 20,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#333333',
  },
  flag: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  countryCode: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    paddingVertical: 12,
    paddingLeft: 10,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  otpBox: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 30,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  termsText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#FFD700',
    textDecorationLine: 'underline',
  },
});

export default SignInScreen;
