# Exit on errors
set -o errexit

# Date of scimag backup
DATE=`jq '.date' configuration.json`
echo "$DATE"

# Download LibGen science magazine metadata from libgen.io
wget --timestamping \
  --directory-prefix=sql \
  http://libgen.io/dbdumps/backup_archive/scimag_dbbackup-$DATE.rar

# Extract from the rar
# WARNING: unrar is non-free software
unrar -ierr p sql/scimag_dbbackup-$DATE.rar backup_scimag.sql \
  > sql/backup_scimag_$DATE.sql

# Compress SQL file using a free format
# Use extreme 9 to reduce file size as much as possible
xz \
  --extreme -9 \
  --threads=0 \
  --keep \
  sql/backup_scimag_$DATE.sql
