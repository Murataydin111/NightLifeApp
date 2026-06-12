# NightLifeApp (Festival / Party / Concert Organizer)

A React Native (Expo) mobile application that helps users discover nightlife events such as concerts, festivals, and parties.

Users can browse events, search for specific events, view detailed information, save favorite events, check weather conditions, rate events, and share events with others.

---

## Features

* Browse nightlife events
* Event detail screen with full event information
* Search events by name
* Add events to favorites
* Remove events from favorites
* Favorites stored locally on the device
* Haptic feedback when managing favorites
* Offline access to cached events
* Offline access to saved favorites
* Event rating system
* Event sharing
* Real-time weather information
* User location detection
* Distance calculation to events
* Event recommendation score
* Interactive event maps

---

## Screens

### Home

Displays all available events using FlatList.

### Explore

Allows users to search events.

### Event Detail

Displays detailed event information including:

* Map location
* Weather information
* User distance
* Recommendation score
* Rating system
* Event sharing

### Favorites

Shows all saved favorite events.

---

## Screenshots

<p align="center">
  <img src="screenshots/home.png" width="250">
  <img src="screenshots/detail.png" width="250">
  <img src="screenshots/favorites.png" width="250">
</p>

---

## Application Architecture

The application uses **Context API** for global state management.

### Global State

* Favorites list
* Favorite management actions
* Loading state
* Error state

### Main Components

* FavoritesProvider
* EventCard
* EventDetail
* Favorites Screen

This architecture keeps business logic separated from UI components and improves maintainability.

---

## Native Device Features

The application uses the following native device capabilities:

### AsyncStorage

Used for:

* Persistent local storage
* Saving favorite events
* Offline access to favorites
* Offline event caching

### Expo Haptics

Used for:

* Haptic feedback when adding favorites
* Haptic feedback when removing favorites

### Expo Location

Used for:

* User location detection
* Distance calculation between user and event

### React Native Maps

Used for:

* Event location display
* Interactive maps

### Native Share API

Used for:

* Sharing event information with other applications

---

## State Management

Global state is managed using React Context API.

The FavoritesContext provides:

* favorites
* toggleFavorite()
* isFavorite()
* loading
* error

This avoids prop drilling and allows all screens to access favorite events.

---

## Navigation

Navigation is implemented using Expo Router.

Navigation types used:

### Tabs Navigation

* Home
* Explore
* Favorites
* About

### Stack Navigation

* Event Detail Screen
* Modal Screen

Route parameters are passed using Expo Router's:

```typescript
useLocalSearchParams()
```

---

## External API Integration

The application integrates with the OpenWeather API.

Features:

* Real-time temperature
* Current weather conditions
* Event weather preview

Weather information is displayed on the Event Detail screen.

---

## Offline Functionality

The application supports basic offline usage.

Features:

* Cached events remain available offline
* Favorite events remain available offline
* AsyncStorage is used for local caching
* Previously loaded data can be accessed without internet connection

---

## Error Handling

The application handles common runtime errors using:

* try/catch blocks
* loading states
* error states
* Error Boundary component

Examples:

* Weather API failures
* AsyncStorage read failures
* AsyncStorage write failures
* Location permission failures
* Unexpected rendering errors

---

## Performance Optimizations

The application includes:

* FlatList for efficient rendering
* React.memo for EventCard optimization
* Context value memoization using useMemo
* Async data caching using AsyncStorage

---

## Technology Stack

* React Native
* Expo
* Expo Router
* TypeScript
* Context API
* AsyncStorage
* Expo Haptics
* Expo Location
* React Native Maps
* OpenWeather API
* Native Share API
* Jest

---

## Project Structure

```text
app/
│
├── (tabs)/
│   ├── index.tsx
│   ├── explore.tsx
│   ├── favorites.tsx
│   └── about.tsx
│
├── EventDetail.tsx
├── _layout.tsx
└── modal.tsx

components/
├── EventCard.tsx
└── ErrorBoundary.tsx

src/
├── context/
│   └── FavoritesContext.tsx
│
├── data/
│   └── events.js
│
├── eventsService.ts
└── weatherService.ts

constants/
hooks/
assets/
```

---

## Installation

Install dependencies:

```bash
npm install
```

Start Expo:

```bash
npx expo start
```

Run on device:

* Press `i` for iOS Simulator
* Press `a` for Android Emulator
* Or scan the QR code using Expo Go

---

## Testing

Run tests:

```bash
npm test
```

The project contains Jest tests covering:

* Favorites functionality
* Search functionality
* Event data validation
* Event recommendation logic
* Weather service
* Event sharing functionality
* Offline cache logic

---

## Building with EAS

Preview build:

```bash
eas build --platform android --profile preview
```

Production build:

```bash
eas build --platform android --profile production
```

---

## Future Improvements

* User authentication
* Firebase / Supabase backend
* Push notifications
* Personalized recommendations using AI
* Cloud synchronization

---

## Author

Murat Aydın

Mobile Programming Languages Laboratory Project
