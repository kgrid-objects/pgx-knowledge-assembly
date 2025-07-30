# PGx Knowledgebase (PGx-KB)

### What is the PGx-KB?

The PGx-KB is a prototype pharmacogenomics knowledgebase enabling general explorations into knowledgebase construction.

Its formal architecture is an example Knowledge Object (KO) of the **Knowledge Base (KB) type**.

For this work, a **Knowledge Base** is a **distinct type** of KO that has one or more Knowledge Sets and one or more Purposes. (Note: A Knowledge Set is just an appropriately typed unordered list of KOs.) 

In keeping with this definition of a KB, the PGx-KB has the following three Knowledge Sets:

- Knowledge Set 1: A list of KOs with implementations of knowledge for mapping genotypes to pharmacogenomic (PGx) phenotypes based on [CPIC guidelines](https://cpicpgx.org/guidelines/).
- Knowledge Set 2: A list of KOs with implementations of knowledge for mapping PGx phenotypes to drug-specific recommendations based on [CPIC guidelines](https://cpicpgx.org/guidelines/).
- Knowledge Set 3: A list of KOs with implementations of knowledge for mapping PGx phenotypes to drug-specific recommendations based on [DPWG guidelines](https://www.clinpgx.org/page/dpwg).

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

<img width="719" height="488" alt="image" src="https://github.com/user-attachments/assets/3730a817-6156-46a6-8b5d-249a23f1ec1d" />

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

The PGx-KB

- - -

### What Documentation does the PGx-KB include?

The PGx-KB

- - - 

### What sample Apps are available that make use of the PGx-KB?

The following apps are available

 

