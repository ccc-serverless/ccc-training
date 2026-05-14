import nodeSizes from "./_data_nodeSizes.json";

export function getNodeDimensions(node) {
  switch (node.type) {
    case "INPUT":
    case "PROCESS":
      return nodeSizes.rect;
    case "DECISION":
      return nodeSizes.diamond;
    case "START":
    case "BRANCH":
    case "END":
    case "ANSWER":
      return {
        radius: nodeSizes.circle.radius,
        height: nodeSizes.circle.radius * 2,
        width: nodeSizes.circle.radius * 2,
      };
    default:
      return 0;
  }
}
