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
//returns array no good
// const findEmployeeByName = (nam, arr) => {
//   let employee = arr.filter((emp) => emp.name === nam);
//   return employee[0];

// };
const findEmployeeByName = (nam, arr) => {
  return arr.find((emp) => emp.name === nam);
};
console.log(JSON.stringify(findEmployeeByName("moe", employees))); //{ id: 1, name: 'moe' }

spacer("");

spacer("findManagerFor Shep Jr.");
//given an employee and a list of employees, return the employee who is the manager
const findManagerFor = (obj, arr) => {
  return arr.find((emp) => emp.id === obj.managerId);
};
console.log(
  JSON.stringify(
    findManagerFor(findEmployeeByName("shep Jr.", employees), employees)
  )
); //{ id: 4, name: 'shep', managerId: 2 }
spacer("");

spacer("findCoworkersFor Larry");

//given an employee and a list of employees, return the employees who report to the same manager
const findCoworkersFor = (empObj, arr) => {
  return arr.filter(
    (emp) => empObj.managerId === emp.managerId && empObj.name !== emp.name
  );
};
console.log(
  JSON.stringify(
    findCoworkersFor(findEmployeeByName("larry", employees), employees),
    null,
    2
  )
); /*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer("");

spacer("findManagementChain for moe");
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
const findManagementChainForEmployee = (obj, arr) => {
  if (obj.managerId === undefined) {
    return [];
  }
  let mixedArr = arr.filter(
    (emp) => emp.id <= obj.managerId || emp.id === undefined
  );
  mixedArr.sort((a, b) => a.id - b.id);
  return mixedArr;
};

console.log(
  JSON.stringify(
    findManagementChainForEmployee(
      findEmployeeByName("moe", employees),
      employees
    )
  )
); //[  ]
spacer("");

spacer("findManagementChain for shep Jr.");
//const findManagementChainForEmployee = (obj, arr) => {};

console.log(
  JSON.stringify(
    findManagementChainForEmployee(
      findEmployeeByName("shep Jr.", employees),
      employees
    ),
    null,
    2
  )
);
//Should include Curly ID 3
/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer("");

spacer("generateManagementTree");
// const generateManagementTree = (arr) => {
//   employeess = arr.filter((emp) => emp.name !== `moe`);
//   moee = arr.find((emp) => emp.name === `moe`);

//   for (let b = 0; b < employeess.length; b++) {
//     //debugger;
//     let resArr = [];
//     for (let e = 0; e < employeess.length; e++) {
//       if (employeess[b][`id`] === employeess[e][`managerId`]) {
//         resArr.push(employeess[e]);
//       }
//     }
//     employeess[b][`reports`] = resArr;
//   }
//   let finalArr = [];
//   finalArr = employeess.filter((emp) => moee.id === emp.managerId);
//   moee[`reports`] = finalArr;
//   return moee;
// };

const generateManagementTree = (arr) => {
  let employeess = arr.filter((emp) => emp.managerId !== undefined);
  let moee = arr.find((emp) => emp.managerId === undefined);

  //each boss
  for (let b = 0; b < employeess.length; b++) {
    //each emp
    let repArr = [];
    for (let e = 0; e < employeess.length; e++) {
      if (employeess[b][`id`] === employeess[e][`managerId`]) {
        repArr.push(employeess[e]);
      }
    }
    //add reports to boss
    employeess[b][`reports`] = repArr;
  }
  moee[`reports`] = employeess.filter((emp) => emp.managerId === moee.id);
  //console.log(JSON.stringify(moee, null, 3));
  return moee;
};
console.log(JSON.stringify(generateManagementTree(employees), null, 3));

//if arr.hasOwnProperty(reports) console.log(arr[0][name])

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
//displayManagementTree(generateManagementTree(employees));
//
//Take in an object
//go into array and each node
//go recursive down until you cannot anymore
const displayManagementTree = (arr) => {
  console.log(arr[`reports`][1][`reports`][0][`name`]);
};

displayManagementTree(generateManagementTree(employees));
/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
