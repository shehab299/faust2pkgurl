import fs from 'fs';


function transformCode(filePath, faust_libraries) : string {
    
    let code = fs.readFileSync(filePath, 'utf8');        
    let pattern = /(import|library)\s*\(\s*["']([^"']*?)["']\s*\)\s*;/g;
        
    let replacedCode = code.replace(pattern, (match, p1, p2) => {
        
        p2 = p2.trim();

        if(!faust_libraries[p2]){
            return match;
        }

        let author: string = faust_libraries[p1][0];
        let libVersion: string = faust_libraries[p2][1];


        if(!libVersion || !author){
            return match;
        }

        return `${p1}("pkg:faust/${author}/${p2}@${libVersion}");`;
    });

    return replacedCode;
}


export default transformCode;


