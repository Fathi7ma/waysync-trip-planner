import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapGraphic from '../components/MapGraphic';
import PrimaryButton from '../components/PrimaryButton';
import { DEFAULT_TRIP_DETAILS } from '../data/mockData';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * RouteViewScreen
 * 
 * Screen 4 of the assignment:
 * - Route visual on map with pins and polyline
 * - Estimated travel time (24 min) and arrival details
 * - Mode selector pills (Drive, Ride, Walk)
 * - Origin / Destination points box
 * - Turn-by-turn directions list with distance markers
 * - Primary "Start navigation" action button
 * 
 * STUDY NOTES FOR INTERVIEW:
 * - `navigation.goBack()` allows the user to return to previous steps.
 * - `isNavigating` state simulates real-time GPS navigation when user starts navigation.
 */
export default function RouteViewScreen({ navigation, route }) {
  const pickup = route.params?.pickup || 'Home - Villa 12, Street 840';
  const dropoff =
    route.params?.dropoff || 'Marina Office Tower - Level 14, Al Fardan Rd';

  const [activeMode, setActiveMode] = useState(
    route.params?.selectedMode || 'Drive'
  );
  const [isNavigating, setIsNavigating] = useState(false);

  // Dynamic travel times based on selected mode
  const modeData = {
    Drive: { time: '24 min', arrival: 'arrive 09:42', distance: '9.8 km' },
    Ride: { time: '28 min', arrival: 'arrive 09:46', distance: '9.8 km' },
    Walk: { time: '1h 55m', arrival: 'arrive 11:13', distance: '9.2 km' },
  };

  const currentStats = modeData[activeMode] || modeData.Drive;

  /**
   * Start GPS Turn-by-Turn Navigation
   */
  const handleStartNavigation = () => {
    setIsNavigating(true);
    Alert.alert(
      'Navigation Started 🚗',
      'Head north on Street 840. In 400m, keep right onto the service road.',
      [
        {
          text: 'End Trip',
          style: 'destructive',
          onPress: () => {
            setIsNavigating(false);
            navigation.navigate('SetLocations');
          },
        },
        {
          text: 'Continue Driving',
          style: 'default',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top Map Area with Floating Controls */}
      <View style={styles.mapWrapper}>
        <MapGraphic trafficAlert={DEFAULT_TRIP_DETAILS.trafficAlert} />

        {/* Floating Back Button (Top Left) */}
        <TouchableOpacity
          style={styles.floatingBackButton}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.textDark} />
        </TouchableOpacity>

        {/* Floating Layers Button (Top Right) */}
        <TouchableOpacity
          style={styles.floatingLayersButton}
          onPress={() =>
            Alert.alert('Map Layers', 'Satellite and Terrain views available.')
          }
        >
          <Ionicons name="layers-outline" size={20} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Bottom Route Details Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sheetScroll}
        >
          {/* Top Pill Handle */}
          <View style={styles.dragHandle} />

          {/* Time & Distance Header */}
          <View style={styles.timeRow}>
            <View>
              <Text style={styles.timeText}>{currentStats.time}</Text>
              <Text style={styles.distanceText}>
                {currentStats.distance} · {currentStats.arrival}
              </Text>
            </View>

            {isNavigating && (
              <View style={styles.liveNavBadge}>
                <View style={styles.livePulse} />
                <Text style={styles.liveNavText}>NAVIGATING</Text>
              </View>
            )}
          </View>

          {/* Mode Switcher Pills */}
          <View style={styles.modePillsRow}>
            {DEFAULT_TRIP_DETAILS.modes.map((mode) => {
              const isActive = activeMode === mode;
              return (
                <TouchableOpacity
                  key={mode}
                  style={[
                    styles.modePill,
                    isActive && styles.modePillActive,
                  ]}
                  onPress={() => setActiveMode(mode)}
                >
                  <Text
                    style={[
                      styles.modePillText,
                      isActive && styles.modePillTextActive,
                    ]}
                  >
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Trip Points Summary Box */}
          <View style={styles.routeSummaryBox}>
            <View style={styles.pointsIndicator}>
              <View style={styles.pickupDot} />
              <View style={styles.verticalLine} />
              <View style={styles.dropoffSquare} />
            </View>

            <View style={styles.pointsLabels}>
              <Text style={styles.pointText} numberOfLines={1}>
                {pickup}
              </Text>
              <View style={styles.pointSpacer} />
              <Text style={styles.pointText} numberOfLines={1}>
                {dropoff}
              </Text>
            </View>
          </View>

          {/* Turn by Turn Directions Section */}
          <Text style={styles.turnByTurnHeader}>Turn by turn</Text>

          <View style={styles.turnsList}>
            {DEFAULT_TRIP_DETAILS.turns.map((turn, index) => (
              <View key={turn.id} style={styles.turnRow}>
                <View style={styles.turnIconWrapper}>
                  <Ionicons
                    name={turn.icon}
                    size={18}
                    color={index === 0 ? Colors.primary : Colors.textDark}
                  />
                </View>
                <View style={styles.turnContent}>
                  <Text style={styles.turnInstruction}>
                    {turn.instruction}
                  </Text>
                  <Text style={styles.turnDetail}>{turn.detail}</Text>
                </View>
                <Text style={styles.turnDistance}>{turn.distance}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Primary Bottom Action Button */}
        <View style={styles.buttonFooter}>
          <PrimaryButton
            title={isNavigating ? 'Stop navigation' : 'Start navigation'}
            icon="navigate"
            onPress={handleStartNavigation}
            style={isNavigating ? { backgroundColor: '#DC2626' } : null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EBE7DE',
  },
  mapWrapper: {
    height: 270,
    width: '100%',
    position: 'relative',
  },
  floatingBackButton: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  floatingLayersButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  bottomSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    marginTop: -16,
  },
  sheetScroll: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  dragHandle: {
    width: 36,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.sm,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  timeText: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textDark,
    letterSpacing: -0.5,
  },
  distanceText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  liveNavBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
    marginRight: 6,
  },
  liveNavText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#15803D',
  },
  modePillsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  modePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  modePillActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  modePillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  modePillTextActive: {
    color: Colors.primary,
  },
  routeSummaryBox: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: Spacing.lg,
  },
  pointsIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    marginRight: Spacing.sm,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.pickupDot,
  },
  verticalLine: {
    width: 1.5,
    height: 20,
    backgroundColor: '#D1D5DB',
    marginVertical: 2,
  },
  dropoffSquare: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: Colors.dropoffDot,
  },
  pointsLabels: {
    flex: 1,
    justifyContent: 'space-between',
  },
  pointSpacer: {
    height: 8,
  },
  pointText: {
    fontSize: 13,
    color: Colors.textDark,
    fontWeight: '500',
  },
  turnByTurnHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.sm,
  },
  turnsList: {
    backgroundColor: '#FFFFFF',
  },
  turnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  turnIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  turnContent: {
    flex: 1,
    paddingRight: Spacing.sm,
  },
  turnInstruction: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
  },
  turnDetail: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  turnDistance: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  buttonFooter: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
