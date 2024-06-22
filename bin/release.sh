#! /bin/bash

function error() {
  echo "\e[0;31m ERROR: $1"
  tput sgr0
  exit 1
}

echo "> Setting up script"

# Check if the user has the git command
if ! command -v git &>/dev/null; then
  error "Git is not installed or not available in PATH."
  exit 1
fi

# Check if the user has the github cli (for releases)
if ! command -v gh &>/dev/null; then
  error "Github CLI missing.  This is needed for doing the release."
  exit 1
fi

# Check if the user has logged into github
USER_LOGGED_IN=$(gh auth status)
if grep -q "Logged in to github.com" <<< "$output"; then
  echo "> Not logged into GH CLI, logging in..."
  gh auth login
fi

# Updating npm for this command
npm config set git-tag-version true

echo # Blank line around input
# Ask the user what type of release you are doing
read -p "What type of release are we doing? [major, minor, patch] " TYPE

# Validate the user input
if [[ ! $TYPE == major && ! $TYPE == minor && ! $TYPE == patch ]]; then
  # Throw error with red text
  error "Invalid selection: $TYPE."
fi
echo # Blank line around input

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

echo "  New Version: $VERSION"

ARTIFACT_FN="obsidian-styles.$VERSION.tar.gz"
echo "> Building Release Artifact [$ARTIFACT_FN]"
(cd dist; tar -czf "../$ARTIFACT_FN" *)

echo "> Creating Release"

gh release create \
  --latest \
  --generate-notes  \
  --discussion-category "General" \
  $VERSION \
  $ARTIFACT_FN

echo "> Cleanup..."
# Undo config changes
npm config set git-tag-version true

# Delete dist file
rm -rf $ARTIFACT_FN

echo "> Release Complete"