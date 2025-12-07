Astro-API

#!/bin/bash

echo ""
echo "==========================================="
echo "  AstroGuide Project Setup Script"
echo "==========================================="
echo ""

# Step 1: Install Node dependencies
echo "➡ Installing npm packages..."

npm install

echo ""
echo "➡ Installing Expo required native packages..."

npx expo install react-native-safe-area-context react-native-screens
npx expo install react-native-reanimated

echo ""
echo "➡ Checking babel.config.js for Reanimated plugin..."

if grep -q "react-native-reanimated/plugin" babel.config.js; then
  echo "✔ Reanimated plugin already exists."
else
  echo "⚠ Reanimated plugin not found. Adding it now..."

cat <<EOT >> babel.config.js

// Added automatically by setup.sh
plugins: ['react-native-reanimated/plugin'],
EOT

  echo "✔ Plugin added."
fi

echo ""
echo "➡ Creating .env.example file..."
cat <<EOT > .env.example
# Copy this file to .env and enter your Supabase credentials



EXPO_PUBLIC_SUPABASE_URL=https://nsrisuhxacpwfnvkiogs.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmlzdWh4YWNwd2Zudmtpb2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTgzODIsImV4cCI6MjA3ODE5NDM4Mn0.mOr56ZDE7klnYhwFZnCtXBL-Y5nX9KhLX02ngJFpijo




EOT

echo "✔ .env.example created."

echo ""
echo "==========================================="
echo " Setup Complete! 🎉"
echo "-------------------------------------------"
echo "Next steps:"
echo "1. Create a .env file:"
echo "   cp .env.example .env"
echo "2. Add your Supabase credentials."
echo "3. Start the app: npx expo start"
echo "==========================================="
echo ""
