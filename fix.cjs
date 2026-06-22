const fs = require('fs');
const file = 'src/routes/_app.saved.index.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/useState<any\[\]>/g, 'useState<Record<string, unknown>[]>');
content = content.replace(/\(list: any\[\],/g, '(list: Record<string, unknown>[],');
content = content.replace(
  /\(acc: any, part: string\) => acc && acc\[part\]/,
  '(acc: unknown, part: string) => acc && typeof acc === "object" ? (acc as Record<string, unknown>)[part] : undefined'
);

content = content.replace(/bps: any\[\]/g, 'bps: Record<string, unknown>[]');
content = content.replace(/ports: any\[\]/g, 'ports: Record<string, unknown>[]');
content = content.replace(/bks: any\[\]/g, 'bks: Record<string, unknown>[]');
content = content.replace(/preps: any\[\]/g, 'preps: Record<string, unknown>[]');

content = content.replace(/as any/g, 'as Record<string, unknown>');

content = content.replace(/catch \(err: Record<string, unknown>\) \{/g, 'catch (err: unknown) {');
content = content.replace(/err\.message/g, '(err as Error).message');

content = content.replace(/icon: Record<string, unknown>;/g, 'icon: React.ElementType;');

content = content.replace(/const loadAllSaved = async \(\) => \{/, 'const loadAllSaved = React.useCallback(async () => {');
content = content.replace(/    \} finally \{\r?\n      setLoading\(false\);\r?\n    \}\r?\n  \};/m, '    } finally {\n      setLoading(false);\n    }\n  }, [user]);');
content = content.replace(/useEffect\(\(\) => \{\r?\n    loadAllSaved\(\);\r?\n  \}, \[user\]\);/m, 'useEffect(() => {\n    loadAllSaved();\n  }, [loadAllSaved]);');

if (!content.includes('import React')) {
    content = content.replace(/import \{ useEffect, useState \} from "react";/, 'import React, { useEffect, useState } from "react";');
}

fs.writeFileSync(file, content, 'utf8');
