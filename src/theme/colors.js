/**
 * Application Theme & Design Tokens
 * Matched to the Waysync Figma specifications.
 * Kept clean and well-commented for easy study and interview explanation.
 */
export const Colors = {
  // Primary Brand Colors
  primary: '#F05A28', // Brand vibrant orange for buttons, active tabs, and pickup pin
  primaryLight: '#FFF0EA', // Soft orange tint for active pill buttons
  primaryPressed: '#D94B1B', // Darker orange when button is pressed

  // Neutral Colors
  textDark: '#111827', // Main bold text headings (e.g., "Welcome back", "24 min")
  textMuted: '#6B7280', // Subtitles and hints (e.g., "Step 1 of 3", addresses)
  textPlaceholder: '#9CA3AF', // Input placeholder text
  
  // Backgrounds & Surfaces
  background: '#F8F9FA', // Main screen light background
  card: '#FFFFFF', // White cards for inputs and list items
  border: '#E5E7EB', // Subtle borders around inputs and cards
  borderLight: '#F3F4F6', // Divider line color

  // Accents & Status Indicators
  dropoffDot: '#111827', // Black square dot for destination
  pickupDot: '#F05A28', // Orange round dot for starting point
  trafficWarningBg: '#1F2937', // Dark floating chip for "Heavy traffic near the marina"
  disabledBtn: '#E5E7EB', // Gray background for disabled Next button
  disabledText: '#9CA3AF', // Gray text for disabled Next button
  
  // Tag / Pill styles
  pillBg: '#F3F4F6', // Light gray background for unselected pills
  pillBorder: '#E5E7EB',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};
