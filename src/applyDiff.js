const differentValue = (node1, node2) => {
  if (node1.value !== node2.value) {
    return true;
  }

  if (node1.checked !== node2.checked) {
    return true;
  }

  return false;
};

const isNodeChanged = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  const differentAttribute = Array.from(n1Attributes).find(attribute => {
    const { name } = attribute;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);

    return attribute1 !== attribute2;
  });

  if (differentAttribute) {
    return true;
  }

  if (differentValue(node1, node2)) {
    return true;
  }

  if (
    node1.children.length === 0 &&
    node2.children.length === 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

const applyDiff = (parentNode, realNode, virtualNode) => {
  console.log('applyDiff', parentNode, realNode, virtualNode);

  if (realNode && !virtualNode) {
    console.log(1);
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    console.log(2);
    parentNode.appendChild(virtualNode);
    return;
  }

  console.log(isNodeChanged(virtualNode, realNode));
  if (isNodeChanged(virtualNode, realNode)) {
    console.log(3);
    realNode.replaceWith(virtualNode);
    return;
  }

  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  console.log(4);
  const max = Math.max(realChildren.length, virtualChildren.length);
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;
