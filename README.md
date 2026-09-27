# Waysync — Trip & Route Planning Mobile Application

A mobile application built using **React Native** and **Expo**, developed as part of the technical evaluation for the **React Native Developer / Intern** position at **Codenzic Innovations**.

The application translates the provided Figma design into a responsive, component-driven mobile experience with complete navigation flow, form validation, and route simulation.

---

## 📱 Application Flow & Screens

The app implements the 4 required screens closely following the Figma prototype:

1. **Login Screen (`LoginScreen.js`)**
   - Matches brand typography, orange accent palette, and rounded card styling.
   - Form fields for **Email** and **Password** with password visibility toggle.
   - Client-side validation: format check for email (`@` and `.`), length requirement for password.
   - Switchable mode between **Log in** and **Create an account**.

2. **Set Locations Screen (`SetLocationsScreen.js`)**
   - Interactive pickup and destination selectors with connecting route indicator.
   - **Use Current Location** quick action to fill user location.
   - **Pick on Map** action.
   - **Swap** button to reverse starting point and destination.
   - Suggested / recent locations list (Home, Marina Office Tower, Corniche Ferry Terminal, etc.).
   - Smart validation: "Next" button activates only after both locations are selected.

3. **Trip Ready Screen (`TripReadyScreen.js`)**
   - Summary card displaying confirmed starting point and destination.
   - Travel mode selector (**Drive - 24 min**, **Ride - 28 min**, **Walk - 1h 55m**).
   - Key stats overview: Distance (9.8 km), Estimated duration, and Traffic status.
   - Action button to proceed to the route view map.

4. **Route View Screen (`RouteViewScreen.js`)**
   - Route interface with origin and destination pins, route line, and floating traffic alert chip (*"Heavy traffic near the marina"*).
   - Primary travel time display (**24 min**), distance, and arrival time.
   - Origin and destination recap.
   - Step-by-step turn-by-turn navigation directions with distance meters.
   - **Start navigation** primary action with active navigation mode simulation.

---

## 🛠️ Technology Stack & Decisions

- **Framework**: React Native with **Expo (SDK 57)**
- **Navigation**: `@react-navigation/native` & `@react-navigation/native-stack`
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Safe Area**: `react-native-safe-area-context` for edge-to-edge support on modern iPhones and Android devices.
- **Design System**: Centralized design tokens in `src/theme/colors.js` matching the Figma colors (`#F05A28` orange primary, light card surfaces, consistent typography).

### Architecture Highlights:
- **Clean Component Separation**: Reusable components (`PrimaryButton`, `InputField`, `Header`, `LocationCard`, `MapGraphic`).
- **Zero Heavy Dependencies**: Designed to run reliably across Expo Go, Android APK, and iOS without requiring third-party mapping API keys or complex native build steps.
- **State Flow**: Straightforward props and navigation parameters (`route.params`) ensuring clarity and readability.

---

## 🚀 Quick Setup & Running Locally

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Expo Go](https://expo.dev/go) app on your Android or iOS device (optional for testing on physical device)

### 2. Installation
```bash
# Clone the repository
git clone <YOUR_GITHUB_REPO_URL>
cd waysync-trip-planner

# Install dependencies
npm install
```

### 3. Run the Development Server
```bash
npx expo start
```
- Press **`a`** to open in an Android Emulator.
- Press **`i`** to open in an iOS Simulator.
- Press **`w`** to run in a web browser.
- Scan the QR code using the **Expo Go** app on your phone.

---

## 📦 How to Build the Android APK

The project includes an `eas.json` configuration for building a standalone `.apk` using Expo Application Services (EAS):

1. Install EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account:
   ```bash
   eas login
   ```
3. Run the APK build command:
   ```bash
   eas build -p android --profile preview
   ```
4. Once completed, EAS provides a direct download link for the standalone `.apk` file ready to be installed on any Android device.

---

## 📂 Project Structure

```text
waysync-trip-planner/
├── App.js                   # Root navigator & safe area configuration
├── app.json                 # Expo configuration & app metadata
├── eas.json                 # Build profiles (standalone APK configuration)
├── package.json             # Project dependencies and scripts
└── src/
    ├── components/
    │   ├── Header.js        # Reusable screen header with back arrow
    │   ├── InputField.js    # Reusable text input with validation & eye toggle
    │   ├── LocationCard.js  # Interactive pickup/dropoff selector with swap
    │   ├── MapGraphic.js    # Simulated map interface with route & pins
    │   └── PrimaryButton.js # Brand orange CTA button with disabled states
    ├── data/
    │   └── mockData.js      # Suggested places, travel stats, turn-by-turn steps
    ├── screens/
    │   ├── LoginScreen.js         # Screen 1: Welcome & authentication
    │   ├── SetLocationsScreen.js  # Screen 2: Choose start point & destination
    │   ├── TripReadyScreen.js     # Screen 3: Route confirmation & modes
    │   └── RouteViewScreen.js     # Screen 4: Map route & turn-by-turn navigation
    └── theme/
        └── colors.js        # Figma color tokens and spacing constants
```


