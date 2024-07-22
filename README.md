## Faust2pkgurl


It a CLI-tool that converts a Faust program into using new pkgUrl format given a file that has 
the versions you want it to use

USAGE
  $ faust2pkgurl  FILE [-i] [-o <value>] [-l <value>]

ARGUMENTS
  FILE  Faust file to convert

FLAGS
  -i, --inplace            Modify the file in place
  -l, --libraries=<value>  JSON file with library versions
  -o, --out=<value>        Output file

DESCRIPTION
  It converts a Faust program into using new pkgUrl format.

EXAMPLES
  $ faust2pkgUrl main.dsp

  $ faust2pkgUrl main.dsp -o main_pkg.dsp

  $ faust2pkgUrl main.dsp -i

  $ faust2pkgUrl main.dsp -l libraries.json

