/**
 * Get items by page
 *
 * @param {Array} items array of items that will be paged
 * @param {Number} page page index/number
 * @param {Nunmber} pageSize page size (total items per page)
 * @param {Boolean} alwaysFromStart useful for "Load more" cases
 * @returns
 */
export function getItemsByPage(items, page, pageSize, alwaysFromStart) {
  return items.slice(
    alwaysFromStart ? 0 : page * pageSize,
    (page + 1) * pageSize
  );
}
