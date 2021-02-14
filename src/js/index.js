// IIFE
(function () {

    let balance = 0;
    const operations = [];
    const WalletErrors = {
        NOT_FOUND: 'OPERATION_NOT_FOUND',
        TYPE: "INVALID_TYPE",
        AMOUNT: "INVALID_AMOUNT",
        DESCRPT: "INVALID_DESCRIPTION",
        KEY: "INVALID_KEYWORD"
    }

    
        const OperationsType = {
            EXPENSE: 'EXPENSE',
            INCOME: 'INCOME'
        }

    /**
     * this function add a operation from the wallet.
     * es {
     *   type: 'EXPENSE',
     *   amount: 120,
     *   description: 'Bill payment'
     * }
     * @param {*} operation 
     * @constructor ????
     */
    this.addOperation = function(operation) {

        // EXTRA, FIXATO VALIDATORE
        // 1. Estrarre questa validazione in un'altra funzione che prenda come parametro l'operazione e restituisca true o false-------------- ok
        // 2. Personalizzare l'errore ----------------------- ok 
        // 3. Esporta correttamente le funzioni nel contesto padre   ----------------------- ok
        // 4. aggiungere documentazione alle funzioni con commento (es jsdoc) ok 
        if(!OperationsType[operation.type])
            { throw new Error(WalletErrors.TYPE);}
        if( operation.amount <= 0)
            { throw new Error(WalletErrors.AMOUNT);}
        if(!operation.description)
            { throw new Error(WalletErrors.DESCRPT);}
        const operationToAdd = operation;
        operationToAdd.id = new Date().getTime();
        if (operationToAdd.type === OperationsType.EXPENSE) {
            balance -= operationToAdd.amount;
        } else if (operationToAdd.type === OperationsType.INCOME) {
            balance += operationToAdd.amount;
        }
        operations.push(operationToAdd);
    }
    /**
     * Remove an operation from the wallet. It receives the id of the operation
     * and then removes it from the operations list.
     * @param {number} operationId
     * 
     */
    this.removeOperation = function (operationId) {
        let idToRemove = -1;
        for (let i = 0; i < operations.length; i++) {
            if (operations[i].id === operationId) {
                idToRemove = i;
                break;
            }
        }
        if (idToRemove === -1) {
            throw new Error(WalletErrors.NOT_FOUND);
        } 
        const operation = operations[idToRemove];
        if (operation.type === OperationsType.INCOME) {
            balance -= operation.amount;
        } else if (operation.type === OperationsType.EXPENSE) {
            balance += operation.amount;
        }
        operations.splice(idToRemove, 1);
    }

    /**
    * Find a list of operations which descriptions match at least partially the search value.
    * @param {string} searchValue
    * @return {Array<{operation}>} 
    */
    this.findOperations = function (searchValue) {
        if(!searchValue || typeof searchValue ==="number")
        { throw new Error(WalletErrors.KEY);}
        const val = searchValue.toLowerCase().trim();
        const operationsFound = [];
        for (let i = 0; i < operations.length; i++) {
            const description = operations[i].description.toLowerCase();
            if (description.indexOf(val) > -1) {
                operationsFound.push(operations[i]);
            }
        }
        return operationsFound;
    }

    /**
     * 
     * @return {number}  return actually Balance of the wallet
     */
    this.getBalance = function() {
        return balance;
    }
    /**
     * @return {Array<{operation}>} Returns the operations list of the wallet
     */
    this.getOperations = function() {
        return operations
    }

})();