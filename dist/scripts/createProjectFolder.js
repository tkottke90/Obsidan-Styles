/**
 * Templater Script for creating a new project folder with all the fixings
 * @param {*} tp Templater instance
 * @returns 
 */
module.exports = async (tp) => {
  const path = await tp.system.prompt("Where will the new folder be located?", null, true, false);

  if (!path) {
    throw Error('Empty Titles Are Not Allowed')
  }

  const pathParts = path.split('/');
  const name = pathParts[pathParts.length - 1]
  await tp.file.rename(name);

  // Create DIR
  await app.vault.createFolder([app.vault.path, ...pathParts, 'Troubleshooting'].join('/'))

  pathParts.push(name)
  await tp.file.move(pathParts.join('/'));
}