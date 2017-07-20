# Analyses for the Sci-Hub Coverage Study

This project investigates the coverage of scholarly literature in the Sci-Hub and LibGen scimag repositories.
It's based on using DOIs to uniquely identify articles.
For more information, see the corresponding study:

> Himmelstein DS, Romero AR, McLaughlin SR, Greshake Tzovaras B, Greene CS. (2017) [**Sci-Hub provides access to nearly all scholarly literature**](https://doi.org/b9s5). _PeerJ Preprints_ DOI: 10.7287/peerj.preprints.3100

The manuscript for this study is continuously built at [`greenelab/scihub-manuscript`](https://github.com/greenelab/scihub-manuscript) with the latest version available at https://greenelab.github.io/scihub-manuscript/..

## Repository structure

The [`webapp`](webapp) directory creates the [Sci-Hub Stats Browser](https://greenelab.github.io/scihub/#/), which is exported to `docs` and hosted via GitHub Pages.

## Environment

This repository uses [conda](http://conda.pydata.org/docs/) to manage its environment as specified in [`environment.yml`](environment.yml).
Install the environment with:

```sh
conda env create --file=environment.yml
```

Then use `source activate scihub` and `source deactivate` to activate or deactivate the environment. On windows, use `activate scihub` and `deactivate` instead.

## Code Review

The Greene Lab has a [code review policy](http://greenelab-onboarding.readthedocs.io/en/latest/coding_and_software.html).
However, this repository has not undergone code review by the lab.
This notice will be removed once the repository has been reviewed.

## Acknowledgements

This work is funded in part by the Gordon and Betty Moore Foundation's Data-Driven Discovery Initiative through Grant [GBMF4552](https://www.moore.org/grant-detail?grantId=GBMF4552) to [**@cgreene**](https://github.com/cgreene "Casey Greene on GitHub").
