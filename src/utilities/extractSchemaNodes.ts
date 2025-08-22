type SchemaNode = {
  id:string,
  path: string;
  type: string;
  // format?: string;
  // enum?: string[];
  // description?: string;
};

type JSONSchema = {
  type: string;
  properties?: Record<string, any>;
  items?: any;
  format?: string;
  enum?: string[];
  description?: string;
  additionalProperties?: any;
};

function extractSchemaPaths(
  schema: JSONSchema,
  basePath: string = ''
): SchemaNode[] {
  const nodes: SchemaNode[] = [];

  if (schema.type === 'object' && schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      const newPath = basePath ? `${basePath}.${key}` : key;
      nodes.push(...extractSchemaPaths(propSchema, newPath));
    }
  } else if (schema.type === 'array' && schema.items) {
    const arrayPath = basePath + '[]';
    nodes.push(...extractSchemaPaths(schema.items, arrayPath));
  } else if (schema.type === 'object' && schema.additionalProperties) {
    // Handle dynamic object (map)
    nodes.push({
      id:`${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      path: basePath,
      type: 'object',
      ...schema
    });
  } else {
    // Leaf node
    nodes.push({
      id:`${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      path: basePath,
      type: schema.type,
      // format: schema.format,
      // enum: schema.enum,
      // description: schema.description,
    });
  }

  return nodes;
}

export default extractSchemaPaths