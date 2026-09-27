# Waysync - Trip & Route Planning App

React Native + Expo app built for the Codenzic Innovations technical assignment. The app follows the provided Figma design and implements all 4 screens with navigation, form validation, and mock route data.

## Screens

### 1. Login Screen
- Email and password input fields
- Password visibility toggle (eye icon)
- Basic validation — checks email format and password length (min 6 chars)
- Toggle between Log in and Create account

### 2. Set Locations Screen
- Pickup and drop-off input fields with connecting line indicator
- Use current location / Pick on map buttons
- Swap button to reverse locations
- List of suggested/recent locations
- Next button only enables when both fields are filled

### 3. Trip Ready Screen
- Shows selected pickup and drop-off locations
- Travel mode selector — Drive (24 min), Ride (28 min), Walk (1h 55m)
- Stats: distance, estimated time, traffic status
- Proceed to route button

### 4. Route View Screen
- Map with route line, start pin, and end pin
- Travel time and distance display
- Mode switcher pills
- Turn-by-turn directions list
- Start/stop navigation button

## Tech Stack

- React Native with Expo SDK 57
- `@react-navigation/native-stack` for screen navigation
- `@expo/vector-icons` for icons
- `react-native-safe-area-context` for safe area handling
- Mock data used where backend is not needed
- Map is simulated using React Native views (no third-party map SDK needed)

## Setup

### Prerequisites
- Node.js v18+
- Expo Go app on your phone (optional, for testing on device)

### Install and Run
```bash
git clone <repo-url>
cd waysync-trip-planner
npm install
npx expo start
```

Then press `a` for Android emulator, `i` for iOS simulator, or `w` for web browser.

## Building the APK

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

EAS gives a download link for the APK once the build finishes.

## Project Structure

```
waysync-trip-planner/
├── App.js                  # Root navigator setup
├── app.json                # Expo config
├── eas.json                # Build config for APK
├── package.json
└── src/
    ├── components/
    │   ├── Header.js       # Screen header with back button
    │   ├── InputField.js   # Text input with validation
    │   ├── LocationCard.js # Pickup/dropoff card with swap
    │   ├── MapGraphic.js   # Simulated map with route
    │   └── PrimaryButton.js # Orange action button
    ├── data/
    │   └── mockData.js     # Mock locations and trip data
    ├── screens/
    │   ├── LoginScreen.js
    │   ├── SetLocationsScreen.js
    │   ├── TripReadyScreen.js
    │   └── RouteViewScreen.js
    └── theme/
        └── colors.js       # Color tokens from Figma
```
