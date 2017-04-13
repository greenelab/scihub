# Bohannon & Elbakyan SciHub visitor logs from 2015-09 to 2016-02

This directory downloads the supplementary data from [Who's downloading pirated papers? Everyone](https://doi.org/10.1126/science.352.6285.508).
The data is available at:

> John Bohannon, Alexandra Elbakyan (2016) [Data from: Who's downloading pirated papers? Everyone](https://doi.org/10.5061/dryad.q447c). _Dryad Digital Repository_. DOI: 10.5061/dryad.q447c

Run [`1.combine.ipynb`](1.combine.ipynb) to download, extract, process and combine [`scihub_data.zip`](https://doi.org/10.5061/dryad.q447c/1).
The combined data is exported to [`scihub-logs_2015-09_2016-02.tsv.xz`](scihub-logs_2015-09_2016-02.tsv.xz).
Below are several rows near the start of the table to give you an idea of the data's structure:

| date                | doi                             | IP_code       | country  | city        | latitude   | longitude   |
|---------------------|---------------------------------|---------------|----------|-------------|------------|-------------|
| 2015-09-01 00:00:00 | 10.1007/s10439-013-0829-z       | 56ed2b74a66a1 | Colombia | Medellín    | 6.2530408  | -75.5645737 |
| 2015-09-01 00:00:15 | 10.1016/s0016-5085(12)62098-8   | 56ed2b7057283 |          |             |            |             |
| 2015-09-01 00:00:40 | 10.1007/s40111-013-0013-3       | 56ed2b025af9f | Romania  | Cluj-Napoca | 46.7712101 | 23.6236353  |
| 2015-09-01 00:00:40 | 10.1016/j.marpolbul.2012.08.016 | 56ed2b70e91b5 | Taiwan   |             | 25.0378259 | 121.5212991 |
| 2015-09-01 00:00:41 | 10.1007/s00595-014-1024-z       | 56ed2b0d6ed08 | Egypt    |             | 30.0777469 | 31.2941069  |

Run [`2.summarize.ipynb`](2.summarize.ipynb) to aggregate visits by DOI.
The DOI summaries are exported to [`scihub-logs-summary_2015-09_2016-02.tsv.xz`](scihub-logs-summary_2015-09_2016-02.tsv.xz).
Below are several rows near the start of the table to give you an idea of the data's structure:

| doi                                  | downloads | visitors | countries | days | months |
|--------------------------------------|-----------|----------|-----------|------|--------|
| 10.1001/archderm.1975.01630180068008 | 3         | 3        | 2         | 3    | 2      |
| 10.1001/2013.jamadermatol.541        | 1         | 1        | 1         | 1    | 1      |
| 10.1001/archinte.159.9.941           | 12        | 10       | 9         | 12   | 4      |
| 10.1001/archpedi.1928.01920240011002 | 2         | 2        | 1         | 1    | 1      |
| 10.1001/archotol.127.12.1499         | 1         | 1        | 0         | 1    | 1      |
