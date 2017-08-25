'use strict';
const NevToken = artifacts.require('./NEVToken.sol');
const FIFSRegistrar=artifacts.require('./ens/FIFSRegistrar.sol');
const ENS=artifacts.require('./ens/ENS.sol');
const testNode="buendiadas";
const completeNode="buendiadas.eth";
const namehash = require('../node_modules/eth-ens-namehash');
let accounts=web3.eth.accounts;


contract('NEVToken', function(accounts){

    describe('Upgrading from a parent contract to a child', async() => {
        let registrar= await FIFSRegistrar.deployed();
        let ens= await ENS.deployed();

        beforeEach("register an unclaimed name", function() {
          return registrar.register(web3.sha3(testNode), accounts[0], {from: accounts[0]})
            .then(txHash => ens.owner(namehash(completeNode)))
            .then(address => assert.equal(accounts[0],address))
        });

        it('should have been registered the name', async function() {
            let owner= await ens.owner(namehash(completeNode));
            assert.equal(accounts[0],owner);
        });

        it('should create a new token from the new node name', async function() {
            let token = await NevToken.new(ens.address, namehash(completeNode),accounts[0]);
        });
      });
});
