import {knowledgeSet1, knowledgeSet2, knowledgeSet3} from "./knowledge-sets.js";

async function run(input) {

  try {
    const intermediateResults = await Promise.all(
      knowledgeSet1.map(f => f(input['diplotype']))
    );

    const responseGenes = new Set(intermediateResults.map(obj => Object.keys(obj)[0]));

    // Add missing genes
    for (const gene in input['diplotype']) {
      if (!responseGenes.has(gene)) {
        const value = input['diplotype'][gene];
        if (value) {
          intermediateResults.push({ [gene]: { diplotype: value, phenotype: "" } });
        } else {
          intermediateResults.push({ [gene]: {} });
        }
      }
    }

    const mergedResults = intermediateResults.reduce((acc, obj) => {
      return { ...acc, ...obj };
    }, {});
    const finalResultsKS2 = await Promise.all(
      knowledgeSet2.map(f => f(mergedResults))
    );

    const finalResultsKS3 = await Promise.all(
      knowledgeSet3.map(f => f(mergedResults))
    );
    return {
      intermediate: mergedResults,
      finalKS2: finalResultsKS2,
      finalKS3: finalResultsKS3
    };
  } catch (err) {
    console.error(err);
    return { error: 'Execution failed' };
  }
}


export default { run };