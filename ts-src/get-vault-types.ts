

async function getVaultTypes() {
  await dv.view("Scripts/get-notes-missing-types", { fields: [ 'type', 'sub-type' ] })
}

console.dir({
  property: 'Input',
  // @ts-ignore
  input
});

// @ts-ignore
getVaultTypes();