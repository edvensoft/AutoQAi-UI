type JSONSchema = {
  type?: string;
  properties?: {
    [key: string]: JSONSchema;
  };
  items?: JSONSchema;
  // Add more fields if needed
};

type SchemaNode = {
  path: string;
  type?: string;
};

function extractSchemaNodes(
  schema: JSONSchema,
  parentPath = ''
): SchemaNode[] {
  const nodes: SchemaNode[] = [];

  if (schema.type === 'object' && schema.properties) {
    for (const key in schema.properties) {
      const child = schema.properties[key];
      const path = parentPath ? `${parentPath}.${key}` : key;
      nodes.push(...extractSchemaNodes(child, path));
    }
  } else if (schema.type === 'array' && schema.items) {
    const arrayPath = parentPath + '[]';
    nodes.push(...extractSchemaNodes(schema.items, arrayPath));
  } else {
    nodes.push({
      path: parentPath,
      type: schema.type,
    });
  }

  return nodes;
}

export default extractSchemaNodes