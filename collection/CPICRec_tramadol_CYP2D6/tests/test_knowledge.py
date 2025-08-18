from cpicrec_tramadol_cyp2d6 import dosingrecommendation

def test_knowledge():
    result = dosingrecommendation({'CYP2D6': {'diplotype': '*3/*3', 'phenotype': 'Poor metabolizer'}})
    assert "Avoid tramadol use because of possibility of diminished analgesia." in result["recommendation"]["content"]    
    assert "Use tramadol label recommended age-specific or weight-specific dosing." in result["recommendation"]["implication"]  

    result = dosingrecommendation({'CYP2D6': {'diplotype': '*3/*48', 'phenotype': 'Normal metabolizer'}})
    assert result["recommendation"]["content"] == "Use tramadol label recommended age-specific or weight-specific dosing." 
    assert result["recommendation"]["implication"] == "Expected O-desmethyltramadol (active metabolite) formation"
       
