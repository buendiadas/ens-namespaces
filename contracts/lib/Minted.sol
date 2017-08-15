pragma solidity ^0.4.11;

/**
 * @title Minted
 * @author Carlos Buendía (@buendiadas), Fluon Foundation <info@fluonfoundation.org>
 * @dev The Minted contract defines the common interface functions that every VAO will implement
 */


contract Minted {
    address public minter;
    uint256 public lastMint=0;

    event MinterChanged(address oldMinter, address newMinter);

    modifier onlyMinter(){
        if(msg.sender != minter)
            throw;
        _;
    }

    function managed() {
        minter = msg.sender;
    }
    /**
     * Transfers the manager of the contract
     * @param _newMinter Address of the new Minter
     */
    function changeMinter(address _newMinter) onlyMinter {
        minter = _newMinter;
        MinterChanged(msg.sender, _newMinter);

    }

    function isMinter(address _addr) constant returns(bool) {
        return _addr == minter;
    }
}
