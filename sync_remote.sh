#!/bin/sh
echo rsync -r ./wip/ ./remote/fsopen/wip/ --exclude=node_modules --delete
rsync -r ./wip/ ./remote/fsopen/wip/ --exclude=node_modules --delete
