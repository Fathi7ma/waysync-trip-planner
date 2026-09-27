import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../theme/colors';

const { width } = Dimensions.get('window');

/**
 * MapGraphic Component
 * 
 * Renders the map visual matching Figma Screen 4:
 * - Coastline and land grid
 * - Orange route polyline
 * - Start pin (Orange) & Destination pin (Dark)
 * - Floating "Heavy traffic near the marina" alert badge
 */
export default function MapGraphic({ trafficAlert = 'Heavy traffic near the marina' }) {
  return (
    <View style={styles.mapContainer}>
      {/* Simulated Land & Coastline */}
      <View style={styles.landArea}>
        {/* Street Grids */}
        <View style={[styles.roadHorizontal, { top: '25%' }]} />
        <View style={[styles.roadHorizontal, { top: '50%' }]} />
        <View style={[styles.roadHorizontal, { top: '75%' }]} />
        <View style={[styles.roadVertical, { left: '20%' }]} />
        <View style={[styles.roadVertical, { left: '45%' }]} />
        <View style={[styles.roadVertical, { left: '70%' }]} />
        
        {/* Diagonal Arterial Highway */}
        <View style={styles.highwayDiagonal} />

        {/* Sea / Bay Area on the right */}
        <View style={styles.waterArea} />

        {/* Route Line connecting Start to Destination */}
        <View style={styles.routeSegment1} />
        <View style={styles.routeSegment2} />
        <View style={styles.routeSegment3} />

        {/* Pickup Pin (Orange) */}
        <View style={styles.startPin}>
          <Ionicons name="car" size={14} color="#FFFFFF" />
        </View>

        {/* Destination Pin (Dark) */}
        <View style={styles.endPin}>
          <View style={styles.endPinInner} />
        </View>
      </View>

      {/* Floating Traffic Alert Chip */}
      {trafficAlert ? (
        <View style={styles.trafficAlertChip}>
          <Ionicons name="warning" size={14} color="#FBBF24" style={styles.trafficIcon} />
          <Text style={styles.trafficAlertText}>{trafficAlert}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 270,
    width: '100%',
    backgroundColor: '#EBE7DE', // Map land tone
    position: 'relative',
    overflow: 'hidden',
  },
  landArea: {
    flex: 1,
    position: 'relative',
  },
  waterArea: {
    position: 'absolute',
    right: -40,
    top: -20,
    bottom: -20,
    width: 170,
    backgroundColor: '#9ECDE1', // Sea bay blue
    borderTopLeftRadius: 160,
    borderBottomLeftRadius: 180,
    opacity: 0.85,
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  highwayDiagonal: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 260,
    height: 9,
    backgroundColor: '#FFFFFF',
    transform: [{ rotate: '25deg' }],
    borderRadius: 4,
    opacity: 0.9,
  },
  // Route segments (coral/orange)
  routeSegment1: {
    position: 'absolute',
    top: 135,
    left: 60,
    width: 140,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  routeSegment2: {
    position: 'absolute',
    top: 65,
    left: 195,
    width: 4,
    height: 72,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  routeSegment3: {
    position: 'absolute',
    top: 65,
    left: 198,
    width: 80,
    height: 4,
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  startPin: {
    position: 'absolute',
    top: 124,
    left: 45,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  endPin: {
    position: 'absolute',
    top: 55,
    left: 270,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  endPinInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  trafficAlertChip: {
    position: 'absolute',
    bottom: Spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: Radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  trafficIcon: {
    marginRight: 6,
  },
  trafficAlertText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
});
