// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract LandRecord{
    uint public result;

    function Addition(uint a, uint b) public returns(uint) {
        result = a + b;
        return result;
    }

}