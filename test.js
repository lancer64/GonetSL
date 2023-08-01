//Run: mocha test.js

var test = require("unit.js");
const allocate = require("./utils/allocate");

const salesOrders = [
  {
    id: "S1",
    created: "2020-01-02",
    quantity: 6,
  },
  {
    id: "S2",
    created: "2020-11-05",
    quantity: 2,
  },
  {
    id: "S3",
    created: "2019-12-04",
    quantity: 3,
  },
  {
    id: "S4",
    created: "2020-01-20",
    quantity: 2,
  },
  {
    id: "S5",
    created: "2019-12-15",
    quantity: 9,
  },
];

const purchaseOrders = [
  {
    id: "P1",
    receiving: "2020-01-04",
    quantity: 4,
  },
  {
    id: "P2",
    receiving: "2020-01-05",
    quantity: 3,
  },
  {
    id: "P3",
    receiving: "2020-02-01",
    quantity: 5,
  },
  {
    id: "P4",
    receiving: "2020-03-05",
    quantity: 1,
  },
  {
    id: "P5",
    receiving: "2020-02-20",
    quantity: 7,
  },
];

describe("Empty arrays return empty arrays", function () {
  it("Purchases are empty", function () {
    const test1 = allocate(salesOrders, []);
    test.must(JSON.stringify(test1)).be.equal(JSON.stringify([]));
  });

  it("Sales are empty", function () {
    const test2 = allocate([], purchaseOrders);
    test.must(JSON.stringify(test2)).be.equal(JSON.stringify([]));
  });
});

describe("Normal sorting", function () {
  it("Check id", function () {
    const testAllocation = allocate(salesOrders, purchaseOrders);
    test.object(testAllocation[0]).hasValue("2020-01-04").hasProperty("id");
  });

  it("Check date", function () {
    const testAllocation = allocate(salesOrders, purchaseOrders);
    test
      .object(testAllocation[3])
      .hasValue("S4")
      .contains({ date: "2020-03-05" });
  });
});
