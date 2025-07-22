
import fs from 'fs/promises';
import jsonld from 'jsonld';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';


async function loadMetadata(filePath) {
    let compacted;
    if (!isNode()) {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch metadata from ${filePath}`);
        }
        compacted = await response.json();
    } else {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const raw = await fs.readFile(path.join(path.join(__dirname, '..'), 'metadata.json'), 'utf-8');
        compacted = JSON.parse(raw);
    }
    const expanded = await jsonld.expand(compacted);
    return expanded[0];
}

async function loadKnowledgeSet(ks) {
    let knowledgeSet=[];
    if ('@id' in ks["https://kgrid.org/koio#hasKnowledgeObject"][0] ) {
                return ks["https://kgrid.org/koio#hasKnowledgeObject"] 
    }
    else{
        for (let i = 0; i < ks["https://kgrid.org/koio#hasKnowledgeObject"].length; i++) {
            let response = await fetch(ks["https://kgrid.org/koio#hasKnowledgeObject"][i]["@value"]);
            const compacted = await response.json();
            knowledgeSet.push(...compacted)
        }
        return knowledgeSet
    }


}

// Load and prepare functions from a knowledge set
async function loadKnowledgeFunctions(knowledgeArray, functionName) {

    const fnList = [];

    for (const [index, ko] of knowledgeArray.entries()) {
        const rawUrl = ko["@id"]
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('/tree/', '/').replace('master', 'refs/heads/KB-implementation') /// To Do: delete .replace('master','refs/heads/KB-implementation') when loading from master
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

                const response = await fetch(url);
                if (!response.ok) throw new Error(`Failed to fetch module from ${url}`);
                const jsCode = await response.text();
                let module;
                if (isNode()) {

                    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'kb-'));
                    const fileName = path.basename(url);
                    const filePath = path.join(tempDir, fileName);
                    await fs.writeFile(filePath, jsCode, 'utf-8');
                    const filePathPackage = path.join(tempDir, "package.json");
                    await fs.writeFile(filePathPackage, JSON.stringify({ type: "module" }), 'utf-8');
                    module = await import(`file://${filePath}`);

                } else {
                    const blob = new Blob([jsCode], { type: 'application/javascript' });
                    const blobUrl = URL.createObjectURL(blob);
                    module = await import(blobUrl);
                }


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

function isUrl(path) {
    try {
        new URL(path);
        return true;
    } catch {
        return false;
    }
}

function isNode() {
    return (
        typeof process !== 'undefined' &&
        process.versions != null &&
        process.versions.node != null
    );
}

export { loadKnowledgeFunctions, loadMetadata, loadKnowledgeSet };