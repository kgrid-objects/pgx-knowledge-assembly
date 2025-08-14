from cpicrec_codeine_cyp2d6 import dosingrecommendation

def test_knowledge():
    result = dosingrecommendation({'CYP2D6': {'diplotype': '*3/*3', 'phenotype': 'Poor metabolizer'}})
    assert "Avoid codeine use due to lack of efficacy." in result["recommendation"]["content"]    
    assert "Greatly reduced morphine formation following codeine administration" in result["recommendation"]["implication"]  

    result = dosingrecommendation({'CYP2D6': {'diplotype': '*3/*48', 'phenotype': 'Normal metabolizer'}})
    assert result["recommendation"]["content"] == "Use label-recommended age- or weight-specific dosing."  
    assert result["recommendation"]["implication"] == "Normal morphine formation"
       
