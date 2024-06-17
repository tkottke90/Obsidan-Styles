#! /bin/bash

# Check if we have a `.obsidian` file in the root of this repo
if [ -f "./.obsidian" ]; then
  echo "Found .obsidian file, running obsidian deploy."
  OBSIDIAN=$(cat "./.obsidian")
else
  read -p "What is the location of your Obsidian Vault? " OBSIDIAN
  echo $OBSIDIAN >> ./.obsidian
fi

# Check for Obsidian directory exists
if [ ! -d "$OBSIDIAN" ]; then
  echo "Could not find $OBSIDIAN, please check and try again."
  exit 1
fi

# Check if we have a `.scripts` file in the root of this repo
if [ -f "./.scripts" ]; then
  echo "Found .obsidian file, running obsidian deploy."
  SCRIPTS=$(cat "./.scripts")
else
  read -p "What is the location of your Obsidian Scripts Directory? " SCRIPTS
  echo $SCRIPTS >> ./.scripts
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
  dist/scripts/*  "$SCRIPTS"