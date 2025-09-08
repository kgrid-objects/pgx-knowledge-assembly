from cpicrec_tramadol_cyp2d6 import dosingrecommendation

def test_knowledge():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Poor metabolizer'}})
    assert type(result) is dict
    assert result.keys() == {'type', 'drug', 'genes', 'recommendation'}
    assert "Avoid tramadol use because of possibility of diminished analgesia." in result["recommendation"]["content"]    
    assert "Use tramadol label recommended age-specific or weight-specific dosing." in result["recommendation"]["implication"]  

    result = dosingrecommendation({'CYP2D6': { 'phenotype': 'Unknown metabolizer'}})
    assert result == "Incorrect/invalid input for drug Tramadol"

    result = dosingrecommendation({'CYP2D6': {'wrongKey': 'Poor metabolizer'}})
    assert result == "Incorrect/invalid input."