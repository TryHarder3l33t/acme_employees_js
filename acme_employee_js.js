const employees = [
  { id: 1, name: "moe" },
  { id: 2, name: "larry", managerId: 1 },
  { id: 4, name: "shep", managerId: 2 },
  { id: 3, name: "curly", managerId: 1 },
  { id: 5, name: "groucho", managerId: 3 },
  { id: 6, name: "harpo", managerId: 5 },
  { id: 8, name: "shep Jr.", managerId: 4 },
  { id: 99, name: "lucy", managerId: 1 },
];

const spacer = (text) => {
  if (!text) {
    return console.log("");
  }
  const stars = new Array(5).fill("*").join("");
  console.log(`${stars} ${text} ${stars}`);
};

spacer("findEmployeeByName Moe");
// given a name and array of employees, return employee
const findEmployeeByName = (nam, arr) => {
  let employee = arr.filter((emp) => emp.name === nam);
  return employee;
};
console.log(findEmployeeByName("moe", employees)); //{ id: 1, name: 'moe' }

spacer("");

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager
const findManagerFor = (obj, arr) => {
  //console.log(obj)
  //console.log(arr)
  const manager = arr.find((emp) => obj.managerId === emp.id);
  console.log(manager);
  return manager;
};
console.log(
  findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

spacer("findCoworkersFor Larry");

//given an employee and a list of employees, return the employees who report to the same manager
const findCoworkersFor = (obj, arr) => {
  coWorkers = arr.filter(
    (cos) => obj.managerId === cos.managerId && obj.name !== cos.name
  );
  console.log(coWorkers);
};
console.log(
  findCoworkersFor(findEmployeeByName("larry", employees), employees)
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer("");

spacer("findManagementChain for moe");
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
const findManagementChainForEmployee = (obj, arr) => {
  let arr2 = [];
  let newObj = obj;
  while (newObj.managerId !== undefined) {
    let result = arr.find((emp) => newObj.managerId === emp.id);
    arr2.push(result);
    newObj = result;
  }
  //console.log(arr2)
  return arr2.reverse();
};

console.log(
  findManagementChainForEmployee(
    findEmployeeByName("moe", employees),
    employees
  )
); //[  ]
spacer("");

spacer("findManagementChain for shep Jr.");
const findManagementChainForEmployee = (obj, arr) => {
  let arr2 = [];
  let newObj = obj;
  while (newObj.managerId !== undefined) {
    let result = arr.find((emp) => newObj.managerId === emp.id);
    arr2.push(result);
    newObj = result;
  }
  //console.log(arr2)
  return arr2.reverse();
};

console.log(
  findManagementChainForEmployee(
    findEmployeeByName("shep Jr.", employees),
    employees
  )
); /*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer("");

spacer("generateManagementTree");
const generateManagementTree = (arr) => {
  let moee = arr.filter((emp) => emp.managerId === undefined);
  let employeess = arr.filter((emp) => emp.managerId !== undefined);
  let ids = employeess.map((emp) => emp.id);
  //console.log(moee)
  //console.log(employeess)
  //console.log(ids )
  //Need index for employee identification
  for (let i = 0; i < ids.length; i++) {
    resArr = [];
    for (let emp of employeess) {
      //console.log(emp)
      if (ids[i] === emp.managerId) {
        resArr.push(emp);
      }
    }
    employeess[i][`results`] = resArr;
  }
  let finalArr = [];
  for (let i = 0; i < ids.length; i++) {
    if (moee.id === employeess.managerId) {
      finalArr.push(employeess[i]);
    }
  }
  moee["results"] = finalArr;

  //console.log(employees)
  return finalArr;
};
console.log(generateManagementTree(employees));

console.log(generateManagementTree(employees));
console.log(JSON.stringify(generateManagementTree(employees), null, 2));

// {
//   "id": 1,
//     "name":
//   "moe",
//     "reports": [{
//       "id": 2,
//       "name": "larry",
//       "managerId": 1,
//       "reports": [
//           {
//             "id": 4,
//             "name": "shep",
//             "managerId": 2,
//             "reports": [
//               {
//                 "id": 8,
//                 "name": "shep Jr.",
//                 "managerId": 4,
//                 "reports": []
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "id": 3,
//         "name": "curly",
//         "managerId": 1,
//         "reports": [
//           {
//             "id": 5,
//             "name": "groucho",
//             "managerId": 3,
//             "reports": [
//               {
//                 "id": 6,
//                 "name": "harpo",
//                 "managerId": 5,
//                 "reports": []
//               }
//             ]
//           }
//         ]
//       },
//       {
//         "id": 99,
//         "name": "lucy",
//         "managerId": 1,
//         "reports": []
//       }
//     ]
//   }

spacer("");

spacer("displayManagementTree");
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees)); /*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
