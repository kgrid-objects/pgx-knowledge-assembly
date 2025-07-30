import  pgx_kb_library_service  from '../../src/library-service/library-service.js';
import expect from 'expect';

describe('Library Service should provide correct phenotypes and recommendations', async () => {
  let input = {
    "patient": {
      "name": "Hank Hill",
      "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*4A/*10",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  };
  let result 
  before(async () => {
    result = await pgx_kb_library_service.run(input);
  });
  it('Should include phenotupes as intermediate results', () => {
    expect(result).toHaveProperty('intermediate');
  });

  it('Should calculate correct phenotupes in intermediate results', () => {
    expect(result.intermediate).toBeDefined();
    expect(result.intermediate.CYP2C19.phenotype).toEqual("Poor metabolizer");
    expect(result.intermediate.CYP2C9.phenotype).toEqual(undefined);
    expect(result.intermediate.UGT1A1.phenotype).toEqual("Normal metabolizer");
  });

  it('Should include recommendations from KS2', () => {
    expect(result).toHaveProperty('finalKS2');
  });

  it('Should calculate correct recommendations using ks2', () => {
    expect(result.finalKS2).toBeDefined();
    const abacavirRec = result.finalKS2.find(item => item.drug === 'abacavir');
    expect(abacavirRec).toBeDefined();  // Make sure the entry exists
    expect(abacavirRec.recommendation.content).toBe('abacavir: Use abacavir per standard dosing guidelines');

    const carbamazepine = result.finalKS2.find(item => item.drug === 'carbamazepine');
    expect(carbamazepine).toBeUndefined();  // Make sure the entry exists

  });

  it('Should include recommendations from KS3', () => {
    expect(result).toHaveProperty('finalKS3');
  });

  it('Should calculate correct recommendations using ks3', () => {
    expect(result.finalKS3).toBeDefined();
    const clomipramine = result.finalKS3.find(item => item.drug === 'clomipramine');
    expect(clomipramine).toBeDefined();  // Make sure the entry exists
    expect(clomipramine.recommendation.content).toBe('NO action is required for this gene-drug interaction.');

    const amitriptyline = result.finalKS3.find(item => item.drug === 'amitriptyline');
    expect(amitriptyline).toBeUndefined();  // Make sure the entry exists

  });



});
