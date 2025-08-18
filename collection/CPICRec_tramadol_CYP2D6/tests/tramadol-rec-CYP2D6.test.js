
import {dosingrecommendation}  from '../recommendation.js';
import expect from 'expect';

describe('Give correct tramadol recommendations', () => {
  let inputList = {};
  beforeEach(()=>{
    inputList = {};
  });

  it('Should return a normal recommendation', () => {
    inputList.CYP2D6 = {
      "diplotype":"*1/*1", "phenotype":"Normal metabolizer"
    };
    let result = dosingrecommendation(inputList);
    expect(result.recommendation.implication).toEqual(
        "Expected O-desmethyltramadol (active metabolite) formation");
  });

  it('Should return a poor recommendation', () => {
    inputList.CYP2D6 = {
      "diplotype":"*1/*1", "phenotype":"Poor metabolizer"
    };
    let result = dosingrecommendation(inputList);
    expect(result.recommendation.content).toEqual(expect.stringContaining(
        "Avoid tramadol use because of possibility of diminished analgesia."));
  });

  it('Should fail if no phenotype', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1" };
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input.");
  });

  it('Should fail if unrecognized phenotype', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1", "phenotype":"Amazing metabolizer" };
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug Tramadol");
  });

  it('Should fail if no CYP2D6 gene in list', () => {
    let result = dosingrecommendation(inputList);
    expect(result).toEqual("Incorrect/invalid input for drug Tramadol");
  });

  it('Should ignore other gene fields', () => {
    inputList.CYP2D6 = { "diplotype":"*1/*1", "phenotype":"Normal metabolizer" };
    inputList.CYP2D7 = { "diplotype":"*1/*1", "phenotype":"Rapid metabolizer" };
    let result = dosingrecommendation(inputList);
    expect(result.recommendation.content).toEqual(
        "Use tramadol label recommended age-specific or weight-specific dosing.");
  });

});
