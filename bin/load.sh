# TODO: Create a script to load the file that people can download
# a-la NVM style

# Get script directory
SCRIPT=$(realpath $0)
SCRIPT_DIR=$(dirname $SCRIPT)

cd $SCRIPT_DIR

# Check if the user has the git command
echo "> Checking for Node...."
if ! command -v node &>/dev/null; then
  echo "ERROR: NodeJS required"
  exit 1
fi

# Get Asset Data
echo "> Loading asset data..."
file=$(node tools/get-release-response.js)

cd ..
mkdir -p ./dist
tar -xzf $file -C ./dist

/bin/bash ./bin/deploy.sh

rm -rf $file
rm -rf ./dist

# grep '"url":' $RESPONSE_STR

  # bash