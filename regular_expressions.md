# Egrep
## metacharacters
- `^` match beginning of line `$` match end of line. These are only
  metacharacters outside of a character class.
### Character Classes: []
- `[]` lets you list characters you want to allow at that point in the match.
  For example, `[ea]` lets you match either `e` or `a`.
  `gr[ea]y` will match `grey` or `gray`.
  `[Ss]mith` matches Smith or smith
### Ranges: -
- The character class metacharacter `-` lets you match ranges
  `H<[1-6]>` matches `<h1>` or `<h2>` etc
  `[A-Z]` any single uppercase letter
  `[a-z]` any single lowercase letter.
  Please note that a dash is only a metacharacter _within_ a character class,
  and when it is not the first letter in a character class.
### Negation: ^
- `[^1-6]` matches any character that is NOT 1-6. It negates the list.
  Note that the caret within a character class means something entirely
  different than when it is outside. It is only special when it is immediately
  within a class's opening bracket, not within.
### Match any single character: .
- The dot matches any character, when it is outside of a character class.
  Searching for a date `01.01.17` will include "01.01.17" and "01/01/17".
### Alternation: | "OR"
- `Bob|Robert` matches _either_ "Bob" or "Robert." We can do `gr(e|a)y` like in
  our previous example, using parentheses to *constrain* the alternation.
  Be careful to note that alternation within a constraint is very different
  than matching within a character class. A character class can only match a
  SINGLE character in the target text. With alternation, each alternative
  can be a full-fledged regular expression.
### Case insensitive search
  - egrep has the flag `-i` to search case insensitive. It's not "pure" regex
    but damn it's useful.
