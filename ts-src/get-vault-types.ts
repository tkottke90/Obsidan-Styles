async function getVaultTypes() {
  await dv.view("Scripts/get-notes-missing-frontmatter", { fields: [ 'type', 'sub-type' ] })
}

getVaultTypes();