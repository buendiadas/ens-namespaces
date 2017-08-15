pragma solidity ^0.4.11;

/**
 * @title Managed
 * @author Carlos Buendía (@buendiadas), Fluon Foundation <info@fluonfoundation.org>
 * @dev The VAOInterface contract defines the common interface functions that every VAO will implement
 */


contract Managed {
    address public manager;
    function Managed() {
        manager = msg.sender;
    }
    /**
     * Transfers the manager of the contract
     * @param _newManager Address of the new Manager
     */
    function changeManager(address _newManager) onlyManager {
        manager = _newManager;
        ManagerChanged(msg.sender, _newManager);

    }

    function isManager(address _addr) constant returns(bool) {
        return _addr == manager;
    }

    event ManagerChanged(address oldManager, address newManager);
    modifier onlyManager(){
        if(msg.sender != manager)
            throw;
        _;
    }
}
