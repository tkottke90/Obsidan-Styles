interface DataviewQueryResult<DataType> {
  successful: boolean;
  value: {
    headers: string[]
    values: DataType[]
  }
}

async function getNotesMissingFrontmatter(inputs: { fields: string[] }) {
  console.dir(inputs);
  
  const fields = inputs.fields.map(name => {
    return `file.frontmatter.${name} as ${name.toUpperCase().charAt(0) + name.slice(1)}`
  });


  const queryResult: DataviewQueryResult<[string, string]> = await dv.query(`
    TABLE WITHOUT ID ${fields.join(', ')}
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
    await dv.view("Scripts/error", { message: 'There was a problem' })
  }
}

function validateInput(input: Record<string, any>) {
  if ([
    'fields' in input && Array.isArray(input.fields)
  ].some(value => value !== true)) {

  }
}

// @ts-ignore
getNotesMissingFrontmatter(input);