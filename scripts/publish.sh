#!/bin/bash
npm version patch
git push
git push --tags
npm publish
# TODO duo?
# TODO upload on jscdn etc
