# PGx Knowledgebase (PGx-KB)

### What is the PGx-KB?

The PGx-KB is a prototype pharmacogenomics knowledgebase enabling general explorations into knowledgebase construction.

Its formal architecture is an example Knowledge Object (KO) of the **Knowledge Base (KB) type**.

For this work, a **Knowledge Base** is a **distinct type** of KO that has one or more Knowledge Sets and one or more Purposes. (Note: A Knowledge Set is just an appropriately typed unordered list of KOs.) 

In keeping with this definition of a KB, the PGx-KB has the following three Knowledge Sets:

- Knowledge Set 1 (KS1): A list of KOs with implementations of knowledge for mapping genotypes to pharmacogenomic (PGx) phenotypes based on [CPIC guidelines](https://cpicpgx.org/guidelines/). KS1 can be found in the PGx-KB's [metadata file](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/metadata.json). 
- Knowledge Set 2 (KS2): A list of KOs with implementations of knowledge for mapping PGx phenotypes to drug-specific recommendations based on [CPIC guidelines](https://cpicpgx.org/guidelines/). KS2 can be found as an external release [here](https://raw.githubusercontent.com/kgrid-objects/pgx-knowledge-base/refs/tags/1.0/collection/drug_recommendation_knowledge_set/metadata.json).
- Knowledge Set 3 (KS3): A list of KOs with implementations of knowledge for mapping PGx phenotypes to drug-specific recommendations based on [DPWG guidelines](https://www.clinpgx.org/page/dpwg). KS3 can be found in the PGx-KB's [metadata file](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/metadata.json). 

The PGx-KB also has the following two quoted Purposes:

1. "To compute patient specific drug selection and dosing recommendations."
2. "To serve as an example of building a Knowledge Base by adopting and extending the properties and relationships defined for Knowledge Objects." 

These two Purposes meet with the definition of a Purpose for a KB from [NCIT](https://ontobee.org/ontology/NCIT?iri=http://purl.obolibrary.org/obo/NCIT_C25634), which is "what something is used for; reason or intention."   

The PGx-KB meets all of the requirements of a Knowledge Base type of Knowledge Object or "KB-KO." For more information about the formalized Knowledge Objects (KOs) we work with, see the Knowledge Object Implementation Ontology [here at Github](https://github.com/kgrid/koio) and [here at Bioportal](https://bioportal.bioontology.org/ontologies/KOIO).

- - - 

### Who created the PGx-KB?

The PGx-KB is experimental work of the Knowledge Systems Lab (KSL) at the University of Michigan. For more details about our lab, see [KSL @ U-M](https://knowledge-systems.lab.medicine.umich.edu/).

- - - 

### What type of evidence-based computations does the PGx-KB support?

Disclaimer:  The PGx-KB is an experiment in knowledge base construction and NOT intended for production use.  The knowledge in PGx-KB may not be up to date or reliable.

The PGx-KB can be used to compute the following two things in sequence. First, it leverages ____ computable implementations of knowledge to map an individual's genotype information for a group of ____ genes that control the absorption, distribution, metabolism, and excretion of ____ drugs to known pharmacogenomic phenotypes. Second, it leverages computable implementations of knowledge about pharmacogenomic phenotypes to compute drug selection or dosing recommendations based on computed phenotypes. 

For genotype-to-phenotype mapping computations, the Services that come as part of the PGx-KB expect genotype input about an person encoded using diplotypes, like this: 


For phenotype-to-recommendation computations, 

- - - 

### Why was the PGx-KB example KB-KO initially created?

Expanding on its Purposes, the PGx-KB was initially created as an **experiement** in building Knowledge Bases by using and extending formal model for all Knowledge Objects, [KOIO 2.1] (https://github.com/kgrid/koio/releases/tag/2.1).

Several more specific goals met when initially creating the PGx-KB are these:

- The PGx-KB conforms to the KOIO 2.1 specification in all ways except when new terms were needed. The following new terms were developed or adopted from other sources in draft form as part of this work: Knowledge Base, KnowledgeSet, Purpose and hasKnowledgeObject.
- The PGx-KB uses more than one KnowledgeSet.
- The PGx-KB uses both KnowledgeSets defined in its metadata and a KnowledgeSet that is external to its metadata.
- The PGx-KB includes Services that make use of all of the KOs listed in each of its three KnowledgeSets. 

- - - 

### What does a diagram of the PGx-KB's components look like?

The PGx-KB can be depicted in a diagram showing its main components like this:

<img width="1239" height="761" alt="PGx-KB drawing v2" src="https://github.com/user-attachments/assets/c81f0160-9110-4bdb-b24b-ed4cd66e1c29" />

- - - 

### What metadata are provided with the PGx-KB?

The PGx-KB has its own [metadata file](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/metadata.json) with linked metadata in JSON.LD format that conform to KOIO 2.1. Information and links to all of the files included in the PGx-KB can be found in that metadata file.

- - -

### What Services does the PGx-KB include?

The PGx-KB includes three services:

- The Library Service enables application programmers to handle the KOs from PGx-KB as dependencies while treating the PGx-KB like any other JavaScript npm package.
- The API Service wraps the PGx-KB into an app that developers can use to engage the PGx-KB's content through a typical Restful API.
- The Plugin Service enables application programmers to manually load the KOs from the web while treating the PGx-KB like any other JavaScript npm package.

For more details about these three services, including technical instructions, see the [ServiceReadMe](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/ServiceReadMe.md) that comes with the PGx-KB.

- - - 

### What Tests does the PGx-KB include?

The PGx-KB includes two unit tests [here](https://github.com/kgrid-objects/pgx-knowledge-base/tree/main/pgx-kb/tests/unit).

The library-service.test.js file enables a PGx-KB user to test PGx-KB's Library service. The documentation for this test is [here](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/tests/library-service.readme.md).

The plugin-service.test.js file tests the PGx-KB's Plugin service. Its documentation is [here](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/tests/plugin-service.readme.md).

- - -

### What Documentation does the PGx-KB include?

The PGx-KB includes this ReadMe plus the following four other documentation artifacts:

- An Info Page automatically generated from the PGx-KB's own metadata file can be viewed online [here]().
- Docs for describing PGx-KB's two Services are available [here](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/ServiceReadMe.md).
- Docs specifically for the Library Service unit test are [here](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/tests/library-service.readme.md).
- Docs specifically for the Plugin Service unit test are [here](https://github.com/kgrid-objects/pgx-knowledge-base/blob/main/pgx-kb/tests/plugin-service.readme.md). 

- - - 

### What sample Apps are available that make use of the PGx-KB?

Four sample apps that integrate the PGx-KB are available for inspection only. Just like the PGx-KB, these sample apps should **never be used to generate medical advice.** These  apps are  technical samples that exist **only** to show how knowledgebases can come with Services for app developers to use.

All four of these sample apps demonstrate how PGx-KB enables apps to compute phenotypes from genotypes first, and then to compute recommendations based on computed phenotypes.

The four sample apps can be found in this repo's [PGx-Demos folder](https://github.com/kgrid-objects/pgx-knowledge-base/tree/main/pgx-demos). What distinguishes these four sample apps is first the PGx-KB Service they use (Library vs. Plugin) and second whether the Knowledge from PGx-KB gets executed by a client or by a server. 

In addition, the first of these four sample apps - the pgx-demo-library-service-client-side-load app - is available for users to view online in a **test-only**, non-production deployment [here](https://kgrid-objects.github.io/pgx-knowledge-base/). 

The deployed sample app's user interface looks like this:

<img width="1415" height="1074" alt="image" src="https://github.com/user-attachments/assets/88231220-1ed6-4fea-b405-36a249bfd943" />

To see computed phenotypes and recommendations in the deployed sample app, click on any of the five simulated patients or enter diplotype information directly. **Never** use this sample app, or the other sample apps, or the PGx-KB to generate real medical advice. These items are only ever intended as technical demonstrations that illuminate how knowledgebases might be built and managed. 
 

