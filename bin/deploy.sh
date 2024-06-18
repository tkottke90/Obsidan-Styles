#! /bin/bash

function usage() {
  # Usage message
  echo "Obsidian Styles Repo - Deploy Script"
  echo "usage: deploy.sh [-o arg1] [-s arg2] [-h]"

}


OBSIDIAN_REF='.obsidian'
SCRIPT_REF='.scripts'

while getopts ":o:s:h" opt; do
  echo "$opt: $OPTARG"
  case $opt in
    o)
      OBSIDIAN_REF=$OPTARG
      ;;
    s)
      SCRIPT_REF=$OPTARG
      ;;
    h)
      usage
      exit 0
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done


# Check if we have a `.obsidian` file in the root of this repo
if [ -f "./$OBSIDIAN_REF" ]; then
  echo "Found .obsidian file, running obsidian deploy."
  OBSIDIAN=$(cat "./$OBSIDIAN_REF")
else
  read -p "What is the location of your Obsidian Vault? " OBSIDIAN
  echo $OBSIDIAN >> ./$OBSIDIAN_REF
fi

# Check for Obsidian directory exists
if [ ! -d "$OBSIDIAN" ]; then
  echo "Could not find $OBSIDIAN, please check and try again."
  exit 1
fi

# Check if we have a `.scripts` file in the root of this repo
if [ -f "./$SCRIPT_REF" ]; then
  echo "Found .scripts file, running obsidian deploy."
  SCRIPTS=$(cat "./$SCRIPT_REF")
else
  read -p "What is the location of your Obsidian Scripts Directory? " SCRIPTS
  echo $SCRIPTS >> ./$SCRIPT_REF
fi

# Check for Obsidian directory exists
if [ ! -d "$OBSIDIAN" ]; then
  echo "Could not find $OBSIDIAN, please check and try again."
  exit 1
fi

if [ ! -d "$SCRIPTS" ]; then
  echo "Could not find $OBSIDIAN, please check and try again."
  exit 1
fi

# Check that the ".obsidian/snippets" directory exists in the Obsidian directory
if [ ! -d "$OBSIDIAN/.obsidian/snippets" ]; then
  # Create the directory if it does not
  mkdir -p "$OBSIDIAN/.obsidian/snippets"
fi

# Use rsync to copy all files in this repo to the Obsidian snippets folder
rsync \
  --recursive \
  --checksum \
  --human-readable \
  --progress \
  --update \
  dist/styles/*  "$OBSIDIAN/.obsidian/snippets"

rsync \
  --recursive \
  --checksum \
  --human-readable \
  --progress \
  --update \
  dist/scripts/*  "$OBSIDIAN/$SCRIPTS"