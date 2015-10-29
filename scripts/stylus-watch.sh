#!/bin/sh

stylus -w -u nib -u jeet --include-css examples/$1/index.styl -o dist/$1.index.css
