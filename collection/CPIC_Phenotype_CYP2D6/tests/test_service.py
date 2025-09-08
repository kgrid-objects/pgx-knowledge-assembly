from cpic_phenotype_cyp2d6 import phenotype


def test_service_for_IO_format_and_content():
    result = phenotype({"CYP2D6": "*3/*3"})
    assert type(result) is dict
    assert result.keys() == {'CYP2D6'}
    assert result['CYP2D6'].keys() == {'diplotype', 'phenotype'}
    
    assert result["CYP2D6"]["phenotype"] == "Poor metabolizer"
    assert result["CYP2D6"]["diplotype"] == "*3/*3"

    
