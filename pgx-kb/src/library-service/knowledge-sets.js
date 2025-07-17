import * as cpicPhenotypeCYP2C9 from 'cpic-phenotype-cyp2c9';
import * as cpicPhenotypeCYP2C19 from 'cpic-phenotype-cyp2c19';

import * as cpicRecAbacavirHLAB from 'cpicrec-abacavir_hla-b';
import * as cpicRecAllopurinolHLAB from 'cpicrec-allopurinol_hla-b';

import * as dpwgRecAmitriptylineCYP2C19 from 'dpwgrec-amitriptyline_cyp2c19';
import * as dpwgRecClomipramineCYP2C19 from 'dpwgrec-clomipramine_cyp2c19';


let knowledgeSet1 = [];
let knowledgeSet2 = [];
let knowledgeSet3 = [];

knowledgeSet1.push(cpicPhenotypeCYP2C9.phenotype);
knowledgeSet1.push(cpicPhenotypeCYP2C19.phenotype);

knowledgeSet2.push(cpicRecAbacavirHLAB.dosingrecommendation);
knowledgeSet2.push(cpicRecAllopurinolHLAB.dosingrecommendation);

knowledgeSet3.push(dpwgRecAmitriptylineCYP2C19.dosingrecommendation);
knowledgeSet3.push(dpwgRecClomipramineCYP2C19.dosingrecommendation);


export { knowledgeSet1, knowledgeSet2, knowledgeSet3 };