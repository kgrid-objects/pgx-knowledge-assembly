from cpicrec_codeine_cyp2d6 import dosingrecommendation

def test_service_for_IO_format_and_content():
    result = dosingrecommendation({'CYP2D6': { 'phenotype': 'Poor metabolizer'}})
    assert type(result) is dict
    assert result.keys() == {'type', 'drug', 'genes', 'recommendation'}
    assert "Avoid codeine use due to lack of efficacy." in result["recommendation"]["content"]    
    assert "Greatly reduced morphine formation following codeine administration" in result["recommendation"]["implication"]  

    result = dosingrecommendation({'CYP2D6': { 'phenotype': 'Unknown metabolizer'}})
    assert result == "Incorrect/invalid input for drug Codeine"

    result = dosingrecommendation({'CYP2D6': {'wrongKey': 'Poor metabolizer'}})
    assert result == "Incorrect/invalid input."
       
