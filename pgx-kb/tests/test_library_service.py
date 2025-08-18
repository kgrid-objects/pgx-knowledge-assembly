from pgx_kb import library_service
input = {
    "patient": {
    "name": "Hank Hill",
    "id": "1"
    },
    "diplotype": {
    "CYP2D6": "*3/*3"
    },
    "prescriptions": "codeine"
}

def test_service():
    
    result = library_service.run(input)
    assert 'intermediate' in result
    assert 'CYP2D6' in result['intermediate']
    assert 'CYP2C9' not in result['intermediate']
    assert result['intermediate']['CYP2D6']['phenotype'] == 'Poor metabolizer'
    assert 'finalKS2' in result
    assert next((item for item in result["finalKS2"] if item["drug"] == "Codeine"), None)
    assert not next((item for item in result["finalKS2"] if item["drug"] == "abacavir"), None)
    assert next((item for item in result["finalKS2"] if item["drug"] == "Codeine"), None)
    assert next((item for item in result["finalKS2"] if item["drug"] == "Codeine"), None)["recommendation"]["implication"] == 'Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief.'




# });