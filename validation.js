const createValidation = (fn, errorMsg, type) => data => {
  const result = fn(data);
  return {
    cata: branch => result ? branch.right(result, type) : branch.left(errorMsg, type), type
  };
};

const tranRequestDate = createValidation(
  data => data.length ? !/^[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}]*$/.test(data) : "Required parameter",
  "Invalid date format"
);
const senderTranId = createValidation(
  data => data.length ?
    data.length <= 8 ? /^[0-9]{1,8}$/.test(data) : "Must not exceed 8 characters"
    : "Required parameter",
  "Has invalid characters"
);
const description = createValidation(
  data => data.length ?
    data.length <= 180 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 180 characters"
    : "Required parameter",
  "Has invalid characters"
);
const processor = createValidation(
  data => data.length ?
    data.length <= 4 ? /^[a-zA-Z]+$/.test(data) : "Must no excees 4 characters"
    : "Required parameter",
  "Has invalid characters"
);
const names = createValidation(
  data => data.length ?
    data.length <= 30 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 30 characters"
    : "Required parameter",
  "Has invalid characters"
);
const amount = createValidation(
  data => data.length ?
    data.length <= 18 ? /^([0-9]{0,15})(\.[0-9]{1,2})?$/.test(data) : "Must no exceed 18 characters"
    : "Required parameter",
  "Has invalid characters"
);
const currency = createValidation(
  data => data.length ?
    data.length <= 3 ? /^[a-zA-Z]+$/.test(data) : "Must not exceed 3 characters"
    : "Required parameter",
  "Has invalid characters"
);
const address = createValidation(
  data => data.length ?
    data.length <= 60 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 60 characters"
    : "Required parameter",
  "Has invalid characters"
);
const brgy = createValidation(
  data => data.length ?
    data.length <= 40 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 40 characters"
    : "Required parameter",
  "Has invalid characters"
);
const cityProvinceMobileNational = createValidation(
  data => data.length ?
    data.length <= 20 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 20 characters"
    : "Required parameter",
  "Has invalid characters"
);
const email = createValidation(
  data => data.length ?
    data.length <= 80 ? /^[a-zA-Z0-9-\s]*$/.test(data) : "Must not exceed 80 characters"
    : "Required parameter",
  "Has invalid characters"
);
const birthdate = createValidation(
  data => data.length ? /^\d{2}([./-])\d{2}\1\d{4}$/.test(data) : "Required parameter",
  "Invalid date format"
);

const validateRequest = values =>
  Object.keys(values).map(key => ({
    [key]: values[key].cata({
      left: e => e,
      right: a => a
    })
  }));

const requestValues = {
  senderTranId: senderTranId('12345678'),
  tranRequestDate: tranRequestDate('10/10/2010'),
  currency: currency("PHP"),
  value: amount("1000"),
  description: description('ascsvdfsdfs'),
  processor: processor('UBP'),
  first: names('Juan'),
  middle: names('S'),
  last: names('asd'),
  line1: address('test'),
  line2: address('12312'),
  barangay: brgy('dasdasd'),
  city: cityProvinceMobileNational('ASDASD'),
  province: cityProvinceMobileNational('Metro Manila'),
  email: email('testtestscom'),
  mobile: cityProvinceMobileNational('897129837'),
  birthdate: birthdate('10/10/2018'),
  nationality: cityProvinceMobileNational('')
};

let errors = Object.assign(...validateRequest(requestValues))
let filter = Object.keys(errors).reduce((p, c) => {
  if (errors[c] !== true) p[c] = errors[c];
  return p;
}, {});
let g = Object.keys(filter).length ? "404" : "200"
