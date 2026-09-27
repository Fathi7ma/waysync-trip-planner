import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import LocationCard from '../components/LocationCard';
import PrimaryButton from '../components/PrimaryButton';
import { SUGGESTED_LOCATIONS } from '../data/mockData';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * SetLocationsScreen
 * 
 * Screen 2 of the assignment:
 * - Select starting location (pickup) and destination (drop-off)
 * - "Use current location" button fills current location
 * - "Pick on map" option
 * - Interactive swap button to reverse pickup & drop-off
 * - Suggested / recent locations list matching Figma
 * - "Next" button enabled only when both points are selected
 * 
 * STUDY NOTES FOR INTERVIEW:
 * - `pickup` and `dropoff` states store the selected location strings.
 * - `activeField` tracks whether the user is choosing the pickup or destination.
 * - When both fields are filled, `isTripComplete` becomes true, enabling the orange Next button.
 */
export default function SetLocationsScreen({ navigation }) {
  // Location selection states
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [activeField, setActiveField] = useState('pickup'); // 'pickup' or 'dropoff'

  // Enabled when both locations have values
  const isTripComplete = pickup.trim().length > 0 && dropoff.trim().length > 0;

  /**
   * Quick action: Use Current Location for pickup
   */
  const handleUseCurrentLocation = () => {
    setPickup('Current Location (West Bay, Doha)');
    // If dropoff is still empty, automatically switch focus to dropoff
    if (!dropoff) {
      setActiveField('dropoff');
    }
  };

  /**
   * Quick action: Pick on map
   */
  const handlePickOnMap = () => {
    Alert.alert(
      'Pick on Map',
      'Pin selected: Al Bidda Park, Corniche Rd',
      [
        {
          text: 'Select as ' + (activeField === 'pickup' ? 'Pickup' : 'Drop-off'),
          onPress: () => {
            if (activeField === 'pickup') {
              setPickup('Al Bidda Park, Corniche Rd');
              if (!dropoff) setActiveField('dropoff');
            } else {
              setDropoff('Al Bidda Park, Corniche Rd');
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  /**
   * Swap pickup and drop-off locations
   */
  const handleSwap = () => {
    const temp = pickup;
    setPickup(dropoff);
    setDropoff(temp);
  };

  /**
   * Selecting a location from the suggested list
   */
  const handleSelectLocation = (location) => {
    const fullAddress = `${location.title} - ${location.subtitle}`;

    if (activeField === 'pickup') {
      setPickup(fullAddress);
      // Automatically prompt for dropoff if empty
      if (!dropoff) {
        setActiveField('dropoff');
      }
    } else {
      setDropoff(fullAddress);
    }
  };

  /**
   * Proceed to Trip Ready screen
   */
  const handleNext = () => {
    if (isTripComplete) {
      navigation.navigate('TripReady', {
        pickup,
        dropoff,
      });
    }
  };

  /**
   * Render suggested location row item
   */
  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.locationItem}
      activeOpacity={0.7}
      onPress={() => handleSelectLocation(item)}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={item.icon} size={18} color={Colors.textDark} />
      </View>
      <View style={styles.locationInfo}>
        <Text style={styles.locationTitle}>{item.title}</Text>
        <Text style={styles.locationSubtitle} numberOfLines={1}>
          {item.subtitle}
        </Text>
      </View>
      <Ionicons name="arrow-forward" size={14} color={Colors.border} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <Header
        title="Where are you going?"
        subtitle="Step 1 of 3 · Set pickup and drop-off"
        onBack={() => navigation.goBack()}
      />

      {/* Interactive Location Card */}
      <LocationCard
        pickup={pickup}
        dropoff={dropoff}
        onChangePickup={setPickup}
        onChangeDropoff={setDropoff}
        onClearPickup={() => setPickup('')}
        onClearDropoff={() => setDropoff('')}
        onSwap={handleSwap}
        onUseCurrentLocation={handleUseCurrentLocation}
        onPickOnMap={handlePickOnMap}
        activeField={activeField}
        onFocusField={setActiveField}
      />

      {/* Suggested Locations Header & List */}
      <View style={styles.listSection}>
        <Text style={styles.sectionHeader}>
          {activeField === 'pickup' ? 'Set as pickup' : 'Set as drop-off'}
        </Text>

        <FlatList
          data={SUGGESTED_LOCATIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderLocationItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Next"
          onPress={handleNext}
          disabled={!isTripComplete}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listSection: {
    flex: 1,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  listContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  locationInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  locationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textDark,
  },
  locationSubtitle: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: 58,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
