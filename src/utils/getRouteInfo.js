export default function getRouteInfo(navTree, path) {
  if (navTree.path === path) {
    return navTree;
  }
  let route;
  for (let p in navTree) {
    if (navTree.hasOwnProperty(p) && typeof navTree[p] === "object") {
      route = getRouteInfo(navTree[p], path);
      if (route) {
        return route;
      }
    }
  }

  return route;
}
