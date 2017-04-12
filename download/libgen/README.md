# Library Genesis Metadata Download

LibGen metadata for scientific articles is available under `scimag_dbbackup` and is currently available from:

+ libgen.io ([recent versions](http://libgen.io/dbdumps/backup_archive/))
+ Internet Archive ([archived versions](https://archive.org/search.php?query=creator%3A%22Library+Genesis%22&sort=-publicdate))

Steps to download and process the LibGen scimag export:

1. Run [`1.download.sh`](1.download.sh) from this directory to download and extract the scimag SQL dump.
Make sure to change the `DATE` variable in the script as needed.

2. Run [`2.run-docker.sh`](2.run-docker.sh) to launch a MySQL Docker.
The container loads the scimag database on startup into a database named `scimag`.
The database is served to `localhost` via port `3306` with username `root` and an empty password.
This docker container must be manually closed by the user when no longer needed.
