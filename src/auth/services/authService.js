// src/services/authService.js
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../config/firebase'; // Make sure this path is correct

export const loginUser = async (email, password) => {
    try {
        console.log('AuthService: Attempting login with email:', email);
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('AuthService: Login successful for:', userCredential.user.email);
        
        return {
            success: true,
            user: userCredential.user
        };
    } catch (error) {
        console.error('AuthService: Login error:', error.code, error.message);
        
        switch (error.code) {
            case 'auth/invalid-credential':
                return {
                    success: false,
                    error: 'Invalid email or password. Please try again.'
                };
            case 'auth/user-not-found':
                return {
                    success: false,
                    error: 'No account found with this email'
                };
            case 'auth/wrong-password':
                return {
                    success: false,
                    error: 'Incorrect password'
                };
            default:
                return {
                    success: false,
                    error: `Login failed: ${error.message}`
                };
        }
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};