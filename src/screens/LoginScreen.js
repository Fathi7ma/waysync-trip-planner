import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * LoginScreen
 * 
 * Screen 1 of the assignment:
 * - Matches the Figma design: logo, welcome text, email/password fields
 * - Basic form validation (checks valid email format and password length)
 * - Toggles between Login and Create Account mode
 * - Navigates to SetLocationsScreen upon successful login
 * 
 * STUDY NOTES FOR INTERVIEW:
 * - `useState` is used for managing user input (email, password) and validation error messages.
 * - `navigation.navigate('SetLocations')` passes the user to the next screen in the stack.
 */
export default function LoginScreen({ navigation }) {
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  // Error validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validate form fields before submitting
   */
  const validateForm = () => {
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  /**
   * Handle Login or Sign-up submission
   */
  const handleAuthAction = () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate quick authentication
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the next screen (Set Locations)
      navigation.navigate('SetLocations');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Brand Logo (Orange squiggly route badge) */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBadge}>
              <Ionicons name="git-commit-outline" size={28} color="#FFFFFF" />
            </View>
          </View>

          {/* Heading and Subtitle */}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>
              {isSignUp ? 'Create account' : 'Welcome back'}
            </Text>
            <Text style={styles.subtitle}>
              {isSignUp
                ? 'Sign up to start planning routes and sync trips seamlessly.'
                : 'Log in to plan routes and follow your calculation journey.'}
            </Text>

          </View>

          {/* Input Fields */}
          <View style={styles.formContainer}>
            <InputField
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) setPasswordError('');
              }}
              error={passwordError}
              isPassword
            />

            {!isSignUp && (
              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() =>
                  Alert.alert(
                    'Reset Password',
                    'Password reset link will be sent to ' + (email || 'your email')
                  )
                }
              >
                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            {/* Primary Action Button */}
            <PrimaryButton
              title={isSignUp ? 'Create account' : 'Log in'}
              onPress={handleAuthAction}
              loading={isLoading}
              style={styles.submitButton}
            />
          </View>

          {/* Bottom Switch: Login <-> Create an account */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {isSignUp ? 'Already have an account? ' : 'New to Waysync? '}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
              <Text style={styles.footerLink}>
                {isSignUp ? 'Log in' : 'Create an account'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    justifyContent: 'space-between',
  },
  logoContainer: {
    marginBottom: Spacing.lg,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  headerContainer: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: Spacing.xs + 2,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  formContainer: {
    flex: 1,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: -Spacing.xs,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
  submitButton: {
    marginTop: Spacing.sm,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  footerLink: {
    color: Colors.textDark,
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
