const createValidation = (fn, errorMsg) => data => {
  const result = fn(data);
  return {
    cata: branch => (result ? branch.right(result) : branch.left(errorMsg))
  };
};

const senderTranId = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 8
        ? /^[0-9]{1,8}$/.test(data)
        : "Must not exceed 8 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const runDate = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length
        ? /^\d\d\d\d-\d\d-\d\d$/.test(data)
        : "Required parameter"
      : "Required parameter",
  "Invalid date format"
);
const description = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 180
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 180 characters"
      : true,
  "Has invalid character(s)"
);
const processor = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 4
        ? /^[a-zA-Z]+$/.test(data)
        : "Must no exceed 4 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const mName = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 30
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 30 characters"
      : true,
  "Has invalid character(s)"
);
const flName = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 30
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 30 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const amount = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 18
        ? /^([0-9]{0,15})(\.[0-9]{1,2})?$/.test(data)
        : "Must no exceed 18 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const currency = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 3
        ? /^[a-zA-Z]+$/.test(data)
        : "Must not exceed 3 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const address1 = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 60
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 60 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const address2 = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 60
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 60 characters"
      : true,
  "Has invalid character(s)"
);
const brgy = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 40
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 40 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const cityProvinceMobileNational = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 20
        ? /^[a-zA-Z0-9-\s]*$/.test(data)
        : "Must not exceed 20 characters"
      : "Required parameter",
  "Has invalid character(s)"
);
const email = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length <= 80
        ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            data
          )
        : "Must not exceed 80 characters"
      : "Required parameter",
  "Invalid foramat"
);
const birthdate = createValidation(
  data =>
    data !== undefined && data !== null && data !== " " && data !== ""
      ? data.length
        ? /^\d\d\d\d-\d\d-\d\d$/.test(data)
        : "Required parameter"
      : "Required parameter",
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
  senderTranId: senderTranId("12345678"),
  tranRequestDate: runDate("2019-01-29"),
  currency: currency("PHP"),
  value: amount("1000"),
  description: description("ascsvdfsdfs"),
  processor: processor("UBP"),
  first: flName("Juan"),
  middle: mName("S"),
  last: flName("asd"),
  line1: address1("test"),
  line2: address2("12312"),
  barangay: brgy("dasdasd"),
  city: cityProvinceMobileNational("Pasig"),
  province: cityProvinceMobileNational("Metro Manila"),
  email: email("testtestscom"),
  mobile: cityProvinceMobileNational("23123123"),
  birthdate: birthdate("10/10/2018"),
  nationality: cityProvinceMobileNational("Marsian")
};

let errors = validateRequest(requestValues).reduce(
  (p, v) => Object.assign(p, v),
  {}
);
let filter = Object.keys(errors).reduce((p, v) => {
  if (errors[v] !== true) p[v] = errors[v];
  return p;
}, {});
let statusCode = Object.keys(filter).length ? "404" : "200";

console.log(JSON.stringify(errors, null, 2));
console.log(statusCode);
