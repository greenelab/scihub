# DOI Coverage of Sci-Hub

This project is investigating the coverage of the Sci-Hub/LibGen for academic articles.
It's based on using DOIs to uniquely identify articles.

## Environment

This repository uses [conda](http://conda.pydata.org/docs/) to manage its environment as specified in [`environment.yml`](environment.yml).
Install the environment with:

```sh
conda env create --file=environment.yml
```

Then use `source activate scihub` and `source deactivate` to activate or deactivate the environment. On windows, use `activate scihub` and `deactivate` instead.

## Acknowledgements

This work is funded in part by the Gordon and Betty Moore Foundation's Data-Driven Discovery Initiative through Grant [GBMF4552](https://www.moore.org/grant-detail?grantId=GBMF4552) to [**@cgreene**](https://github.com/cgreene "Casey Greene on GitHub").
