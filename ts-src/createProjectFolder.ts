/*

Creates a project directory structure which contains templates to 
help me get started with a project quickly.

Included items are:

- A README.md which contains instructions on how to work on the project
  - Contains spaces for:
    1. A Description
    2. The end goal of the project
  - Contains Frontmatter
    - Status: Backlog, Planning, In Progress, Complete
    - Date Created
    - Date Started
    - Date Last Updated
- A Canvas named after the project
- 3 Sub-Directories
  - Notes - Text files containing my notes on the document
  - Assets - Any non-text files that are related to the project
  - Sources - Information about who I found information through

*/

import { App } from "obsidian";
import { Templater } from "./types/templater";
declare const app: App

const SUB_FOLDERS = [
  'Notes',
  'Assets',
  'Sources'
]

const KANBAN_LANES = [
  'Defining',
  'Backlog',
  'Ready',
  'In Progress',
  'PR',
  'Complete',
  'Released'
]

function createKanbanBoard() {
  return `
---
kanban-plugin: board
---

${KANBAN_LANES.map(lane => `## ${lane}\n\n\n`)}
`
}

/**
 * Templater Script for creating a new project folder with all the fixings
 * @param {Templater} tp Templater instance
 * @returns 
 */
module.exports = async (tp: Templater) => {
  const projectName = await tp.system.prompt("Project Name", null, true, false);
  
  if (!projectName) {
    await app.vault.trash(
      tp.file.find_tfile(
        tp.file.path(true)
      ),
      true
    )
    throw Error('Empty Titles Are Not Allowed')
  }

  const parentFolder = tp.file.folder(true);
  const projectFolder = parentFolder + '/' + projectName

  for (let dir of SUB_FOLDERS) {
    await app.vault.createFolder(`${projectFolder}/${dir}`)
  }

  await app.vault.create(`${projectFolder}/${projectName}.canvas`, JSON.stringify({ nodes: [], edges: [] }))
  await app.vault.create(`${projectFolder}/${projectName} Kanban.md`, createKanbanBoard())

  await tp.file.move(`${projectFolder}/README.md`)

  return projectName
}