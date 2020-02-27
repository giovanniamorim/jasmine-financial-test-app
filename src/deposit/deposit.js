function Deposit(frequency){
    this.Type = frequency;
}

Deposit.prototype.BankDeposit = function(){
    switch(this.Type){
        case "FIX":
            return "FD";
            break;
        case "RECURRING" :
            return "RD";
            break;
    };
}