from cpicrec_tramadol_cyp2d6 import dosingrecommendation

def test_cyp2d6ultrarapid():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Ultrarapid metabolizer'}})
    assert "Avoid tramadol use because of potential for toxicity." in result["recommendation"]["content"]    
    assert result["recommendation"]["implication"] == "Increased formation of O-desmethyltramadol (active metabolite) leading to higher risk of toxicity" 
    assert result["recommendation"]["classification"] == "Strong"
    
def test_cyp2d6normal():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Normal metabolizer'}})
    assert result["recommendation"]["content"] == "Use tramadol label recommended age-specific or weight-specific dosing."    
    assert result["recommendation"]["implication"] == "Expected O-desmethyltramadol (active metabolite) formation" 
    assert result["recommendation"]["classification"] == "Strong"

def test_cyp2d6intermediate():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Intermediate metabolizer'}})
    assert result["recommendation"]["content"] == "Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid."    
    assert result["recommendation"]["implication"] == "Reduced O-desmethyltramadol (active metabolite) formation" 
    assert result["recommendation"]["classification"] == "Optional"
    
def test_cyp2d6poor():
    result = dosingrecommendation({'CYP2D6': {'phenotype': 'Poor metabolizer'}})
    assert result["recommendation"]["content"] == "Avoid tramadol use because of possibility of diminished analgesia. If opioid use is warranted, consider a non-codeine opioid."
    assert result["recommendation"]["implication"] == "Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid." 
    assert result["recommendation"]["classification"] == "Strong"
    

