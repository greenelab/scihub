# Sci-Hub's DOI listing

On 2017-03-19, `@Sci_Hub` [tweeted](https://twitter.com/Sci_Hub/status/843546352219017218):

> If you like the list of all DOI collected on Sci-Hub, here it is: http://sci-hub.cc/downloads/doi.7z … 62,835,101 DOI in alphabetical order

[`1.retrieve.ipynb`](1.retrieve.ipynb) downloads and lightly processes this dataset.
The files created by this script are:

+ [`doi.7z`](doi.7z): the unmodified DOI list.
+ [`scihub-doi-list.txt.xz`](scihub-doi-list.txt.xz): a UTF-8 encoded and xz-compressed version of `doi.log` (the sole file in `doi.7z`).


## 2020-07-29 dataset

On 2020-07-29, Sci-Hub [tweeted](https://twitter.com/Sci_Hub/status/1288459386176909313):

> updated Sci-Hub article list of 82,470,219 dois: https://sci-hub.st/downloads/dois.2020.07.29.sorted.clean.txt
>
> Sci-Hu doesn't store articles in mysql database, but uses memory-based storage. That's why Sci-Hub doesn't publish dumps.

We downloaded the dataset with the following commands:

```bash
wget https://sci-hub.st/downloads/dois.2020.07.29.sorted.clean.txt
xz dois.2020.07.29.sorted.clean.txt
```
