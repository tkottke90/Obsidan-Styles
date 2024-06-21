// const { padNumber } = require('./lib/string-utils');

/**
 * @typedef {Object} JournalMetadata
 * @property {number} id
 * @property {string} datestring
 * @property {string} frontmatter
 */

/**
 * Generate a Journal Metadata Object
 * @param {number} id 
 * @param {string} indexString
 * @param {string} dateString 
 * @returns {JournalFrontmatter}
 */
function createJournalEntry(id, indexString, dateString) {
  return ({
    id: id,
    datestring: dateString,
    frontmatter: [
      `datastring: ${dateString}`,
      `index: ${indexString}`
    ].join('\n')
  })
}

/**
 * Generates Journal Entry Metadata
 * @param {*} tp Templater instance
 * @param {TFile} targetFolder Path of the current file
 * @returns {JournalMetadata}
 */
module.exports = async (tp) => {
  const { padNumber } = tp.user['string-utils']()
  const { openFileIfExists, countFilesInDir } = tp.user.obsidianUtils()

  const dateString = tp.date.now("YYYYMMDD")
  
  console.dir(tp.user)

  const fileDoesntExist = openFileIfExists(tp, tp.file.folder(), dateString)
  if (fileDoesntExist) {
    const index = countFilesInDir(tp.file.folder(true));

    return createJournalEntry(index, padNumber(5, index), tp.date.now("YYYYMMDD"))
  }
}