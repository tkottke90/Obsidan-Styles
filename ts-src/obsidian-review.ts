interface DataviewQueryResult<DataType> {
  successful: boolean;
  value: {
    headers: string[]
    values: DataType[]
  }
}

async function getVaultTypes() {
  const queryResult: DataviewQueryResult<[string, string]>  = await dv.query(`
  TABLE WITHOUT ID file.frontmatter.type as Type, file.frontmatter.sub-type as Sub-Type
  WHERE file.frontmatter.type
  `)
  
  if (queryResult.successful) {
    const data = new Map()
    queryResult.value.values.forEach(([type, subType]) => {
      const key = `${type},${subType ?? ''}`;
    
      const value = data.get(key) ?? 1;
      data.set(key, value + 1);
    })
  
    dv.table(
      [...queryResult.value.headers, "Count"],
      Array.from(data)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB) )
        .map(([key, count]) => [...key.split(','), count])
    );
  
  } else {
    console.log('there was a problem querying the vault')
    // showError('There was a problem querying the vault')
  }
}

async function getNotesWithoutTypes() {
  const queryResult: DataviewQueryResult<[string, string]> = await dv.query(`
  TABLE WITHOUT ID file.frontmatter.type as Type, file.frontmatter.sub-type as Sub-Type
  WHERE !file.frontmatter.type or !file.frontmatter.sub-type
  `)
  
  if (queryResult.successful) {
    const data = new Map()
    queryResult.value.values.forEach(([type, subType]) => {
      const key = `${type},${subType ?? ''}`;
    
      const value = data.get(key) ?? 1;
      data.set(key, value + 1);
    })
  
    dv.table(
      [...queryResult.value.headers, "Count"],
      Array.from(data)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB) )
        .map(([key, count]) => [...key.split(','), count])
    );
  
  } else {
    console.dir(queryResult);
    dv.paragraph('There was a problem')
  }
}

