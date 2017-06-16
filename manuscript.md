# Sci-Hub's remarkable coverage of the scientific literature

This is a working draft of the manuscript for this study.
It's written in markdown and currently uses the [referencing format](https://github.com/greenelab/deep-review/blob/master/CONTRIBUTING.md#markdown) from the Deep Review.

## Introduction

Here are some relevant existing studies.

+ [@doi:10.1002/asi.23445]
+ [@doi:10.1126/science.352.6285.508]
+ [@url:https://hdl.handle.net/10760/30981]
+ [@doi:10.12688/f1000research.11366.1]
+ [@doi:10.15200/winn.146485.57797]

Comment with additional references [here](https://github.com/greenelab/scihub/issues/3).

## Coverage by article type

![](https://cdn.rawgit.com/greenelab/scihub/5fafb048a8608bdeabd31c8ecbccac7f394e3244/figure/coverage-by-type.svg)

## Coverage over time

![](https://cdn.rawgit.com/greenelab/scihub/5fafb048a8608bdeabd31c8ecbccac7f394e3244/figure/coverage-by-year.svg)

## Coverage by Journal

The following table shows Sci-Hub's coverage for the ten journals with the most articles.

| Journal | Sci-Hub | Crossref | Coverage |
|-------|--------|----------|----------|
| The Lancet | 457,650 | 458,580 | 99.80% |
| Nature | 385,619 | 399,273 | 96.58% |
| BMJ (Clinical research ed.) | 17,141 | 392,277 | 4.37% |
| Lecture Notes in Computer Science | 103,675 | 356,323 | 29.10% |
| Science | 230,649 | 251,083 | 91.86% |
| JAMA - Journal of the American Medical Association | 191,950 | 248,369 | 77.28% |
| Journal of the American Chemical Society | 189,142 | 189,567 | 99.78% |
| Scientific American | 22,600 | 186,473 | 12.12% |
| New England Journal of Medicine | 180,321 | 180,467 | 99.92% |
| PLoS ONE | 4,731 | 177,260 | 2.67% |

![](https://cdn.rawgit.com/greenelab/scihub/5fafb048a8608bdeabd31c8ecbccac7f394e3244/figure/coverage.svg)

## Coverage by Publisher

![](https://cdn.rawgit.com/greenelab/scihub/5fafb048a8608bdeabd31c8ecbccac7f394e3244/figure/coverage-by-publisher.svg)

### Journal/Publisher Coverage Distribution

![](https://cdn.rawgit.com/greenelab/scihub/5fafb048a8608bdeabd31c8ecbccac7f394e3244/figure/coverage-distributions.svg)


## Sci-Hub request fulfillment rate

Sci-Hub fulfilled 99.26% of valid requests between 2015-09 and 2016-02.
The fulfillment rates are near 100% for all article types besides book chapters.
Users that requested book chapters received access 82% of the time.
See `3.scihub-access-rates.ipynb` and https://git.io/v9i5F.

## Methods

### Digital Object Identifiers

We used DOIs (Digital Object Identifiers) to uniquely identify scientific articles.
LibGen scimag and Sci-Hub also uniquely identify documents by their DOIs, making DOIs the natural primary key for our analyses.
The DOI initiative began in 1997, and the first DOIs were registered in 2000 [@10.1000/182 @10.1016/j.serrev.2007.05.006].
Note that DOIs can be registered retroactively.
For example, Antony van Leewenhoeck's discovery of protists and bacteria — published in 1677 by _Philosophical Transactions of the Royal Society of London_ — has a DOI [@doi:10.1098/rstl.1677.0003].
While this letter was published long before the DOI system existed, the _Royal Society_ retroactively assigned a DOI in 2006.

Not all scientific publications have DOIs.
By evaluating the presence of DOIs in other databases of scientific literature (such as PubMed, Web of Science, and Scopus), researchers estimate around 90% of newly published articles in the sciences have DOIs [@doi:10.1016/j.joi.2015.11.008 @doi:10.1007/s11192-016-2225-6].
The prevalence of DOIs varies by discipline and country of publication, with DOI assignment in newly published Arts & Humanities around 60% [@doi:10.1016/j.joi.2015.11.008].
Indeed, DOI registration is almost entirely lacking for publishers from many Eastern European countries [@doi:10.1007/s11192-016-2225-6].
In addition, the prevalence of DOI assignment is likely lower for older articles [@doi:10.1007/s11192-016-2225-6].
The incomplete and non-random assignment of DOIs to scholarly publications is a limitation of this study.
However, DOIs are presumably the least imperfect and most widespread identifier for scholarly content. 

An often overlooked aspect of the DOI system is that DOIs are case-insensitive within the ASCII character range [@10.1000/182 @10.3403/30177056].
In other words, `10.7717/peerj.705` refers to the same study as `10.7717/PeerJ.705`.
Accordingly, DOIs make a poor standard identifier unless they're consistently cased.
While the DOI handbook states that "all DOI names are converted to upper case upon registration" [@10.1000/182], we lowercased DOIs in accordance with Crossref's behavior.
Given the danger of incongruous DOIs, we lowercased DOIs for each input resource at the earliest opportunity in its processing pipeline.
Consistent casing [considerably influenced](https://github.com/greenelab/scihub/issues/9) our findings as different resources used different casings of the same DOI.

### Crossref

To catalog all scholarly publications, we relied on the Crossref database.
[Crossref](https://www.crossref.org/) is a DOI Registration Agency for scholarly publishing [@doi:10.6087/kcse.2014.1.13].
There are presently 10 entities capable of assigning DOIs called DOI Registration Agencies.
We [estimate](https://github.com/greenelab/crossref/issues/3) that Crossref has registered 67% of all DOIs.
While several Registration Agencies assign DOIs to scholarly content, Crossref is the preeminent registrar amongst journal publications.
In March 2015, of the 1,464,818 valid DOI links on the English Wikipedia, 99.9% were registered with Crossref [@doi:10.1007/978-3-319-49304-6_40].
This percentage was slightly lower for other languages — 99.8% for the Chinese Wikipedia and 98.0% for the Japanese Wikipedia.
Hence, the overwhelming majority of DOI-referenced scholarly content is registered with Crossref.
Since Crossref has the most comprehensive and featureful programmatic access, there was a strong incentive to focus solely on Crossref-registered DOIs.
Given Crossref's preeminence, the omission of other Registration Agencies is unlikely to severely influence our findings. 

[`greenelab/crossref`](https://github.com/greenelab/crossref)
[@doi:10.6084/m9.figshare.4816720.v1]
