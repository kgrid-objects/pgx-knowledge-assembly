function dosingrecommendation (inputs) {
  try {
    var genes = {}
    var output = {}
    var searchkeyReady = true
    var phenotypesValue = ''
    var lowercaseInput = {}
    var searchKey = ''
    var targetfield =''
    for(var inputkey in inputs){
      var key = inputkey.toLowerCase()
      lowercaseInput[key]=inputs[inputkey]
    }
    for(var genekey in reference) {
      key = genekey.toLowerCase()
      if(!lowercaseInput[key]) {
        break
      }
      genes[genekey]={}
      genes[genekey].diplotype = lowercaseInput[key].diplotype || ''
      genes[genekey].phenotype = lowercaseInput[key].phenotype || ''
      genes[genekey].phenotype = genes[genekey].phenotype.toLowerCase()
      targetfield = reference[genekey].field
      searchkeyReady = searchkeyReady && (genes[genekey][targetfield]!='')
      if(targetfield=='diplotype'){
        if (genes[genekey].diplotype.indexOf(reference[genekey].value) != -1) {
          searchKey = searchKey+genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].positive
        } else {
          searchKey = searchKey+ genekey.toLowerCase()+reference[genekey].value+keysuffix[genekey].negative
        }
      }
      if(targetfield=='phenotype'){
        if (genes[genekey].phenotype != "") {
          searchKey = searchKey+genekey.toLowerCase()+genes[genekey].phenotype.replace('metabolizer','').replace(' ','')
        }
      }
    }
    if (searchkeyReady) {
      if(recommendations[searchKey]!=null){
        output.type='CPIC Recommendation'
        output.drug=drug
        output["genes"] = JSON.parse(JSON.stringify(genes))
        output.recommendation={}
        output.recommendation.implication=recommendations[searchKey].implication
        output.recommendation.content=recommendations[searchKey].recommendation
        output.recommendation.classification=recommendations[searchKey].classification
        return output
      } else {
        return "Incorrect/invalid input for drug " + drug
      }
    }else {
      return "Incorrect/invalid input."
    }
  } catch(error){
    return 'Error: '+ error
  }
}
// KGrid CPIC guidelines CYP2D6 Phenotype to Tramadol Recommendation
var drug = 'tramadol'
var reference = {'CYP2D6':{field:'phenotype', value:''}}
var recommendations = {
  'cyp2d6ultrarapid': {'implication': 'Increased formation of O-desmethyltramadol (active metabolite) leading to higher risk of toxicity',
          'recommendation': 'Avoid tramadol use because of potential for toxicity. If opioid use is warranted, consider a non-codeine opioid.',
          'classification': 'Strong'},
  'cyp2d6normal': {'implication': 'Expected O-desmethyltramadol (active metabolite) formation',
          'recommendation': 'Use tramadol label recommended age-specific or weight-specific dosing.',
          'classification': 'Strong'},
  'cyp2d6intermediate': {'implication': 'Reduced O-desmethyltramadol (active metabolite) formation',
          'recommendation': 'Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid.',
          'classification': 'Optional'},
  'cyp2d6poor': {'implication': 'Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid.',
          'recommendation': 'Avoid tramadol use because of possibility of diminished analgesia. If opioid use is warranted, consider a non-codeine opioid.',
          'classification': 'Strong'}
        }

export { dosingrecommendation };