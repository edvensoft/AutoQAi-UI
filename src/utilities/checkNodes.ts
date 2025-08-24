type JSONSchema = {
  type: string;
  properties?: Record<string, JSONSchema>;
  required?: string[];
  items?: JSONSchema;
  additionalProperties?: JSONSchema;
};

type SchemaNode = {
  path: string;
  type: string;
  id: string;
};

function extractAllSchemaNodes(schema: JSONSchema, path: string = ''): SchemaNode[] {
  const nodes: SchemaNode[] = [];

  // Add current node if path is non-empty (to skip the root node itself)
  if (path && schema.type) {
    nodes.push({
      path,
      type: schema.type,
      id: path,
    });
  }

  if (schema.type === 'object') {
    // Handle properties
    if (schema.properties) {
      for (const [key, propSchema] of Object.entries(schema.properties)) {
        const currentPath = path ? `${path}.${key}` : key;
        nodes.push(...extractAllSchemaNodes(propSchema, currentPath));
      }
    }

    // Handle additionalProperties (e.g., map/dynamic keys)
    if (schema.additionalProperties) {
      const additionalPath = path ? `${path}.*` : '*';
      nodes.push(...extractAllSchemaNodes(schema.additionalProperties, additionalPath));
    }
  }

  // Handle arrays
  if (schema.type === 'array' && schema.items) {
    const arrayPath = path + '[]';
    nodes.push({
      path: arrayPath,
      type: 'array',
      id: arrayPath,
    });

    nodes.push(...extractAllSchemaNodes(schema.items, arrayPath));
  }

  return nodes;
}

export default extractAllSchemaNodes