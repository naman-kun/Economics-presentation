const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/sections/HeroSection.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The block to process is from PHASE 2 to the end of the timeline
const blockStart = content.indexOf('// ── PHASE 2');
const blockEnd = content.indexOf('.to("#hero-pin-container", { opacity: 0, duration: 0.06 }');

if (blockStart === -1 || blockEnd === -1) {
    console.error("Could not find block bounds");
    process.exit(1);
}

// We will replace all occurrences of `, 0.XX)` or `, 0.XXX)` with the value minus 0.15
// But only for values that are >= 0.35 to avoid cutting into Phase 1
const newContentBlock = content.substring(blockStart, blockEnd + 60).replace(/, (\d\.\d+)\)/g, (match, p1) => {
    const val = parseFloat(p1);
    if (val >= 0.35) {
        return `, ${(val - 0.15).toFixed(3).replace(/0+$/, '').replace(/\.$/, '.0')})`;
    }
    return match;
});

const newFullContent = content.substring(0, blockStart) + newContentBlock + content.substring(blockEnd + 60);

fs.writeFileSync(filePath, newFullContent);
console.log("Timeline successfully shifted backwards by 0.15!");
