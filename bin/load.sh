# TODO: Create a script to load the file that people can download
# a-la NVM style

# Get script directory
SCRIPT=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT)
LOCAL_JQ="$SCRIPT_DIR/jq"

JQ_NATIVE=1

# Check if the user has the git command
echo "> Checking for JQ...."
if ! command -v jq &>/dev/null; then
  curl -L https://github.com/jqlang/jq/releases/download/jq-1.7/jq-macos-arm64 -o $LOCAL_JQ
  chmod +x $LOCAL_JQ
  JQ_NATIVE=0
fi

# Get Asset Data
echo "> Loading asset data..."
response=$(curl -s https://api.github.com/repos/tkottke90/Obsidan-Styles/releases/latest)

echo $response

echo "> Parsing Response..."
ASSET_KEY='.assets[] .id'
if [ $JQ_NATIVE -eq 1 ]; then
  ASSET_NAMES=$(jq --args $ASSET_KEY $response)
else
  ASSET_NAMES=$(/bin/bash $LOCAL_JQ --args $ASSET_KEY $response)
fi

echo "Asset Names:"
echo $ASSET_NAMES

# grep '"url":' $RESPONSE_STR

  # bash