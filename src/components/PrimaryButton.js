import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * PrimaryButton Component
 * 
 * Used for primary actions throughout the app:
 * - "Log in" on LoginScreen
 * - "Next" on SetLocationsScreen
 * - "Proceed to route" on TripReadyScreen
 * - "Start navigation" on RouteViewScreen
 * 
 * Handles enabled, disabled, and loading states cleanly.
 */
export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonActive,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={disabled ? Colors.disabledText : '#FFFFFF'}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, disabled && styles.textDisabled]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    width: '100%',
  },
  buttonActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: Colors.disabledBtn,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  textDisabled: {
    color: Colors.disabledText,
  },
});
