type Node = {
  path: string;
  type: string;
};

function extractNodesFromShape(
  obj: Record<string, any>,
  basePath: string = ''
): Node[] {
  const nodes: Node[] = [];

  for (const key in obj) {
    const value = obj[key];
    const currentPath = basePath ? `${basePath}.${key}` : key;

    if (typeof value === 'string') {
      nodes.push({ path: currentPath, type: value });
    } else if (typeof value === 'object' && value !== null) {
      // If value is an empty object, treat it as a generic object
      if (Object.keys(value).length === 0) {
        nodes.push({ path: currentPath, type: 'object' });
      } else {
        nodes.push(...extractNodesFromShape(value, currentPath));
      }
    }
  }

  return nodes;
}

export default extractNodesFromShape