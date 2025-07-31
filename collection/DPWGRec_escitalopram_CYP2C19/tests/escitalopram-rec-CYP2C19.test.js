import {dosingrecommendation}  from '../recommendation.js';
import expect from 'expect';

describe('Give correct escitalopram recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP2C19 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = dosingrecommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining("Do not exceed the following doses (50% of the standard maximum dose)"));
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1" };
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug escitalopram");
  });

  it('Should fail if no CYP2C19 gene in list', () => {
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug escitalopram");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2C19 = { "diplotype":"*1/*1", "phenotype":"Poor metabolizer" };
    inputList.CYP2C20 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = dosingrecommendation(inputList);
    expect(result.recommendation.content).toEqual(
        expect.stringContaining("Do not exceed the following doses (50% of the standard maximum dose)"));
  });

});
