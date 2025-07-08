// KGrid CPIC guidelines HLA genes to Carbamazepine Recommendation

const drug = 'carbamazepine';

const reference = {
  'HLA-A': { field: 'diplotype', value: '31:01' },
  'HLA-B': { field: 'diplotype', value: '15:02' }
};

const keysuffix = {
  'HLA-A': { negative: 'negative', positive: 'positive' },
  'HLA-B': { negative: 'negative', positive: 'positive' }
};

const recommendations = {
  'hla-a31:01negativehla-b15:02negative': {
    implication: 'Normal risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis, drug reaction with eosinophilia and systemic symptoms, and maculopapular exanthema',
    recommendation: 'Use carbamazepine per standard dosing guidelines.',
    classification: 'Strong'
  },
  'hla-a31:01positivehla-b15:02negative': {
    implication: 'Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis, drug reaction with eosinophilia and systemic symptoms, and maculopapular exanthema',
    recommendation: 'Strong: If patient is carbamazepine-naïve and alternative agents are available, do not use carbamazepine. Optional: If patient is carbamazepine-naïve and alternative agents are not available, consider the use of carbamazepine with increased frequency of clinical monitoring. Discontinue therapy at first evidence of a cutaneous adverse reaction. Optional: The latency period for cutaneous adverse drug reactions is variable depending on phenotype; however, all usually occur within three months of regular dosing. Therefore, if the patient has previously used carbamazepine consistently for longer than three months without incidence of cutaneous adverse reactions, cautiously consider use of carbamazepine.',
    classification: 'Strong/Optional/Optional'
  },
  'hla-a31:01negativehla-b15:02positive': {
    implication: 'Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis',
    recommendation: 'Strong: If patient is carbamazepine-naïve, do not use carbamazepine. Optional: The latency period for drug-induced Stevens-Johnson syndrome/toxic epidermal necrolysis is short with continuous dosing and adherence to therapy (4-28 days), and cases usually occur within three months of dosing; therefore, if the patient has previously used carbamazepine consistently for longer than three months without incidence of cutaneous adverse reactions, cautiously consider use of carbamazepine in the future.',
    classification: 'Strong/Optional'
  },
  'hla-a31:01positivehla-b15:02positive': {
    implication: 'Greater risk of carbamazepine-induced Stevens-Johnson syndrome/toxic epidermal necrolysis',
    recommendation: 'Strong: If patient is carbamazepine-naïve, do not use carbamazepine. Optional: The latency period for drug-induced Stevens-Johnson syndrome/toxic epidermal necrolysis is short with continuous dosing and adherence to therapy (4-28 days), and cases usually occur within three months of dosing; therefore, if the patient has previously used carbamazepine consistently for longer than three months without incidence of cutaneous adverse reactions, cautiously consider use of carbamazepine in the future.',
    classification: 'Strong/Optional'
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
