#!/usr/bin/env sh
set -eu

if [ ! -d build ] || [ ! -f build/index.html ]; then
  echo "Build output missing. Running npm run build."
  npm run build
  exit 0
fi

# Skip rebuild if nothing relevant changed since build/index.html
changed=false
for path in \
  radar \
  tdr \
  public \
  scripts \
  config.json \
  config-tdr.json \
  about.md \
  about-tdr.md \
  package.json \
  package-lock.json; do
  if [ -e "$path" ] && find "$path" -newer build/index.html -print -quit | grep -q .; then
    changed=true
    break
  fi
done

if [ "$changed" = true ]; then
  echo "Sources changed. Running npm run build."
  npm run build
else
  echo "No source changes since last build. Skipping npm run build."
fi
