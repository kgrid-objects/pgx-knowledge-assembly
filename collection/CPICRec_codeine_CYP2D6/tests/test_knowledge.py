from cpicrec_codeine_cyp2d6 import dosingrecommendation

def test_cyp2d6ultrarapid():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Ultrarapid metabolizer'}})
    assert "Avoid codeine use due to potential for toxicity." in result["recommendation"]["content"]    
    assert result["recommendation"]["implication"] == "Increased formation of morphine following codeine administration, leading to higher risk of toxicity" 
    assert result["recommendation"]["classification"] == "Strong"
    
def test_cyp2d6normal():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Normal metabolizer'}})
    assert result["recommendation"]["content"] == "Use label-recommended age- or weight-specific dosing."    
    assert result["recommendation"]["implication"] == "Normal morphine formation" 
    assert result["recommendation"]["classification"] == "Strong"

def test_cyp2d6intermediate():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Intermediate metabolizer'}})
    assert result["recommendation"]["content"] == "Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid. Monitor tramadol use for response."    
    assert result["recommendation"]["implication"] == "Reduced morphine formation" 
    assert result["recommendation"]["classification"] == "Moderate"
    
def test_cyp2d6poor():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Poor metabolizer'}})
    assert "Avoid codeine use due to lack of efficacy." in result["recommendation"]["content"]    
    assert result["recommendation"]["implication"] == "Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief." 
    assert result["recommendation"]["classification"] == "Strong"
    

