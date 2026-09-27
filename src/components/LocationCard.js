import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * LocationCard Component
 * 
 * Central interactive component for:
 * 1. Pickup input with orange pin
 * 2. Drop-off input with dark square pin
 * 3. Connecting route indicator line
 * 4. Swap button to reverse start and destination
 * 5. Quick actions: "Use current" location & "Pick on map"
 */
export default function LocationCard({
  pickup,
  dropoff,
  onChangePickup,
  onChangeDropoff,
  onClearPickup,
  onClearDropoff,
  onSwap,
  onUseCurrentLocation,
  onPickOnMap,
  activeField,
  onFocusField,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.inputsRow}>
        {/* Left Indicator: Orange Dot -> Line -> Black Square */}
        <View style={styles.indicatorContainer}>
          <View style={styles.pickupDot} />
          <View style={styles.dottedLine} />
          <View style={styles.dropoffSquare} />
        </View>

        {/* Middle Inputs: Pickup & Dropoff */}
        <View style={styles.fieldsContainer}>
          {/* Pickup Field */}
          <View
            style={[
              styles.fieldWrapper,
              activeField === 'pickup' && styles.fieldWrapperActive,
            ]}
          >
            <Text style={styles.fieldLabelPickup}>Pickup</Text>
            <View style={styles.inputInner}>
              <TextInput
                style={styles.textInput}
                value={pickup}
                onChangeText={onChangePickup}
                placeholder="Choose a starting point"
                placeholderTextColor={Colors.textPlaceholder}
                onFocus={() => onFocusField && onFocusField('pickup')}
              />
              {pickup ? (
                <TouchableOpacity
                  onPress={onClearPickup}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name="close-circle"
                    size={16}
                    color={Colors.textPlaceholder}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <View style={styles.divider} />

          {/* Drop-off Field */}
          <View
            style={[
              styles.fieldWrapper,
              activeField === 'dropoff' && styles.fieldWrapperActive,
            ]}
          >
            <Text style={styles.fieldLabelDropoff}>Drop-off</Text>
            <View style={styles.inputInner}>
              <TextInput
                style={styles.textInput}
                value={dropoff}
                onChangeText={onChangeDropoff}
                placeholder="Choose a destination"
                placeholderTextColor={Colors.textPlaceholder}
                onFocus={() => onFocusField && onFocusField('dropoff')}
              />
              {dropoff ? (
                <TouchableOpacity
                  onPress={onClearDropoff}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name="close-circle"
                    size={16}
                    color={Colors.textPlaceholder}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        {/* Right Action: Swap Button */}
        <TouchableOpacity
          style={styles.swapButton}
          onPress={onSwap}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="swap-vertical" size={18} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Bottom Quick-Action Buttons */}
      <View style={styles.pillsRow}>
        <TouchableOpacity
          style={styles.pillButton}
          onPress={onUseCurrentLocation}
          activeOpacity={0.7}
        >
          <Ionicons
            name="navigate-outline"
            size={14}
            color={Colors.textDark}
            style={styles.pillIcon}
          />
          <Text style={styles.pillText}>Use current</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pillButton}
          onPress={onPickOnMap}
          activeOpacity={0.7}
        >
          <Ionicons
            name="map-outline"
            size={14}
            color={Colors.textDark}
            style={styles.pillIcon}
          />
          <Text style={styles.pillText}>Pick on map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.md,
  },
  inputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    marginRight: Spacing.sm,
    paddingVertical: 10,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.pickupDot,
  },
  dottedLine: {
    width: 1.5,
    height: 38,
    backgroundColor: '#D1D5DB',
    marginVertical: 4,
  },
  dropoffSquare: {
    width: 9,
    height: 9,
    backgroundColor: Colors.dropoffDot,
    borderRadius: 2,
  },
  fieldsContainer: {
    flex: 1,
  },
  fieldWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: Radius.sm,
  },
  fieldWrapperActive: {
    backgroundColor: '#F9FAFB',
  },
  fieldLabelPickup: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  fieldLabelDropoff: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  inputInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textDark,
    paddingVertical: 0,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 6,
  },
  swapButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  pillsRow: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  pillButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingVertical: 8,
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textDark,
  },
});
