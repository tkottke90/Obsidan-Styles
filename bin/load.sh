# TODO: Create a script to load the file that people can download

# References for the execution
APP_DIR="$HOME/.obsidian-styles"
APP_VERSION="$APP_DIR/.version"

mkdir -p "$APP_DIR/bin/tools"
cd $APP_DIR

# Check if the user has the git command
echo "> Checking for Node...."
if ! command -v node &>/dev/null; then
  echo "ERROR: NodeJS required"
  exit 1
fi

# Get Asset Data
DEPLOY_SCRIPT="$APP_DIR/bin/deploy.sh"
curl -s -o $DEPLOY_SCRIPT https://raw.githubusercontent.com/tkottke90/Obsidan-Styles/main/bin/deploy.sh

RELEASE_HEPER_SCRIPT="$APP_DIR/bin/get-release-response.js"
curl -s -o $RELEASE_HEPER_SCRIPT https://raw.githubusercontent.com/tkottke90/Obsidan-Styles/main/bin/tools/get-release-response.js
file=$(node $RELEASE_HEPER_SCRIPT) 

mkdir -p ./dist
tar -xzf $file -C ./dist

/bin/bash ./bin/deploy.sh

rm -rf $file
rm -rf ./dist
