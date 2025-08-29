# Install dependencies
npm install

# Install dev dependencies
npm install --save-dev @types/react @types/react-native typescript @babel/core

# Install Expo dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

# Install UI dependencies
npm install react-native-paper react-native-vector-icons

# Install database and storage dependencies
npx expo install expo-sqlite @react-native-async-storage/async-storage

# Install authentication dependencies
npx expo install expo-auth-session expo-web-browser

# Install file handling dependencies
npx expo install expo-document-picker expo-image-picker expo-file-system

# Create necessary directories
mkdir -p app/components
mkdir -p app/screens
mkdir -p app/services
mkdir -p app/utils
mkdir -p app/store
mkdir -p app/hooks
mkdir -p assets 