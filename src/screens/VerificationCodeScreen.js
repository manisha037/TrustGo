// PhoneNumberScreen.js

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';

const VerificationCodeScreen = ({route, navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const {phoneNumber} = route.params;
  const inputRef = useRef(null);

  useEffect(() => {
    if (otp.join('') === '1234') {
      Keyboard.dismiss();
      navigation.navigate('MainDrawer');
    }
  }, [otp]);

  useEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 500);
    }
  }, []);

  const handleOtpChange = text => {
    let digits = text.replace(/[^0-9]/g, '').split('');
    if (digits.length < otp.length) {
      digits = [...digits, '', '', '', ''].slice(0, 4);
    }
    setOtp(digits);
  };

  const handleBackspace = ({nativeEvent}) => {
    if (nativeEvent.key === 'Backspace') {
      const newOtp = [...otp];
      const lastFilledIndex = newOtp.lastIndexOf('');
      const eraseIndex =
        lastFilledIndex > 0 ? lastFilledIndex - 1 : otp.length - 1;
      newOtp[eraseIndex] = '';
      setOtp(newOtp);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/Rating.png')}
        style={styles.illustration}
      />

      <Text style={styles.title}>Enter OTP</Text>

      <Text style={styles.subtitle}>
        We Have send you a one time password on this {phoneNumber}
      </Text>

      <TextInput
        ref={inputRef}
        style={styles.hiddenInput}
        keyboardType="number-pad"
        maxLength={4}
        onChangeText={handleOtpChange}
        onKeyPress={handleBackspace}
        value={otp.join('')}
        autoFocus={true}
      />

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <View key={index} style={styles.otpBox}>
            <Text style={styles.otpText}>{digit}</Text>
          </View>
        ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (otp.join('') === '1234') {
            navigation.navigate('MainDrawer');
          } else {
            setError('Invalid OTP. Please try again.');
          }
        }}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By signing up, you agree to our{' '}
        <Text style={styles.linkText}>Terms</Text> and how we use your data in
        our <Text style={styles.linkText}>Privacy policy</Text>
      </Text>
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
    color: 'white',
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
    color: 'white',
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
    color: 'white',
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

export default VerificationCodeScreen;
