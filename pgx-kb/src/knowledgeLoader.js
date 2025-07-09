import path from 'path';
import fs from 'fs/promises';
import jsonld from 'jsonld';
import os from 'os';


async function loadMetadata(filePath) {
    const raw = await fs.readFile(filePath, 'utf-8');
    const compacted = JSON.parse(raw);
    const expanded = await jsonld.expand(compacted);
    return expanded[0];
}

async function loadKnowledgeSet(ks) {
    if (!("https://kgrid.org/koio#hasKnowledgeObject" in ks)) {

        const response = await fetch(ks["@id"]);
        const compacted = await response.json();
        const expanded = await jsonld.expand(compacted);
        ks = expanded[0]
    }

    let ko = ks["https://kgrid.org/koio#hasKnowledgeObject"] || []
    return ko
}

// Load and prepare functions from a knowledge set
async function loadKnowledgeFunctions(knowledgeArray, functionName) {

    const fnList = [];

    for (const [index, ko] of knowledgeArray.entries()) {
        const rawUrl = ko["@id"]
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('/tree/', '/').replace('master', 'refs/heads/KB-implementation2') /// To Do: delete .replace('master','refs/heads/KB-implementation') when loading from master
            + 'metadata.json';
        const response = await fetch(rawUrl);
        const compacted = await response.json();
        const expanded = await jsonld.expand(compacted, {
            expandContext: {
                "@base": rawUrl
            }
        });
        let ko_metadata = expanded[0]

        for (const knowledge of ko_metadata['https://kgrid.org/koio#hasKnowledge']) {
            for (const implementation of knowledge['http://www.ebi.ac.uk/swo/SWO_0000085']) { //implementedBy
                let url = implementation['@id']

                const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-'));
                const fileName = path.basename(url);
                const filePath = path.join(tempDir, fileName);
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch module from ${url}`);
                const jsCode = await response.text();
                await fs.writeFile(filePath, jsCode, 'utf-8');
                const filePathPackage = path.join(tempDir, "package.json");
                await fs.writeFile(filePathPackage, JSON.stringify({ type: "module" }), 'utf-8');

                const module = await import(`file://${filePath}`);

                if (!(functionName in module)) {
                    throw new Error(`Function "${functionName}" not found in ${modulePath}`);
                }
                //fnList.push(module[functionName]);
                knowledgeArray[index]["function"] = module[functionName]
            }
        }
    }

    return knowledgeArray; //fnList
}

export { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet };