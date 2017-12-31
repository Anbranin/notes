# Egrep
## metacharacters
`^` match beginning of line
`$` match end of line
## Character Classes
- `[]` lets you list characters you want to allow at that point in the match.
  For example, `[ea]` lets you match either `e` or `a`.
  `gr[ea]y` will match `grey` or `gray`.
  `[Ss]mith` matches Smith or smith
- The character class metacharacter `-` lets you match ranges
  `H<[1-6]>` matches `<h1>` or `<h2>` etc
  `[A-Z]` any single uppercase letter
  `[a-z]` any single lowercase letter

