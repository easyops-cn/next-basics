export function handleChange(e: any, callback: Function) {
  let value;
  if (e && e.target) {
    value = e.target.value;
  } else {
    value = e;
  }
  callback && callback(value);
}
