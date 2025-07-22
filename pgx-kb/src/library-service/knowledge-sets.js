import * as cpicPhenotypeCYP2C9 from 'cpic-phenotype-cyp2c9';
import * as cpicPhenotypeCYP2C19 from 'cpic-phenotype-cyp2c19';

import * as cpicRecAbacavirHLAB from 'cpicrec-abacavir_hla-b';
import * as cpicRecAllopurinolHLAB from 'cpicrec-allopurinol_hla-b';

import * as dpwgRecAmitriptylineCYP2C19 from 'dpwgrec-amitriptyline_cyp2c19';
import * as dpwgRecClomipramineCYP2C19 from 'dpwgrec-clomipramine_cyp2c19';


let knowledgeSet1Payloads = [];
let knowledgeSet2Payloads = [];
let knowledgeSet3Payloads = [];

knowledgeSet1Payloads.push(cpicPhenotypeCYP2C9.phenotype);
knowledgeSet1Payloads.push(cpicPhenotypeCYP2C19.phenotype);

knowledgeSet2Payloads.push(cpicRecAbacavirHLAB.dosingrecommendation);
knowledgeSet2Payloads.push(cpicRecAllopurinolHLAB.dosingrecommendation);

knowledgeSet3Payloads.push(dpwgRecAmitriptylineCYP2C19.dosingrecommendation);
knowledgeSet3Payloads.push(dpwgRecClomipramineCYP2C19.dosingrecommendation);


export { knowledgeSet1Payloads, knowledgeSet2Payloads , knowledgeSet3Payloads };