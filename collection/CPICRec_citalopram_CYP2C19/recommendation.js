// KGrid CPIC guidelines CYP2C19 Phenotype to citalopram Recommendation

const drug = 'citalopram';

const reference = {
  'CYP2C19': { field: 'phenotype', value: '' }
};

const keysuffix = {
  'CYP2C19': { positive: '', negative: '' } // Placeholder in case diplotype logic is later needed
};

const recommendations = {
  'cyp2c19ultrarapid': {
    implication: 'Increased metabolism when compared to extensive metabolizers. Lower plasma concentrations will increase probability of pharmacotherapy failure.',
    recommendation: 'Consider an alternative drug not predominantly metabolized by CYP2C19.',
    classification: 'Moderate'
  },
  'cyp2c19normal': {
    implication: 'Normal metabolism',
    recommendation: 'Initiate therapy with recommended starting dose.',
    classification: 'Strong'
  },
  'cyp2c19intermediate': {
    implication: 'Reduced metabolism when compared to extensive metabolizers.',
    recommendation: 'Initiate therapy with recommended starting dose.',
    classification: 'Strong'
  },
  'cyp2c19poor': {
    implication: 'Greatly reduced metabolism when compared to extensive metabolizers. Higher plasma concentrations may increase the probability of side effects.',
    recommendation: 'Consider a 50% reduction of recommended starting dose and titrate to response or select alternative drug not predominantly metabolized by CYP2C19',
    classification: 'Moderate'
  }
};

function dosingrecommendation(inputs) {
  try {
    const genes = {};
    const output = {};
    let searchkeyReady = true;
    const lowercaseInput = {};
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
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield] !== '');

      if (targetfield === 'diplotype') {
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) !== -1) {
          searchKey += genekey.toLowerCase() + reference[genekey].value + keysuffix[genekey].positive;
        } else {
          searchKey += genekey.toLowerCase() + reference[genekey].value + keysuffix[genekey].negative;
        }
      }

      if (targetfield === 'phenotype') {
        if (genes[genekey].phenotype !== '') {
          searchKey += genekey.toLowerCase() +
            genes[genekey].phenotype
              .replace('metabolizer', '')
              .replace(/ /g, '');
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

export { dosingrecommendation };
