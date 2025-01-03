#!/bin/bash
LOCAL_DIR="$HOME/work/fsopen/wip/"
REMOTE_DIR="$HOME/work/fsopen/remote/wip/" 

if [ $# -lt 1 ]; then
    echo usage "$0 remote|local"
    exit 0
fi
if [ "$1" != 'remote' ] && [ "$1" != 'local' ]; then
    echo usage "$0 remote|local"
    exit 0
fi

if [ "$1" = 'remote' ] ; then
RSYNC_CMD="rsync -r ${LOCAL_DIR} ${REMOTE_DIR} --exclude=node_modules  --exclude=dist --exclude=build --exclude=package-lock.json --delete"
else
RSYNC_CMD="rsync -r ${REMOTE_DIR} ${LOCAL_DIR} --exclude=node_modules --exclude=dist --exclude=build --exclude=package-lock.json"
fi

echo "$RSYNC_CMD"
$RSYNC_CMD
