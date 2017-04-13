# Exit on errors
set -o errexit

# Download from Sci-Hub
wget --timestamping --no-if-modified-since \
  http://sci-hub.cc/downloads/doi.7z

# Extract doi.7z
7z x doi.7z

# Create scihub-doi-list.txt.xz
iconv \
  --from-code=CP1252 \
  --to-code=UTF-8 \
  doi.log \
  | xz --threads=0 \
  > scihub-doi-list.txt.xz \
  && rm doi.log
