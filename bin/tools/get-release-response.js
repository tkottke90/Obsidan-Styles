const { writeFileSync } = require('fs');
const path = require('path');

/**
 * Helper function to parse http responses
 * @param {Response} response
 * @returns {Record<string,any>}
 */
function parseHttpResponse(response) {
  if (response.status !== 200) {
    throw Error(`HTTP Error: ${response.status} - ${response.statusText}`)
  }

  return response.json();
}

/**
 * 
 * @param {string} owner 
 * @param {string} repo 
 */
async function getReleaseDetails(owner, repo) {
  const rootPath = `https://api.github.com/repos/${owner}/${repo}`

  const { name, assets } = await fetch(`${rootPath}/releases/latest`).then(parseHttpResponse);
  const assetName = `obsidian-styles.${name}.tar.gz`;

  const tarballAsset = assets.find(asset => asset.name === assetName);

  if (!tarballAsset) {
    throw new Error('ERROR: No Matching Asset Found')
  }

  const tarball = await fetch(tarballAsset.browser_download_url).then(response => response.arrayBuffer());
  const fullPath = path.resolve('..', assetName)

  writeFileSync(fullPath, Buffer.from(tarball))

  console.log(fullPath)
}

getReleaseDetails('tkottke90', 'Obsidan-Styles');