#!/usr/bin/env bash
set -e

NODE_ENV=production babel src --only "src/components,src/hooks,src/index.ts" --ignore "**/*.stories.tsx" --delete-dir-on-start --extensions '.ts,.tsx,.js,.jsx' --out-dir es
cd src
find components -type f -name "*.css" -exec cp --parents {} ../es \;