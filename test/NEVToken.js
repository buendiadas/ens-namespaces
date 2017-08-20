'use strict';
import advanceToBlock from './helpers/advanceToBlock';
const assertJump = require('./helpers/assertJump');
var NevToken = artifacts.require('./NevToken.sol');
var accounts=web3.eth.accounts;




describe()



describe('Upgrading from a parent contract to a child', async () => {

    it('should set upgrade allowance from the parent if call received is from the manager', async function() {
        let parentVao = await SimpleVao.new(VOID_ADDRESS, EVIDENCES_ADDRESS, MINTER_ADDRESS, PRICE_FEED_ADDRESS, MANAGEMENT_INCENTIVE);
        let allowUpgrade= await parentVao.allowUpgrade({from:MANAGER_ADDRESS});
        let upgradeAllowance= await parentVao.canUpgrade();
        assert.equal(true,upgradeAllowance);
    });

    it('should not execute upgrade if it has not been allowed', async function() {
      let parentVao = await SimpleVao.new(VOID_ADDRESS, EVIDENCES_ADDRESS, MINTER_ADDRESS, PRICE_FEED_ADDRESS, MANAGEMENT_INCENTIVE);
      let minting = await parentVao.externalMint(AUX_ADDRESS, MINTED_AMOUNT, {from:MINTER_ADDRESS});
      let childVao= await SimpleVao.new(VOID_ADDRESS, EVIDENCES_ADDRESS, MINTER_ADDRESS, PRICE_FEED_ADDRESS, MANAGEMENT_INCENTIVE);
      try{
        let upgrading = await parentVao.upgrade(childVao.address,MINTED_AMOUNT,{from:AUX_ADDRESS});
      } catch(error) {
        return assertJump(error);
      }
      assert.fail('should have thrown before');
    });

    it('should execute upgrade from the parent if it has been allowed', async function() {
      let parentVao = await SimpleVao.new(VOID_ADDRESS, EVIDENCES_ADDRESS, MINTER_ADDRESS, PRICE_FEED_ADDRESS, MANAGEMENT_INCENTIVE);
      let childVao= await SimpleVao.new(parentVao.address, EVIDENCES_ADDRESS, MINTER_ADDRESS, PRICE_FEED_ADDRESS, MANAGEMENT_INCENTIVE);
      let minting = await parentVao.externalMint(MANAGER_ADDRESS, MINTED_AMOUNT, {from:MINTER_ADDRESS});
      let allowUpgrade= await parentVao.allowUpgrade({from:MANAGER_ADDRESS});
      let upgrading = await parentVao.upgrade(childVao.address,MINTED_AMOUNT,{from:MANAGER_ADDRESS});
      let balanceInChild= await childVao.balanceOf(MANAGER_ADDRESS);
      assert.equal(MINTED_AMOUNT, balanceInChild);
    });
  });
