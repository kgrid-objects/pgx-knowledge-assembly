const gene = 'SLCO1B1';

const dict = ['TBD', 'Low', 'Intermediate', 'Normal'];

const list = {
  '*1A': 'Normal function',
  '*1B': 'Normal function',
  '*2': 'Possible decreased function',
  '*3': 'Possible decreased function',
  '*4': 'Unknown function/Unclear function',
  '*5': 'Decreased function',
  '*6': 'Possible decreased function',
  '*7': 'Unknown function/Unclear function',
  '*8': 'Unknown function/Unclear function',
  '*9': 'Possible decreased function',
  '*10': 'Possible decreased function',
  '*11': 'Unknown function/Unclear function',
  '*12': 'Unknown function/Unclear function',
  '*13': 'Unknown function/Unclear function',
  '*14': 'Possible increased function',
  '*15': 'Decreased function',
  '*16': 'Unknown function/Unclear function',
  '*17': 'Decreased function',
  '*18': 'Unknown function/Unclear function',
  '*19': 'Unknown function/Unclear function',
  '*20': 'Unknown function/Unclear function',
  '*21': 'Unknown function/Unclear function',
  '*22': 'Unknown function/Unclear function',
  '*23': 'Possible decreased function',
  '*24': 'Unknown function/Unclear function',
  '*25': 'Unknown function/Unclear function',
  '*26': 'Unknown function/Unclear function',
  '*27': 'Unknown function/Unclear function',
  '*28': 'Unknown function/Unclear function',
  '*29': 'Unknown function/Unclear function',
  '*30': 'Unknown function/Unclear function',
  '*31': 'Possible decreased function',
  '*32': 'Unknown function/Unclear function',
  '*33': 'Unknown function/Unclear function',
  '*34': 'Unknown function/Unclear function',
  '*35': 'Possible increased function',
  '*36': 'Unknown function/Unclear function'
};

function phenotype(inputs) {
  const output = {};
  output[gene] = {};
  const alleles = inputs[gene].split('/');
  let count = 0;

  if (
    list[alleles[0]] !== 'Unknown function/Unclear function' &&
    list[alleles[1]] !== 'Unknown function/Unclear function'
  ) {
    alleles.forEach((e) => {
      switch (list[e]) {
        case 'Normal function':
          count += 2;
          break;
        case 'Decreased function':
        case 'Possible decreased function':
        case 'Possible increased function':
          count += 1;
          break;
      }
    });
    count -= 1;
  }

  output[gene].diplotype = inputs[gene];
  output[gene].phenotype = dict[count];
  if (count > 0) {
    output[gene].phenotype += ' function';
  }

  return output;
}

export { phenotype };
