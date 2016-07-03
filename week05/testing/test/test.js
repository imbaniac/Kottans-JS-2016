"use strict";

require("chai").should();
const expect = require('chai').expect;
const add = require('../index.js');

describe('add', () => {

    it("should be a function with 1 param", () => {
        add.should
            .be.a("function")
            .have.lengthOf(1)
    });

	it("should return a 0 at empty string", () => {
		add("").should.equal(0);
	})

	describe('with params', () => {
		it("should return number with 1 param", () => {
			add("2").should.equal(2);
		})

		it("should return sum with a few params", () => {
			add("2, 321").should.equal(323);
			add("2, 2").should.equal(4);
		})

		it("should work with a shitload of params", () => {
			add("1,12,22,42").should.equal(77);
		})
	})

	it("should work with \n space character", () => {
		add("1\n2,3").should.equal(6);
		add("1,\n").should.be.NaN;
	})

	it("should word with different delimeters", () => {
		add("//;\n1;2").should.equal(3);
	})

	it("should throw exception with negatives numbers", () => {
		(()=>{add('4, -3, -2')}).should.throw(Error, "Don't use negative numbers: -3,-2");
	})

	it("should ignore numbers over 1000", () => {
		add("2, 1001, 10000, 3").should.equal(5	);
	})

	it("should work with multicharacters delimeters", () => {
		add("//[***]\n1***2***3").should.equal(6);
	})

	it("should allow multiple delimeters", () => {
		add("//[*][%]\n1*2%3").should.equal(6);
	})

	it("should handle multiple delimeters with length more than 1", () => {
		add("//[**][%][)))]\n1**2%3)))8").should.equal(14);
	})
});
