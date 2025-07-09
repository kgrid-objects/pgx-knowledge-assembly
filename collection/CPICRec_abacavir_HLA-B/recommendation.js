const drug = 'abacavir';

const reference = {
  'HLA-B': { field: 'diplotype', value: '57:01' }
};

const keysuffix = {
  'HLA-B': { negative: 'noncarrier', positive: 'carrier' }
};

const recommendations = {
  'hla-b57:01noncarrier': {
    implication: 'Low or reduced risk of abacavir hypersensitivity',
    recommendation: 'abacavir: Use abacavir per standard dosing guidelines',
    classification: 'Strong'
  },
  'hla-b57:01carrier': {
    implication: 'Significantly increased risk of abacavir hypersensitivity',
    recommendation: 'abacavir: Abacavir is not recommended',
    classification: 'Strong'
  }
};

function dosingrecommendation(inputs) {
  try {
    const genes = {};
    const output = {};
    let searchkeyReady = true;
    let searchKey = '';
    const lowercaseInput = {};

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

      const targetfield = reference[genekey].field;
      searchkeyReady = searchkeyReady && genes[genekey][targetfield] !== '';

      if (targetfield === 'diplotype') {
        if (genes[genekey].diplotype.includes(reference[genekey].value)) {
          searchKey += key + reference[genekey].value + keysuffix[genekey].positive;
        } else {
          searchKey += key + reference[genekey].value + keysuffix[genekey].negative;
        }
      }

      if (targetfield === 'phenotype') {
        if (genes[genekey].phenotype !== '') {
          searchKey += key + genes[genekey].phenotype.replace('metabolizer', '').replace(/\s/g, '');
        }
      }
    }

    if (searchkeyReady) {
      const recommendation = recommendations[searchKey];
      if (recommendation != null) {
        output.type = 'CPIC Recommendation';
        output.drug = drug;
        output.genes = structuredClone(genes);
        output.recommendation = {
          implication: recommendation.implication,
          content: recommendation.recommendation,
          classification: recommendation.classification
        };
        return output;
      } else {
        return `Incorrect/invalid input for drug ${drug}`;
      }
    } else {
      return 'Incorrect/invalid input.';
    }
  } catch (error) {
    return 'Error: ' + error;
  }
}

export { dosingrecommendation };
