# Exit on errors
set -o errexit

# Date of scimag backup
DATE=2017-04-07

# Download LibGen science magazine metadata from libgen.io
wget --timestamping \
  --directory-prefix=mysql \
  http://libgen.io/dbdumps/backup_archive/scimag_dbbackup-$DATE.rar

# Extract from the rar
# WARNING: unrar is non-free software
unrar -ierr p mysql/scimag_dbbackup-$DATE.rar backup_scimag.sql \
  > mysql/backup_scimag_$DATE.sql

# Track SQL with Git LFS using a highly-compressed and free format
xz --keep mysql/backup_scimag_$DATE.sql
