type Node = {
  path: string;
  type: string;
  id: string;
};



function extractNodesFromShape(
  obj: Record<string, any>,
  basePath: string = ''
): Node[] {
  const nodes: Node[] = [];



  for (const key in obj) {
    const value = obj[key];
    const currentPath = basePath ? `${basePath}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      if (Object.keys(value).length === 0) {
        nodes.push({ id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, path: currentPath, type: typeof value });
      } else {
        nodes.push(...extractNodesFromShape(value, currentPath));
      }
    } else {
      nodes.push({ id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, path: currentPath, type: typeof value });
    }



    // if (typeof value === 'string') {
    //   nodes.push({ id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, path: currentPath, type: value });
    // } else if (typeof value === 'object' && value !== null) {
    //   // If value is an empty object, treat it as a generic object
    //   if (Object.keys(value).length === 0) {
    //     nodes.push({ id: `${Date.now()}-${Math.floor(Math.random() * 10000)}`, path: currentPath, type: 'object' });
    //   } else {
    //     nodes.push(...extractNodesFromShape(value, currentPath));
    //   }
    // }
  }

  return nodes;
}

export default extractNodesFromShape