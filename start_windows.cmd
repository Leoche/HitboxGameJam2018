#!/bin/sh
echo "Starting game on http://127.168.0.0:8080/ ..."
xdg-open http://127.168.0.0:8080
./server/mongoose_linux -document_root ../
