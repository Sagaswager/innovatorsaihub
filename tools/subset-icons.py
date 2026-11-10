#!/usr/bin/env python3
"""Subset Material Symbols Outlined to only the icons the site actually renders.

Why this is not just `pyftsubset --text=...`: Material Symbols draws an icon from
the *text* of its span (`<span class="material-symbols-outlined">check</span>`),
via the `rlig` ligature feature — letters c,h,e,c,k -> the `check` glyph. Any
text-based subset drags in every ligature that starts with those letters, which
is nearly the whole 6,670-glyph font (Google's own `text=` endpoint returns
4.0 MB, marginally *larger* than the original). So we subset by glyph name with
the layout tables dropped, then rebuild a minimal `rlig` with exactly one
ligature per icon we use.

Run: python3 tools/subset-icons.py <full.woff2> <out.woff2> <icon1> <icon2> ...
"""
import sys
from fontTools.ttLib import TTFont
from fontTools import subset
from fontTools.ttLib.tables import otTables as ot
from fontTools.ttLib.tables._g_l_y_f import Glyph

src, dst, icons = sys.argv[1], sys.argv[2], sys.argv[3:]
letters = sorted({c for i in icons for c in i})
# '_' is a character; its glyph is named 'underscore' in this font.
glyph_of = {'_': 'underscore'}
keep = ['.notdef', 'space'] + icons + [glyph_of.get(c, c) for c in letters]

# 1) drop layout tables entirely and subset by glyph name (no ligature closure)
f = TTFont(src)
for table in ('GSUB', 'GPOS', 'GDEF'):
    if table in f:
        del f[table]
tmp = '/tmp/_icons_nolayout.ttf'
f.save(tmp)

args = [tmp, f'--glyphs={",".join(keep)}', '--no-layout-closure',
        '--layout-features=', '--notdef-outline', '--name-IDs=*',
        '--recalc-bounds', '--glyph-names', '--drop-tables+=DSIG', f'--output-file=/tmp/_icons_min.ttf']
subset.main(args)

# 2) rebuild just the ligatures we need: <letters> -> <icon glyph>.
# feaLib builds the GSUB tables correctly (one ligature set per first glyph);
# assembling ot.Lookup by hand gets the FeatureRecord structure wrong.
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString

f = TTFont('/tmp/_icons_min.ttf')
go = set(f.getGlyphOrder())
missing = [i for i in icons if i not in go]
if missing:
    sys.exit(f'subsetter dropped icon glyphs: {missing}')

def gname(c):
    return 'underscore' if c == '_' else c

rules = []
for name in sorted(icons):
    comps = [gname(c) for c in name]
    bad = [c for c in comps if c not in go]
    if bad:
        sys.exit(f'missing letter glyph for {name}: {bad}')
    rules.append(f'    sub {" ".join(comps)} by {name};')

fea = 'feature rlig {\n' + '\n'.join(rules) + '\n} rlig;\n'
addOpenTypeFeaturesFromString(f, fea)
f.save('/tmp/_icons_lig.ttf')

# 3) write woff2
f2 = TTFont('/tmp/_icons_lig.ttf')
f2.flavor = 'woff2'
f2.save(dst)
print(f'wrote {dst}: {len(icons)} icons, {len(f2.getGlyphOrder())} glyphs')
