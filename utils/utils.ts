export const objToArray = (obj: any) => {
  let array = Object.keys(obj);

  array.forEach((item) => {
    if (obj[item] == false) {
      array.splice(array.indexOf(item), 1);
    }
    if (typeof obj[item] == 'object') {
      const newObj = objToArray(obj[item].select);
      for (let i = 0; i < newObj.length; i++) {
        i == 0
          ? array.splice(array.indexOf(item), 1, item + '.' + newObj[0])
          : array.splice(
              array.indexOf(item + '.' + newObj[i - 1]),
              0,
              item + '.' + newObj[i]
            );
      }
    }
  });

  return array;
};
