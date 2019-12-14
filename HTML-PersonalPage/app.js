let aNumber = 10;
aFunction(aNumber);
aNumber === 10 ? console.log("10") : console.log("something else");
aFunction(99);
function aFunction(aNumber) {
  switch (aNumber) {
    case 1:
      console.log("1");
      break;
    case 2:
      console.log("2");
      break;
    default:
      console.log("Hello World!");
  }
}
