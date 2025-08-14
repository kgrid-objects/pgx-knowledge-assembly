from knowledge_sets import knowledgeSet1Payloads

# def run(inputs):
#     try:
        
#         for f in knowledgeSet1Payloads:
#             print(f(inputs))
#     except Exception as error:
#         return f"Error {error}"

# run({"CYP2D6": "*3/*3"})


from knowledge_sets import knowledgeSet1Payloads, knowledgeSet2Payloads
import asyncio

def run(input_data):
    try:
        # Run all functions in knowledgeSet1Payloads concurrently
        intermediate_results = [f(input_data['diplotype']) for f in knowledgeSet1Payloads]

        merged_results = {}
        for obj in intermediate_results:
            merged_results.update(obj)

        # Run all functions in knowledgeSet2Payloads concurrently
        final_results_ks2 = [f(merged_results) for f in knowledgeSet2Payloads]
        print({
            "intermediate": merged_results,
            "finalKS2": final_results_ks2,
        })
        return {
            "intermediate": merged_results,
            "finalKS2": final_results_ks2,
        }
    except Exception as e:
        print(f"Error: {e}")
        
run({"diplotype": {"CYP2D6": "*3/*3"}})