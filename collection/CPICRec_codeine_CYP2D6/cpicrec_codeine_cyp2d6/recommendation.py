import copy

drug = "Codeine"
reference = {"CYP2D6": {"field": "phenotype", "value": ""}}
keysuffix = {"CYP2D6": {"positive": "", "negative": ""}}  # adjust if needed
recommendations = {
    "cyp2d6ultrarapid": {
        "implication": "Increased formation of morphine following codeine administration, leading to higher risk of toxicity",
        "recommendation": "Avoid codeine use due to potential for toxicity. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity",
        "classification": "Strong",
    },
    "cyp2d6normal": {
        "implication": "Normal morphine formation",
        "recommendation": "Use label-recommended age- or weight-specific dosing.",
        "classification": "Strong",
    },
    "cyp2d6intermediate": {
        "implication": "Reduced morphine formation",
        "recommendation": "Use label-recommended age- or weight-specific dosing. If no response, consider alternative analgesics such as morphine or a nonopioid. Monitor tramadol use for response.",
        "classification": "Moderate",
    },
    "cyp2d6poor": {
        "implication": "Greatly reduced morphine formation following codeine administration, leading to insufficient pain relief.",
        "recommendation": "Avoid codeine use due to lack of efficacy. Alternatives that are not affected by this CYP2D6 phenotype include morphine and nonopioid analgesics. Tramadol and, to a lesser extent, hydrocodone and oxycodone are not good alternatives because their metabolism is affected by CYP2D6 activity; these agents should be avoided",
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

