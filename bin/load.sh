# TODO: Create a script to load the file that people can download
# a-la NVM style

# Get script directory
SCRIPT=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT)

# Check if the user has the git command
echo "> Checking for JQ...."
if ! command -v node &>/dev/null; then
  echo "ERROR: NodeJS required"
  exit(1)
fi

# Get Asset Data
echo "> Loading asset data..."
response=$(curl -s https://api.github.com/repos/tkottke90/Obsidan-Styles/releases/latest)

echo $response > temp.json

echo "> Parsing Response"
ASSET_KEY='.assets[] .id'
if [ $JQ_NATIVE -eq 1 ]; then
  echo "  Using native JQ..."
  which jq
  ASSET_NAMES=$(jq --args '.assets[] .id' $response)
else
  echo "  Using local JQ..."
  ASSET_NAMES=$(/bin/bash $LOCAL_JQ --args $ASSET_KEY $response)
fi

echo "Asset Names:"
echo $ASSET_NAMES

# grep '"url":' $RESPONSE_STR

  # bash