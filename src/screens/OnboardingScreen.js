// Onboarding.jsx
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

const {width} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const slides = [
    {
      title: 'Welcome to Trident taxi',
      subtitle: 'ride share service',
      Description: 'By comparing all the major ride options in one free app',
      image: require('../assets/ride.png'),
    },
    {
      title: 'Get rides to great ride',
      subtitle: 'without the hassle',
      
      Description: 'By comparing all the major ride options in one free app',
      image: require('../assets/ride.png'),
    },
    {
      title: 'Save time, save money',
      subtitle: 'and safe ride',
      Description: 'By comparing all the major ride options in one free app',
      image: require('../assets/Frame.png'),
    },
  ];
  const handleNext = () => {
    if (currentPage < slides.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // If we're on the last page, navigate to SignIn
      navigation.navigate('SignInScreen');
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };
  const handleStarted = () => {
    navigation.navigate
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {currentPage > 0 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          )}
          <View style={styles.logoContainer}>
          <Image
              source={require('../assets/logotrident.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentPage ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={slides[currentPage].image}
            style={styles.slideImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.title}>{slides[currentPage].title}</Text>
          <Text style={styles.subtitle}>{slides[currentPage].subtitle}</Text>
          <Text style={styles.description}>{slides[currentPage].Description}</Text>
          
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentPage === slides.length - 1 ? 'GET STARTED' : 'NEXT'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backButton: {
   marginBottom : 30,
   fontSize : 70,
   fontWeight : 600,
    borderRadius: 20,
  },
  backButtonText: {
    fontSize: 24,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 115,
    height: 87.5,
    marginLeft : 60,
    marginTop : 52,
  },
  pagination: {
    flexDirection: 'row',
    gap: 4,
    marginTop : 52,

  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#10b981',
  },
  inactiveDot: {
    width: 8,
    backgroundColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 209,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    marginTop : 20,
  },
  subtitle: {
   fontSize: 24,
    fontWeight: '400',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  description : {
color : 'white',
marginTop : 20,
fontSize : 18,
justifyContent : 'center',
textAlign : 'center',
lineHeight : 24,
  },
  buttonContainer: {
    padding: 24,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: 'hsla(51, 100%, 50%, 1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OnboardingScreen;
