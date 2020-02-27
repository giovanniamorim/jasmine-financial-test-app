describe('Bank Deposit', function(){
    
    //Scenario: 1
    it('should be considered as FD on locking amount for a fixed period', function(){
        var myDeposit = new Deposit("FIX");
        depositType = myDeposit.BankDeposit();

        expect(depositType).toBe("FD");
        expect(depositType).not.toBe("Any value other than 'FD' ");
    });

    //Scenario: 2
    it('should be considered as RD on depositing amount on regular frequency', function(){
        var myDeposit = new Deposit("RECURRING");
        depositType = myDeposit.BankDeposit();

        expect(depositType).toBe("RD")
        expect(depositType).not.toBe("Any value other than 'RD' ");
    });

});