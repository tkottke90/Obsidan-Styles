async function getNotesMissingFrontmatter(inputs: { fields: string[] }) {
  const fields = inputs.fields.map(name => {
    return `file.frontmatter.${name} as ${name.toUpperCase().charAt(0) + name.slice(1)}`
  });

  const conditions = inputs.fields.map(name => {
    return `!file.frontmatter.${name}`;
  });

  const queryResult = await dv.query<string[]>(`
    TABLE WITHOUT ID ${fields.join(', ')}
    WHERE ${conditions.join(' or ')}
  `)
  
  if (queryResult.successful) {
    const data = new Map()
    queryResult.value.values.forEach((items) => {
      const key = items.join(',');
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
    await dv.view("Scripts/error", { message: 'There was a problem pulling types' });
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