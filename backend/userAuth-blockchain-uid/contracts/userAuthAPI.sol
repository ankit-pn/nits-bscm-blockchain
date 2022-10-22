// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract userAuthAPI {
    mapping (string => string) userMap;    
    function addUser(string memory userId,string memory password) public {
        userMap[userId] = password;
    }
    function checkPassword(string memory userId) public view returns (string memory){
        return userMap[userId];
    } 
}