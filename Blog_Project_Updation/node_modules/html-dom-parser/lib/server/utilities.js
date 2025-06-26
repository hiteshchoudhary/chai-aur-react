/**
 * Sets root parent to null.
 *
 * @param  {Array<Comment|Element|ProcessingInstruction|Text>} nodes
 * @return {Array<Comment|Element|ProcessingInstruction|Text>}
 */
function unsetRootParent(nodes) {
  for (var index = 0, len = nodes.length; index < len; index++) {
    var node = nodes[index];
    node.parent = null;
  }
  return nodes;
}

module.exports = {
  unsetRootParent: unsetRootParent
};
