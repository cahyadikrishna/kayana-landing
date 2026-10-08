#!/usr/bin/env bash
# Regenerates src/app/fonts/Fraunces-{Roman,Italic}.woff2 (issue #22). Not run in CI.
#
# Source: the OFL variable TTFs in google/fonts (ofl/fraunces) at $SOURCE_COMMIT.
# Each one is instanced and subset:
#   wght 100:300  kept variable; type-display / type-title / type-quote use 100, 200, 300
#   opsz 24:144   kept variable over the sizes the site sets (24–100px); next/font/google
#                 can't narrow an axis, only ship 9–144
#   SOFT 0, WONK 0  pinned at their defaults
#   latin         Google Fonts' "latin" unicode-range, all OpenType layout features kept,
#                 all name records kept (so the served files carry the OFL license IDs)
#
# Needs python3, curl and shasum. Pinned fonttools + brotli go into a throwaway venv, not the
# system. Output is reproducible: rerunning with nothing changed gives byte-identical files.
set -euo pipefail

SOURCE_COMMIT=4024282d9b0cffcdb8e3024560862746178d741f
ROMAN_SHA256=177ff6c0f14e5550a3c624247cd1189611d4eb65d000b14944c63d967958abbb
ITALIC_SHA256=b24448c43702fac4ee856781d461a0dfba8d8e594b6e8e190234b75fed2c0e01
AXES=(wght=100:300 opsz=24:144 SOFT=0 WONK=0)
LATIN="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"

# Fixed head.modified timestamp, so an unchanged rerun produces no git diff
export SOURCE_DATE_EPOCH=0

ROOT=$(cd "$(dirname "$0")/../.." && pwd)
OUT=$ROOT/src/app/fonts
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

python3 -m venv "$WORK/venv"
"$WORK/venv/bin/pip" install --quiet fonttools==4.66.1 brotli==1.2.0

BASE=https://raw.githubusercontent.com/google/fonts/$SOURCE_COMMIT/ofl/fraunces
mkdir -p "$OUT"
curl -fsSL "$BASE/OFL.txt" -o "$OUT/OFL.txt"

build() { # <upstream file> <expected sha256> <output name>
  curl -fsSL "$BASE/$(printf %s "$1" | sed 's/\[/%5B/; s/\]/%5D/')" -o "$WORK/src.ttf"
  echo "$2  $WORK/src.ttf" | shasum -a 256 -c --quiet - || { echo "sha256 mismatch for $1" >&2; exit 1; }
  "$WORK/venv/bin/fonttools" varLib.instancer "$WORK/src.ttf" "${AXES[@]}" -o "$WORK/inst.ttf"
  "$WORK/venv/bin/pyftsubset" "$WORK/inst.ttf" --unicodes="$LATIN" --layout-features='*' --name-IDs='*' \
    --flavor=woff2 --output-file="$OUT/$3"
  echo "$3: $(wc -c < "$OUT/$3" | tr -d ' ') bytes"
}

build "Fraunces[SOFT,WONK,opsz,wght].ttf" "$ROMAN_SHA256" Fraunces-Roman.woff2
build "Fraunces-Italic[SOFT,WONK,opsz,wght].ttf" "$ITALIC_SHA256" Fraunces-Italic.woff2
