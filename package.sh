#!/bin/bash

# A script for packaging extension/ directory!

set -Ee

(

    function _finally {
        printf "\nRemoving package/ ...\n\n"
        # clean up.
        rm -fr $PKG_DIR
    }

    # finally
    trap _finally EXIT

    printf "\nPackaging extension/ ...\n\n"

    WRK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
    PKG_DIR="$WRK_DIR/package"
    JSF_DIR="$PKG_DIR/js"

    printf "Copying extension/ into package/ ...\n\n"

    cp -r "$WRK_DIR/extension" "$WRK_DIR/package"

    printf "Minifying background.js ...\n\n"

    # minifiying `background.js`.
    BACKGROUND="$JSF_DIR/background"
    curl -X POST -s --data-urlencode "input@$BACKGROUND.js" https://javascript-minifier.com/raw >"$BACKGROUND.min.js"

    printf "Minifying content.js ...\n\n"

    # minifiying `content.js`.
    CONTENT="$JSF_DIR/content"
    curl -X POST -s --data-urlencode "input@$CONTENT.js" https://javascript-minifier.com/raw >"$CONTENT.min.js"

    printf "Removing background.js & content.js from package/ ...\n\n"

    # `background.js` & `content.js` are not needed anymore.
    rm -f "$BACKGROUND.js" "$CONTENT.js"

    pushd $PKG_DIR

    printf "\npackage/ directory structure:\n"
    tree .
    printf "\n"

    printf "Zipping package/ into extension.zip\n\n"
    zip -r "../extension.zip" *
    printf "\n"

    popd
)
