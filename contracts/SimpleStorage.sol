// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title SimpleStorage
 * @dev A contract that allows storing, updating, and retrieving a number.
 */
contract SimpleStorage {
    // Private state variable to store a number.
    uint private number;

    // Private state variable to store the contract owner's address.
    address private owner;

    // Event emitted whenever the stored number is updated.
    event NumberUpdated(uint oldNumber, uint newNumber);

    /**
     * @dev Constructor to initialize the contract.
     * Sets the deployer as the contract owner.
     */
    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Function to update the stored number.
     * Emits a NumberUpdated event.
     * @param _number The new number to be stored.
     */
    function setNumber(uint _number) public {
        emit NumberUpdated(number, _number); // Log the change
        number = _number; // Update the stored number
    }

    /**
     * @dev Function to retrieve the stored number.
     * @return The current stored number.
     */
    function getNumber() public view returns (uint) {
        return number;
    }

    /**
     * @dev Function to increment the stored number by 1.
     * Emits a NumberUpdated event.
     */
    function increment() public {
        emit NumberUpdated(number, number + 1);
        number += 1;
    }

    /**
     * @dev Function to decrement the stored number by 1.
     * Ensures the number does not go below zero.
     * Emits a NumberUpdated event.
     */
    function decrement() public {
        require(number > 0, "Number cannot be negative"); // Prevents underflow
        emit NumberUpdated(number, number - 1);
        number -= 1;
    }

    /**
     * @dev Function to retrieve the owner's address.
     * @return The address of the contract owner.
     */
    function getOwner() public view returns (address) {
        return owner;
    }
}
