function getFilesInFolder(path) {
  return app.vault.getFiles().filter(file => file.path.startsWith(path))
}

/**
 * Gets the number of files in a folder and returns the count
 * @param {string} path 
 * @returns 
 */
function countFilesInDir(path) {
  return getFilesInFolder(path).length
}

async function openFileIfExists(tp, path, filename) {
  const current = tp.file.find_tfile(tp.file.path(true));
  const existing = tp.file.find_tfile(`${path}/${filename}`);

  if (existing) {
    const leaf = app.workspace.getLeaf(false)
    leaf.openFile(existing)

    await app.vault.trash(current, true)
  }

  return !!existing;
}

module.exports = () => ({
  getFilesInFolder,
  countFilesInDir,
  openFileIfExists
})