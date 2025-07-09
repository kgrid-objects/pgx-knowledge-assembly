// KGrid CPIC guidelines CYP2C19 and CYP2D6 Phenotypes to amitriptyline Recommendation

const drug = 'amitriptyline';

const reference = {
  'CYP2C19': { field: 'phenotype', value: '' },
  'CYP2D6': { field: 'phenotype', value: '' }
};

const recommendations = {
  'cyp2c19cyp2d6ultrarapid': {
    implication: 'Increased metabolism of TCAs to less active compounds compared to normal metabolizers Lower plasma concentrations of active drug will increase probability of pharmacotherapy failure',
    recommendation: 'Avoid tricyclic use due to potential lack of efficacy. Consider alternative drug not metabolized by CYP2D6. If a TCA is warranted, consider titrating to a higher target dose (compared to normal metabolizers). Utilize therapeutic drug monitoring to guide dose adjustments.',
    classification: 'Strong'
  },
  "cyp2c19cyp2d6normal": {
    implication: 'Normal metabolism of TCAs',
    recommendation: 'Initiate therapy with recommended starting dose.',
    classification: 'Strong'
  }
};

const keysuffix = {
  'CYP2C19': { positive: '', negative: '' },
  'CYP2D6': { positive: '', negative: '' }
};

function dosingrecommendation(inputs) {
  try {
    const genes = {};
    const output = {};
    let searchkeyReady = true;
    let lowercaseInput = {};
    let searchKey = '';
    let targetfield = '';

    for (const inputkey in inputs) {
      const key = inputkey.toLowerCase();
      lowercaseInput[key] = inputs[inputkey];
    }

    for (const genekey in reference) {
      const key = genekey.toLowerCase();
      if (!lowercaseInput[key]) break;

      genes[genekey] = {
        diplotype: lowercaseInput[key].diplotype || '',
        phenotype: (lowercaseInput[key].phenotype || '').toLowerCase()
      };

      targetfield = reference[genekey].field;

      if (targetfield === 'diplotype') {
        if (genes[genekey].diplotype.includes(reference[genekey].value)) {
          searchKey += genekey.toLowerCase() + reference[genekey].value + keysuffix[genekey].positive;
        } else {
          searchKey += genekey.toLowerCase() + reference[genekey].value + keysuffix[genekey].negative;
        }
      }

      if (targetfield === 'phenotype') {
        searchKey += genekey.toLowerCase() + genes[genekey].phenotype.replace('metabolizer', '').replace(' ', '');
      }
    }

    if (searchkeyReady) {
      if (recommendations[searchKey] != null) {
        output.type = 'CPIC Recommendation';
        output.drug = drug;
        output.genes = JSON.parse(JSON.stringify(genes));
        output.recommendation = {
          implication: recommendations[searchKey].implication,
          content: recommendations[searchKey].recommendation,
          classification: recommendations[searchKey].classification
        };
        return output;
      } else {
        return `Incorrect/invalid input for drug ${drug}`;
      }
    } else {
      return "Incorrect/invalid input.";
    }
  } catch (error) {
    return 'Error: ' + error;
  }
}

export { dosingrecommendation };
