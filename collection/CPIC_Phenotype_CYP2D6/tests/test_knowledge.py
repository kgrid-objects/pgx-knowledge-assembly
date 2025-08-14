from cpic_phenotype_cyp2d6 import phenotype

def test_knowledge():
    result = phenotype({"CYP2D6": "*3/*3"})
    assert result["CYP2D6"]["phenotype"] == "Poor metabolizer"
    
    result = phenotype({"CYP2C19": "*3/*3"})
    assert result["CYP2D6"]["phenotype"] == "Unknown"
    
    result = phenotype({"CYP2D6": "*3/*3" , "CYP2C19": "*3/*3"})
    assert result["CYP2D6"]["phenotype"] == "Poor metabolizer"
    
    result = phenotype({"CYP2D6": "*1x2/*68"})
    assert result["CYP2D6"]["phenotype"] == "Normal metabolizer"    
    
    result = phenotype({"CYP2D6": "*9/*96"})
    assert result["CYP2D6"]["phenotype"] == "Intermediate metabolizer"       
