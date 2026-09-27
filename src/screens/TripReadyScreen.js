import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { DEFAULT_TRIP_DETAILS } from '../data/mockData';
import { Colors, Radius, Spacing } from '../theme/colors';

/**
 * TripReadyScreen — Screen 3
 * Displays selected trip info, travel mode selector, and stats.
 * Provides action to proceed to route view.
 */
export default function TripReadyScreen({ navigation, route }) {
  // Extract selected locations from navigation params (with defaults)
  const pickup = route.params?.pickup || 'Home - Villa 12, Street 840';
  const dropoff =
    route.params?.dropoff || 'Marina Office Tower - Level 14, Al Fardan Rd';

  const [selectedMode, setSelectedMode] = useState('Drive');

  const modes = [
    { id: 'Drive', label: 'Drive', time: '24 min', icon: 'car-outline' },
    { id: 'Ride', label: 'Ride', time: '28 min', icon: 'bicycle-outline' },
    { id: 'Walk', label: 'Walk', time: '1h 55m', icon: 'walk-outline' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Header
        title="Where are you going?"
        subtitle="Step 2 of 3 · Trip ready"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Confirmed Location Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardSectionLabel}>Selected Route</Text>

          {/* Pickup */}
          <View style={styles.pointRow}>
            <View style={styles.pickupDot} />
            <View style={styles.pointTextContainer}>
              <Text style={styles.pointLabelPickup}>Pickup</Text>
              <Text style={styles.pointValue}>{pickup}</Text>
            </View>
          </View>

          {/* Connecting line */}
          <View style={styles.connectingLine} />

          {/* Dropoff */}
          <View style={styles.pointRow}>
            <View style={styles.dropoffSquare} />
            <View style={styles.pointTextContainer}>
              <Text style={styles.pointLabelDropoff}>Drop-off</Text>
              <Text style={styles.pointValue}>{dropoff}</Text>
            </View>
          </View>
        </View>

        {/* Mode Selector */}
        <View style={styles.modeSection}>
          <Text style={styles.sectionTitle}>Travel Mode</Text>
          <View style={styles.modesRow}>
            {modes.map((mode) => {
              const isActive = selectedMode === mode.id;
              return (
                <TouchableOpacity
                  key={mode.id}
                  style={[styles.modeCard, isActive && styles.modeCardActive]}
                  onPress={() => setSelectedMode(mode.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={mode.icon}
                    size={22}
                    color={isActive ? Colors.primary : Colors.textMuted}
                  />
                  <Text
                    style={[styles.modeLabel, isActive && styles.modeLabelActive]}
                  >
                    {mode.label}
                  </Text>
                  <Text
                    style={[styles.modeTime, isActive && styles.modeTimeActive]}
                  >
                    {mode.time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{DEFAULT_TRIP_DETAILS.distance}</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Est. Time</Text>
            <Text style={styles.statValue}>
              {selectedMode === 'Drive'
                ? '24 min'
                : selectedMode === 'Ride'
                ? '28 min'
                : '1h 55m'}
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Traffic</Text>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>Moderate</Text>
          </View>
        </View>

        {/* Ready Info Notice */}
        <View style={styles.noticeBox}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={Colors.primary}
            style={styles.noticeIcon}
          />
          <Text style={styles.noticeText}>
            Route calculated successfully. Ready to view map and start turn-by-turn navigation.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title="Proceed to route"
          icon="navigate"
          onPress={() =>
            navigation.navigate('RouteView', {
              pickup,
              dropoff,
              selectedMode,
            })
          }
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
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
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
    marginBottom: Spacing.lg,
  },
  cardSectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.pickupDot,
    marginTop: 3,
    marginRight: Spacing.md,
  },
  dropoffSquare: {
    width: 11,
    height: 11,
    backgroundColor: Colors.dropoffDot,
    borderRadius: 2,
    marginTop: 3,
    marginRight: Spacing.md,
  },
  connectingLine: {
    width: 2,
    height: 28,
    backgroundColor: '#D1D5DB',
    marginLeft: 5,
    marginVertical: 4,
  },
  pointTextContainer: {
    flex: 1,
  },
  pointLabelPickup: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  pointLabelDropoff: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: 2,
  },
  pointValue: {
    fontSize: 14,
    color: Colors.textDark,
    fontWeight: '500',
  },
  modeSection: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: Spacing.sm,
  },
  modesRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  modeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textDark,
    marginTop: 4,
  },
  modeLabelActive: {
    color: Colors.primary,
  },
  modeTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  modeTimeActive: {
    color: Colors.primary,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: Colors.border,
    alignSelf: 'center',
  },
  noticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  noticeIcon: {
    marginRight: Spacing.sm,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    color: '#166534',
    lineHeight: 18,
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
