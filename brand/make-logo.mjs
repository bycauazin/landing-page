// Gera a logo bycauazin (modelo adesivo) com as cores de um projeto.
// Uso: node brand/make-logo.mjs --contorno "#E4F0F6" --fita "#0B2E43" --interior "#FF4F31" --out public/logo.svg [--quadrado]
// --quadrado: viewBox quadrado com a fita centralizada (ícone de aba / favicon).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const get = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const colors = { CONTORNO: get("contorno"), FITA: get("fita"), INTERIOR: get("interior") };
const out = get("out");
if (!out || Object.values(colors).some((c) => !c)) {
  console.error('Uso: node brand/make-logo.mjs --contorno "#..." --fita "#..." --interior "#..." --out arquivo.svg [--quadrado]');
  process.exit(1);
}

let svg = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "logo-template.svg"), "utf8");
for (const [key, value] of Object.entries(colors)) svg = svg.replaceAll(`{{${key}}}`, value);
svg = svg.replace(/\n\s*<!--[\s\S]*?-->/, "");
if (args.includes("--quadrado")) svg = svg.replace('viewBox="636 130 826 1760" width="826" height="1760"', 'viewBox="169 130 1760 1760" width="64" height="64"');
writeFileSync(out, svg);
console.log(`logo gerada: ${out}`);
