import fs from 'fs';
function transformCode(filePath, faust_libraries) {
    let code = fs.readFileSync(filePath, 'utf8');
    let pattern = /(import|library)\s*\(\s*["']([^"']*?)["']\s*\)\s*;/g;
    let replacedCode = code.replace(pattern, (match, p1, p2) => {
        p2 = p2.trim();
        let libVersion = faust_libraries[p2];
        if (!libVersion) {
            return match;
        }
        return `${p1}("pkg:faust/faust/${p2}@${libVersion}")`;
    });
    return replacedCode;
}
export default transformCode;
