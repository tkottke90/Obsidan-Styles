#! /bin/bash

function usage() {
  # Usage message
  echo "Obsidian Styles Repo - Deploy Script"
  echo "usage: deploy.sh [-o obsidian vault path] [-s scripts folder name] [-t template folder name] [-h]"

}

OBSIDIAN_REF='.obsidian'
SCRIPT_REF='.scripts'
TEMPLATE_REF='.templates'

while getopts ":o:s:t:h" opt; do
  case $opt in
    o)
      OBSIDIAN_REF=$OPTARG
      ;;
    s)
      SCRIPT_REF=$OPTARG
      ;;
    t)
      TEMPLATE_REF=$OPTARG
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

function getRefFile() {
  local ref=$1
  local query=$2

  if [ ! -f "./$ref" ]; then
    read -p "$query " result
    echo $result >> ./$ref
  fi
}

function updateDir() {
  echo $@
  echo "Source: $1"
  echo "Dest: $2"

  rsync \
    --recursive \
    --checksum \
    --human-readable \
    --update \
    "$1" "$2"
}

getRefFile $OBSIDIAN_REF "What is the location of your Obsidian Vault?"
OBSIDIAN=$(cat "./$OBSIDIAN_REF")

if [ ! -d "$OBSIDIAN" ]; then
  echo "Could not find $OBSIDIAN, please check and try again."
  exit 1
fi

# Check that the ".obsidian/snippets" directory exists in the Obsidian directory
if [ ! -d "$OBSIDIAN/.obsidian/snippets" ]; then
  # Create the directory if it does not
  mkdir -p "$OBSIDIAN/.obsidian/snippets"
fi

getRefFile $SCRIPT_REF "What folder is configured for your Templater Scripts?"
SCRIPTS=$(cat "./$SCRIPT_REF")


if [ ! -d "$OBSIDIAN/$SCRIPTS" ]; then
  echo "Could not find $SCRIPTS, please check and try again."
  exit 1
fi

getRefFile $TEMPLATE_REF "What folder is configured for your Templater Templates?"
TEMPLATES=$(cat "./$TEMPLATE_REF")

if [ ! -d "$OBSIDIAN/$TEMPLATES" ]; then
  echo "Could not find $TEMPLATES, please check and try again."
  exit 1
fi

# Use rsync to copy all files in this repo to the Obsidian snippets folder
updateDir dist/styles/  "$OBSIDIAN/.obsidian/snippets"
updateDir dist/scripts/  "$OBSIDIAN/$SCRIPTS"
updateDir dist/templates/ "$OBSIDIAN/$TEMPLATES"