export const poll = (fn, timeout, interval) => {
  const endTime = Number(new Date()) + (timeout || 2000);
  interval = interval || 100;

  const checkCondition = function(resolve, reject) {
    const result = fn();
    if (result) {
      resolve(result);
    } else if (Number(new Date()) < endTime) {
      setTimeout(checkCondition, interval, resolve, reject);
    } else {
      reject(new Error('timed out for ' + fn + ': ' + arguments));
    }
  };

  return new Promise(checkCondition);
};

export const transformForGraph = graphData =>
  new Promise((resolve, reject) => {
    const data = {
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
