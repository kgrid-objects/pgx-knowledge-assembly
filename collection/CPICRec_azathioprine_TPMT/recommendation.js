// KGrid CPIC guidelines TPMT Phenotype to Azathioprine Recommendation

const drug = 'azathioprine';
const reference = {
  TPMT: { field: 'phenotype', value: '' }
};

const recommendations = {
  'tpmtnormal': {
    implication: '',
    recommendation: 'Start with normal starting dose (e.g., 2-3mg/kg/d) and adjust doses of azathioprine based on disease-specific guidelines. Allow 2 weeks to reach steady state after each dose adjustment.',
    classification: 'Strong'
  },
  'tpmtintermediate': {
    implication: '',
    recommendation: 'If disease treatment normally starts at the “full dose”, consider starting at 30-70% of target dose (e.g., 1-1.5mg/kg/d), and titrate based on tolerance. Allow 2-4 weeks to reach steady state after each dose adjustment.',
    classification: 'Strong'
  },
  'tpmtlow': {
    implication: '',
    recommendation: 'Consider alternative agents. If using azathioprine start with drastically reduced doses (reduce daily dose by 10-fold and dose thrice weekly instead of daily) and adjust doses of azathioprine based on degree of myelosuppression and disease-specific guidelines. Allow 4-6 weeks to reach steady state after each dose adjustment. Azathioprine is the likely cause of myelosuppression.',
    classification: 'Strong'
  }
};

const keysuffix = {
  TPMT: { positive: '', negative: '' }
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
      searchkeyReady = searchkeyReady && genes[genekey][targetfield] !== '';

      if (targetfield === 'diplotype') {
        if (genes[genekey].diplotype.includes(reference[genekey].value)) {
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
              .replace('activity', '')
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
