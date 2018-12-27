//JavaScript Algorithms and Data Structures Projects: Cash Register
function checkCashRegister(price, cash, cid) {
  const value = {
    PENNY: 0.01, NICKEL: 0.05, DIME: 0.1, QUARTER: 0.25,
    ONE: 1, FIVE: 5, TEN: 10, TWENTY: 20, "ONE HUNDRED": 100
  };
  let changeMoney = cash - price;
  const changeArr = [];
  let totalMoneyAvailable = 0;
  for (let i = cid.length - 1; i >= 0; i--) {
    let denomination = cid[i][0];
    let amount = cid[i][1];
    totalMoneyAvailable += amount;
    let numberOfDenomination = 0;
    if (changeMoney >= value[denomination] && amount > 0) {
      while (amount > 0 && changeMoney >= value[denomination]) {
        //crazy floating point error
        changeMoney = Math.round((changeMoney - value[denomination] + 0.00001) * 100) / 100;
        amount -= value[denomination];
        numberOfDenomination++;
      }
    }
    changeArr.push([denomination, numberOfDenomination * value[denomination]]);
    cid[i][1] = amount;
  }
  if (changeMoney > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else {
    if (totalMoneyAvailable === cash - price) {
      return { status: "CLOSED", change: changeArr.reverse() };
    } else {
      return { status: "OPEN", change: changeArr.filter(e=>e[1] !== 0) };
    }
  }
}

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));