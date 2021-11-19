/**
 * Using a normal JS object instead of a ES6 map is cleaner when working
 * with ngrx since it can easily be serialized to JSON.
 *
 * This file contains some helper function for working with such maps.
 * Since they are intended to be used by reducers, all functions should be pure.
 */

 export const IdMap = {
   withoutKey(map, key) {
     const { [key]: _, ...rest } = map;
     return rest;
   },

   isEmpty(map) {
     return Object.keys(map).length === 0;
   },

   // This might seem unnecessary, but I subjectively prefer `let x = IdMap.new<int>()` over `let x: IdMap<int> = {}`.
   new() {
     return {};
   },

   groupBy(list, keyToGroupOn) {
     const groupedMap = list.reduce(
       (entryMap, e) =>
         entryMap.set(keyToGroupOn, [...(entryMap.get(keyToGroupOn) || []), e]),
       new Map()
     );
     return groupedMap
   },

   /**
    * Like map for arrays, but for IdMap
    */
   map(map, mapper) {
     const result = IdMap.new();
     for (const [id, t] of Object.entries(map)) {
       result[id] = mapper(t);
     }
     return result;
   },

   /**
    * Like filter for arrays, but for IdMap
    */
   filter(map, predicate) {
     const result = IdMap.new();
     for (const [id, t] of Object.entries(map)) {
       if (predicate(t)) {
         result[id] = t;
       }
     }
     return result;
   },

   /**
    * Like concat for arrays, but for IdMap
    */
   merge(...sources) {
     const result = IdMap.new();
     for (const source of sources) {
       for (const [id, t] of Object.entries(source)) {
         result[id] = t;
       }
     }
     return result;
   },

   keys(map) {
     return Object.keys(map).map((key) => Number(key));
   },

   values(map) {
     return Object.values(map);
   },

   entries(map) {
     return Object.entries(map).map(([key, val]) => [Number(key), val]);
   },
 };