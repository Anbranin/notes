
Command:
`$ (echo red; echo green 1>&2) | echo blue`

Let's talk about the command.
$ echo red
=> red
$ echo green
=> green
$ (echo red; echo green)
=> red
=> green
`$ 1>$2`
1 - stdout
2 - stderr
1>2 redirect stdout to a file named "2"
1>&2 redirect stdout to file descriptor, in this case stderr
important: The ampersand means "this is a file descriptor and not a file name"

