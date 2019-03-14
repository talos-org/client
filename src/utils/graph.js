// @flow
export const transformForGraph = (graphData: Array<Object>): Promise<Object> =>
  new Promise((resolve, reject) => {
    const data: Object = {
      nodes: [],
      links: [],
      focusedNodeId: -1,
    };

    graphData.forEach(d => {
      data.nodes.push(d);
      data.nodes.forEach(node => {
        node.name = d.addr;
      });
      data.links.push({ source: -1, target: d.id });
    });

    data.nodes.push({ id: -1, color: '#033fff', name: 'Current' });

    resolve(data);
  });
