For a cheatsheet, please go [here](https://www.cheatography.com/davechild/cheat-sheets/regular-expressions/)
# grep -E
- Basic usage: $grep -E 'expression' file
- Note the SINGLE QUOTES (that was a headache to find out)
## metacharacters
### Lines: ^ $
  - `^` match beginning of line `$` match end of line.
  - They only mean this outside of a character class
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
  - only a metacharacter within a character class when it is _not_ the first character.
### Negation: ^
  - `[^1-6]` matches any character that is NOT 1-6. It negates the list.
  Note that the caret within a character class means something entirely
  different than when it is outside.
  - Common Gotcha: A negated character class is not "match unless there is the thing",
  it means "match anything that is not the thing". The difference is subtle.
  - only carries this meaning within a character class when it is the first character.
  - outside of a character class matches the beginning of line.
### Match any single character: .
  - The dot matches any _single_ character
  Searching for a date `01.01.17` will include "01.01.17" and "01/01/17".
  - Only meaningful _outside_ of a character class.
### Alternation: | "OR"
  - `Bob|Robert` matches _either_ "Bob" or "Robert." We can do `gr(e|a)y` like in
  our previous example, using parentheses to *constrain* the alternation.
  Be careful to note that alternation within a constraint is very different
  than matching within a character class. A character class can only match a
  SINGLE character in the target text. With alternation, each alternative
  can be a full-fledged regular expression.
### Case insensitive search
  - grep has the flag `-i` to search case insensitive. It's not "pure" regex
  but damn it's useful.
### Word Boundaries: <>
  - What you can use for word boundary matching depends on your particular flavor of regex.
  - some support the `\<` start of word and `\>` end of word
  metacharacters. `\<cat\>` finds "cat" as a word, not as part of "cathartic", for example.
  - Some flavors have the catchall `\b` metacharacter instead.
  - You could construct your own based on the
  fact that "Start of word" simply means "Place where an alphanumeric set of characters starts" and
  "end of word" means the opposite.
### Optional Items: ?
  - `?` is a *quantifier*
  - Say we wanted to match "color." Sometimes it's spelled "colour". We can use the optional `?` to match either of them.
  `/colou?r/` Would do it. It will match "color" but can also match "colour" but not "colon". The `?` will _only_ match
  the immediately preceeding item, meaning:
  - We can also use grouping `()` in this case. We can match either "four" or "fourth" in this way: `four(th)?`
### Repetition: + *
  - `+` and `*` are also *quantifiers*
  - `+` means "Match one or more of the immediately preceeding item." Will fail if no matches are found.
  - `*` means "Match zero or more of the immediately preceeding item." Will never fail.
  - These are only metacharacters outside of a character class.
### Interval Quantifier: {min,max}
  - Some versions of egrep support interval quantifiers, allowing you to specify your own minimum and maxiumum
  quantifier (how many instances of a character we are allowed to see). For example:
  `[a-zA-Z]{1,5}` will match a US stock ticker (from 1 to 5 letters). Note that `{0,1}` is the same as `?`
### Backreferencing: \1 \2 \3 etc
  - Some version of egrep and some other tools support backreferencing when using `()`.
  Backreferencing is using the metacharacter `\1` or `\2` or whatever to "remember" whatever
  expression came in the parentheses before. For example, to find double words:
  ```
  ([A-Za-z]+) +\1
  ```
  The `\1` refers to the set before it. It will find double words in this way. Note: To prevent
  finding sets like "the theory" you must use either the word boundary: `\<([A-Za-z]+) +\1\>` or
  a DIY word-boundary operator. Think maybe like `[ \?] space or end-of-line is what I was going for.
  You should try it out and get back to me.
  
  You can use more than one reference placeholder, as well. Want to find repetitions of a word then
  some numbers? (no spaces)
  ```
  ([A-Za-z]+)([0-9]+)\1\2
  ```
  Pairs of parentheses are numbered by counting open parentheses from the left.
  
  Please note: if your flavor considers each line in isolation, it won't be able to find repetitions spanning lines.
### Escape Character: \
  - If you're trying to find a literal character that's used as a metacharacter, you need to escape it.
  For example, if you wanted to find a literal `?` in your text, rather than using it to indicate an optional item,
  you'd need to _escape_ it first. So, looking for all questions in your text? use `[A-Za-z]+\?`
  You can do this with all metacharacters, but *not* within a character class. Want to find a word within parentheses?
  use `\([A-Za-z]\)`.
  - only a metacharacter NOT within a character class.
### Common Examples
  - Variable names: `[A-Za-z_][a-zA-Z_0-9]*` Of course, this will find every word.
  - A string within double quotes: `"[^"]*"` That's a very simple solution eh? You _could_ write something that allows double
  quotes if they are escaped with a backslash. That's more complex. We'll get to it later?
  - Dollar amount (with optional cents): `\$[0-9]+(.[0-9]{0,2})?`
## Terms
  - Regex: pronounced with a hard g
  - Matching: You don't match words, you match characters
  - Flavor: Like a dialect. Different tools can use the same flavor or different flavors, so don't get those terms confused
  - Character: The value of a byte is the same across any context. However, the character that that value represents is
  entirely a matter of interpretation, or _encoding_.
# Perl
  Developed in the late 80's, the concepts of text handling/regex are derived from sed and awk. Use: Text handling,
  web-related processing.
  Example code:
  ```
  $celsius = 30;
  $fahrenheit = ($celsius * 9 / 5) + 32;
  print "$celsius C is $fahrenheit F.\n"
  ```
  this returns "30 C is 86 F \n"
  Could also write something with control flow:
  ```
  $celsius = 20;
  while ($celsius <= 45)
  {
    $fahrenheit = ($celsius * 9 / 5) + 32;
    print "$celsius C is $fahrenheit F.\n"
    $celsius = $celsius + 5
  }
  ```
  I think in the above example you could put the fahrenheit calculation outside of the while loop to make it faster.
  Can save this file and run it like so:
  `$ perl -w file_name`.
  The -w is not necessary, but it tells perl to check your syntax and issue warnings about what it finds.
## Perl and regular expressions
  Simplest way: Check if a variable holds some text.
  ```
  if ($reply =~ m/^[0-9]+$/) {
    print "Only digits here\n"
  } else {
    print "Not only digits!"
  }
  ```
  the `/m` tells Perl "Regular expression match"
  the slashes `//` denote the expression itself.
  the `=~` links `/m` with the string to be searched (the variable $reply in this case)
  Operators:
  - `=~` -- links a regex search with a target string
  - `=` -- variable assignment
  - `==` -- checks equality between numbers
  - `eq` -- checks equality between strings
