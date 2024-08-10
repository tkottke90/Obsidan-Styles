// Tools for working with the Kanban Board Obsidian Plugin
//   Link: https://github.com/mgmeyers/obsidian-kanban

const KANBAN_LANES = [
  'Defining',
  'Backlog',
  'Ready',
  'In Progress',
  'PR',
  'Complete',
  'Released'
]

/**
 * 
 * @param {string[]} [lanes] List of lanes that the Kanban board should have 
 * @returns 
 */
function createKanbanBoard(lanes) {
  const markdownHeaders = (lanes ?? KANBAN_LANES).map(lane => `## ${lane}\n\n\n`)

  return `
---
kanban-plugin: board
---

${markdownHeaders}
`
}

module.exports = {
  createKanbanBoard
}