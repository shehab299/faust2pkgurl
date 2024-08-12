import fs from 'node:fs';
function transformCode(filePath, faust_libraries) {
    let code = fs.readFileSync(filePath, 'utf8');
    let pattern = /(import|library)\s*\(\s*["']([^"']*?)["']\s*\)\s*;/g;
    let replacedCode = code.replace(pattern, (match, p1, p2) => {
        p2 = p2.trim();
        if (!faust_libraries[p2]) {
            return match;
        }
        let author = faust_libraries[p2][0];
        let libVersion = faust_libraries[p2][1];
        if (!libVersion || !author) {
            return match;
        }
        return `${p1}("pkg:faust/${author}/${p2}@${libVersion}");`;
    });
    return replacedCode;
}
export default transformCode;
