#! /bin/bash

RED='\e[0;31m'

echo "> Setting up script"

# Updating npm for this command
npm config set git-tag-version true

echo
# Ask the user what type of release you are doing
read -p "What type of release are we doing? [major, minor, patch] " TYPE

# Validate the user input
if [[ ! $TYPE == major || ! $TYPE == minor || ! $TYPE == patch ]]; then
  # Throw error with red text
  echo "${RED}ERROR: Invalid selection: $TYPE."
  tput sgr0
  exit 1
fi
echo

# Build
echo "> Building..."
npm run build
git add -A
git commit -m 'chore: Building for release'

# Bump version
echo "> Bumping version..."
npm version $TYPE -m "Upgrade to %s"

# Get Version from package.json
VERSION=$(cat package.json | grep version | head -n 1 | cut -d '"' -f 4)

echo "> New Version: $VERSION"

echo "> Cleanup..."
# Undo config changes
npm config set git-tag-version true

echo "> Release Complete"