export function again(countries_current, copy) {
  return copy.length - countries_current.length == copy.length
    ? {
        result: true,
        list: "",
        value: "",
        counrtiess: copy,
        score: 0 + "/" + copy.length,
      }
    : { result: false };
}
