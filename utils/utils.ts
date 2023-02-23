export const objToArray = (obj: any) => {
  let array = Object.keys(obj);
  let array2 = Object.keys(obj);

  array.forEach((item) => {
    if (obj[item] === false) {
      array2.splice(array2.indexOf(item), 1);
    }
    if (typeof obj[item] == 'object') {
      const newObj = objToArray(obj[item].select);
      for (let i = 0; i < newObj.length; i++) {
        i == 0
          ? array2.splice(array2.indexOf(item), 1, item + '.' + newObj[0])
          : array2.splice(
              array2.indexOf(item + '.' + newObj[i - 1]),
              0,
              item + '.' + newObj[i]
            );
      }
    }
  });

  return array2;
};

export const fieldToObj = (field: string, order: string) => {
  if (field) {
    let fields = field.split('.');
    let obj = order as any;

    for (let i = fields.length - 1; i >= 0; i--) {
      obj = { [fields[i]]: obj };
    }
    return obj;
  }
};

export const UTCtoLocal = (date: Date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
};

export const LocaltoUTC = (date: Date) => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
};

export const addDays = (date: Date, days: number) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addMiliseconds = (date: Date, miliseconds: number) => {
  let result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() + miliseconds);
  return result;
};
