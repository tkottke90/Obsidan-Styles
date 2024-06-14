
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

  const tarbalAsset = assets.find(asset => asset.name === assetName);

  if (!tarbalAsset) {
    throw new Error('ERROR: No Matching Asset Found')
  }

  const tarball = await fetch(tarbalAsset.browser_download_url).then(response => response.arrayBuffer());

  debugger;
}

getReleaseDetails('tkottke90', 'Obsidan-Styles');