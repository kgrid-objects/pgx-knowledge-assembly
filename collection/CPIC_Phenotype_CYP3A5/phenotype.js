const gene = 'CYP3A5';

const dict = ['TBD', 'Poor', 'Intermediate', 'Extensive'];

const list = {
  '*1': 'Normal function',
  '*2': 'Unknown/Uncertain function',
  '*3': 'No function',
  '*4': 'Unknown/Uncertain function',
  '*5': 'Unknown/Uncertain function',
  '*6': 'No function',
  '*7': 'No function',
  '*8': 'Unknown/Uncertain function',
  '*9': 'Unknown/Uncertain function'
};

function phenotype(inputs) {
  const output = {};
  output[gene] = {};

  const alleles = inputs[gene].split('/');
  let count = 0;

  if (
    list[alleles[0]] !== 'Unknown/Uncertain function' &&
    list[alleles[1]] !== 'Unknown/Uncertain function'
  ) {
    alleles.forEach((e) => {
      switch (list[e]) {
        case 'Normal function':
          count += 2;
          break;
        case 'No function':
          count += 1;
          break;
      }
    });
    count -= 1;
  }

  output[gene].diplotype = inputs[gene];
  output[gene].phenotype = dict[count];
  if (count > 0) {
    output[gene].phenotype += ' metabolizer';
  }

  return output;
}

export { phenotype };
