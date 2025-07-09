function dosingrecommendation(inputs) {
  try {
    const genes = {};
    const output = {};
    let searchkeyReady = true;
    const lowercaseInput = {};
    let searchKey = '';

    // Normalize input keys to lowercase
    for (const inputKey in inputs) {
      const key = inputKey.toLowerCase();
      lowercaseInput[key] = inputs[inputKey];
    }

    // Build searchKey from reference
    for (const geneKey in reference) {
      const key = geneKey.toLowerCase();
      if (!lowercaseInput[key]) break;

      genes[geneKey] = {
        diplotype: lowercaseInput[key].diplotype || '',
        phenotype: (lowercaseInput[key].phenotype || '').toLowerCase()
      };

      const targetField = reference[geneKey].field;
      searchkeyReady = searchkeyReady && genes[geneKey][targetField] !== '';

      if (targetField === 'diplotype') {
        if (genes[geneKey].diplotype.includes(reference[geneKey].value)) {
          searchKey += key + reference[geneKey].value + keysuffix[geneKey].positive;
        } else {
          searchKey += key + reference[geneKey].value + keysuffix[geneKey].negative;
        }
      }

      if (targetField === 'phenotype') {
        if (genes[geneKey].phenotype !== '') {
          searchKey += key + genes[geneKey].phenotype.replace('metabolizer', '').replace(/\s/g, '');
        }
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
      return 'Incorrect/invalid input.';
    }
  } catch (error) {
    return 'Error: ' + error;
  }
}

// KGrid CPIC guidelines HLA-B gene to allopurinol Recommendation
const drug = 'allopurinol';

const reference = {
  'HLA-B': { field: 'diplotype', value: '58:01' }
};

const keysuffix = {
  'HLA-B': { negative: 'noncarrier', positive: 'carrier' }
};

const recommendations = {
  'hla-b58:01noncarrier': {
    implication: 'Low or reduced risk of allopurinol-induced severe cutaneous adverse reactions',
    recommendation: 'Use allopurinol per standard dosing guidelines',
    classification: 'Strong'
  },
  'hla-b58:01carrier': {
    implication: 'Significantly increased risk of allopurinol-induced severe cutaneous adverse reactions',
    recommendation: 'Allopurinol is contraindicated',
    classification: 'Strong'
  }
};

export { dosingrecommendation };
