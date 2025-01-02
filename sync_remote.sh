#!/bin/sh
SRC_DIR="$HOME/work/fsopen/wip/"
DST_DIR="$HOME/work/fsopen/remote/wip/"
RSYNC_CMD="rsync -r ${SRC_DIR} ${DST_DIR} --exclude=node_modules --delete"
echo "$RSYNC_CMD"
$RSYNC_CMD
