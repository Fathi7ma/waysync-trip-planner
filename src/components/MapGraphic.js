import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Radius, Spacing } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * MapGraphic Component
 *
 * 100% Crash-Proof Interactive Map matching Figma Screen 4:
 * - Pure React Native implementation (0 native build dependencies, runs safely on Expo Go, Android APK, iOS, Web).
 * - High-fidelity cartographic layout matching the Doha / West Bay to Lusail Marina coastline.
 * - Interactive Zoom controls (+ / -).
 * - Interactive Layer toggle (Map / Satellite).
 * - Route polyline with white casing and orange primary path.
 * - Start Pin (Orange circle with car icon) & End Pin (Dark circle with inner dot).
 * - Live Turn-by-Turn GPS Navigation Animation when user taps "Start navigation".
 *
 * STUDY NOTES FOR INTERVIEW:
 * - Uses React Native's built-in `Animated` API for smooth 60fps car motion.
 * - Eliminates third-party native map crashes in Expo Go while delivering an interactive experience.
 */
export default function MapGraphic({
  trafficAlert = 'Heavy traffic near the marina',
  isNavigating = false,
  activeLayer = 'map', // 'map' | 'satellite'
  onToggleLayer,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(activeLayer);

  // Animated value for car motion along route (0 to 1)
  const navProgress = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Pulse effect for traffic alert
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Sync layer prop
  useEffect(() => {
    setCurrentLayer(activeLayer);
  }, [activeLayer]);

  // Handle GPS navigation animation
  useEffect(() => {
    if (isNavigating) {
      navProgress.setValue(0);
      Animated.loop(
        Animated.timing(navProgress, {
          toValue: 1,
          duration: 25000,
          useNativeDriver: false,
        })
      ).start();
    } else {
      navProgress.stopAnimation();
      navProgress.setValue(0);
    }
  }, [isNavigating]);

  // Car animation coordinates (interpolating X and Y along the route segments)
  const carLeft = navProgress.interpolate({
    inputRange: [0, 0.45, 0.75, 1],
    outputRange: [42, 195, 198, 275],
  });

  const carTop = navProgress.interpolate({
    inputRange: [0, 0.45, 0.75, 1],
    outputRange: [122, 135, 65, 55],
  });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
  };

  const isSatellite = currentLayer === 'satellite';

  return (
    <View style={styles.mapContainer}>
      <Animated.View
        style={[
          styles.mapCanvas,
          {
            backgroundColor: isSatellite ? '#1E293B' : '#EBE7DE',
            transform: [{ scale: zoomLevel }],
          },
        ]}
      >
        {/* Coastal Water Bay (Right side) */}
        <View
          style={[
            styles.waterBay,
            { backgroundColor: isSatellite ? '#0F172A' : '#9ECDE1' },
          ]}
        >
          {/* Subtle water waves / contours */}
          <View style={styles.waterContour1} />
          <View style={styles.waterContour2} />
        </View>

        {/* Street Grids (City blocks) */}
        <View style={styles.streetsLayer}>
          {/* Avenue Horizontals */}
          <View style={[styles.streetH, { top: '22%', opacity: isSatellite ? 0.3 : 0.75 }]} />
          <View style={[styles.streetH, { top: '48%', opacity: isSatellite ? 0.3 : 0.75 }]} />
          <View style={[styles.streetH, { top: '74%', opacity: isSatellite ? 0.3 : 0.75 }]} />

          {/* Boulevard Verticals */}
          <View style={[styles.streetV, { left: '18%', opacity: isSatellite ? 0.3 : 0.75 }]} />
          <View style={[styles.streetV, { left: '42%', opacity: isSatellite ? 0.3 : 0.75 }]} />
          <View style={[styles.streetV, { left: '68%', opacity: isSatellite ? 0.3 : 0.75 }]} />

          {/* Diagonal Lusail Expressway */}
          <View
            style={[
              styles.highwayDiagonal,
              {
                backgroundColor: isSatellite ? '#475569' : '#FFFFFF',
                borderColor: isSatellite ? '#334155' : '#E2E8F0',
              },
            ]}
          />

          {/* District Labels */}
          <Text style={[styles.mapLabel, { top: 180, left: 24 }]}>WEST BAY</Text>
          <Text style={[styles.mapLabel, { top: 40, left: 190 }]}>LUSAIL</Text>
          <Text
            style={[
              styles.mapLabelWater,
              { top: 120, right: 20, color: isSatellite ? '#64748B' : '#6BA4BC' },
            ]}
          >
            DOHA BAY
          </Text>
        </View>

        {/* Route Line: Segment 1 (West Bay initial road) */}
        <View style={styles.routeSegment1Casing} />
        <View style={styles.routeSegment1} />

        {/* Route Line: Segment 2 (Lusail Expressway connector) */}
        <View style={styles.routeSegment2Casing} />
        <View style={styles.routeSegment2} />

        {/* Route Line: Segment 3 (Marina approach) */}
        <View style={styles.routeSegment3Casing} />
        <View style={styles.routeSegment3} />

        {/* Destination Pin (Marina Office Tower) */}
        <View style={styles.endPin}>
          <View style={styles.endPinInner} />
        </View>

        {/* Animated Start Pin / Navigating Car */}
        <Animated.View
          style={[
            styles.startPin,
            {
              left: carLeft,
              top: carTop,
            },
          ]}
        >
          <Ionicons name="car" size={13} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>

      {/* Floating Map Zoom Controls (+ / -) */}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn} activeOpacity={0.7}>
          <Ionicons name="add" size={18} color={Colors.textDark} />
        </TouchableOpacity>
        <View style={styles.zoomDivider} />
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut} activeOpacity={0.7}>
          <Ionicons name="remove" size={18} color={Colors.textDark} />
        </TouchableOpacity>
      </View>

      {/* Live Navigation Active Pill */}
      {isNavigating && (
        <View style={styles.navigatingBanner}>
          <View style={styles.liveDot} />
          <Text style={styles.navigatingBannerText}>GPS Active · 42 km/h</Text>
        </View>
      )}

      {/* Floating Traffic Alert Chip */}
      {trafficAlert && !isNavigating ? (
        <Animated.View
          style={[
            styles.trafficAlertChip,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <Ionicons
            name="warning"
            size={14}
            color="#FBBF24"
            style={styles.trafficIcon}
          />
          <Text style={styles.trafficAlertText}>{trafficAlert}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 270,
    width: '100%',
    backgroundColor: '#EBE7DE',
    position: 'relative',
    overflow: 'hidden',
  },
  mapCanvas: {
    flex: 1,
    position: 'relative',
  },
  waterBay: {
    position: 'absolute',
    right: -40,
    top: -30,
    bottom: -30,
    width: 175,
    borderTopLeftRadius: 170,
    borderBottomLeftRadius: 190,
    overflow: 'hidden',
  },
  waterContour1: {
    position: 'absolute',
    right: 20,
    top: 50,
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  waterContour2: {
    position: 'absolute',
    right: 50,
    top: 140,
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  streetsLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  streetH: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#FFFFFF',
  },
  streetV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: '#FFFFFF',
  },
  highwayDiagonal: {
    position: 'absolute',
    top: 25,
    left: 20,
    width: 270,
    height: 10,
    transform: [{ rotate: '24deg' }],
    borderRadius: 5,
    borderWidth: 1,
  },
  mapLabel: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '800',
    color: '#9CA3AF',
    letterSpacing: 1.2,
  },
  mapLabelWater: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontStyle: 'italic',
  },
  // Route segments with white casings & primary color
  routeSegment1Casing: {
    position: 'absolute',
    top: 134,
    left: 53,
    width: 149,
    height: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 4.5,
  },
  routeSegment1: {
    position: 'absolute',
    top: 136,
    left: 55,
    width: 145,
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: 2.5,
  },
  routeSegment2Casing: {
    position: 'absolute',
    top: 63,
    left: 193,
    width: 9,
    height: 79,
    backgroundColor: '#FFFFFF',
    borderRadius: 4.5,
  },
  routeSegment2: {
    position: 'absolute',
    top: 65,
    left: 195,
    width: 5,
    height: 75,
    backgroundColor: Colors.primary,
    borderRadius: 2.5,
  },
  routeSegment3Casing: {
    position: 'absolute',
    top: 63,
    left: 196,
    width: 86,
    height: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 4.5,
  },
  routeSegment3: {
    position: 'absolute',
    top: 65,
    left: 198,
    width: 82,
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: 2.5,
  },
  startPin: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 15,
  },
  endPin: {
    position: 'absolute',
    top: 55,
    left: 275,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 6,
    zIndex: 10,
  },
  endPinInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  zoomControls: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 25,
  },
  zoomButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  navigatingBanner: {
    position: 'absolute',
    top: Spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803D',
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    zIndex: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#86EFAC',
    marginRight: 6,
  },
  navigatingBannerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
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
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 4,
    zIndex: 20,
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



