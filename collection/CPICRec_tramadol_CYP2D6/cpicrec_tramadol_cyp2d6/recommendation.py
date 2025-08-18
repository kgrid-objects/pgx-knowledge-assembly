import copy

drug = "Tramadol"
reference = {"CYP2D6": {"field": "phenotype", "value": ""}}
keysuffix = {"CYP2D6": {"positive": "", "negative": ""}}  # adjust if needed
recommendations = {
    "cyp2d6ultrarapid": {
        "implication": "Increased formation of O-desmethyltramadol (active metabolite) leading to higher risk of toxicity",
        "recommendation": "Avoid tramadol use because of potential for toxicity. If opioid use is warranted, consider a non-codeine opioid.",
        "classification": "Strong",
    },
    "cyp2d6normal": {
        "implication": "Expected O-desmethyltramadol (active metabolite) formation",
        "recommendation": "Use tramadol label recommended age-specific or weight-specific dosing.",
        "classification": "Strong",
    },
    "cyp2d6intermediate": {
        "implication": "Reduced O-desmethyltramadol (active metabolite) formation",
        "recommendation": "Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid.",
        "classification": "Optional",
    },
    "cyp2d6poor": {
        "implication": "Use tramadol label recommended age-specific or weight-specific dosing. If no response and opioid use is warranted, consider non-codeine opioid.",
        "recommendation": "Avoid tramadol use because of possibility of diminished analgesia. If opioid use is warranted, consider a non-codeine opioid.",
        "classification": "Strong",
    },
}


def dosingrecommendation(inputs):
    try:
        genes = {}
        output = {}
        searchkey_ready = True
        lowercase_input = {}
        search_key = ""

        # convert input keys to lowercase
        for inputkey, value in inputs.items():
            lowercase_input[inputkey.lower()] = value

        for genekey, ref in reference.items():
            key = genekey.lower()
            if key not in lowercase_input:
                break

            genes[genekey] = {}
            genes[genekey]["diplotype"] = lowercase_input[key].get("diplotype", "")
            genes[genekey]["phenotype"] = lowercase_input[key].get("phenotype", "").lower()

            targetfield = ref["field"]
            searchkey_ready = searchkey_ready and genes[genekey].get(targetfield, "") != ""

            if targetfield == "diplotype":
                if ref["value"] in genes[genekey]["diplotype"]:
                    search_key += key + ref["value"] + keysuffix[genekey]["positive"]
                else:
                    search_key += key + ref["value"] + keysuffix[genekey]["negative"]

            if targetfield == "phenotype":
                if genes[genekey]["phenotype"] != "":
                    pheno = genes[genekey]["phenotype"].replace("metabolizer", "").replace(" ", "")
                    search_key += key + pheno

        if searchkey_ready:
            if search_key in recommendations:
                output["type"] = "CPIC Recommendation"
                output["drug"] = drug
                output["genes"] = copy.deepcopy(genes)
                rec = recommendations[search_key]
                output["recommendation"] = {
                    "implication": rec["implication"],
                    "content": rec["recommendation"],
                    "classification": rec["classification"],
                }
                return output
            else:
                return f"Incorrect/invalid input for drug {drug}"
        else:
            return "Incorrect/invalid input."

    except Exception as error:
        return f"Error: {error}"

