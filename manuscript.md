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
[Crossref](https://www.crossref.org/) is a DOI Registration Agency (an entity capable of assigning DOIs) for scholarly publishing [@doi:10.6087/kcse.2014.1.13].
There are presently 10 Registration Agencies.
We [estimate](https://github.com/greenelab/crossref/issues/3) that Crossref has registered 67% of all DOIs.
While several Registration Agencies assign DOIs to scholarly content, Crossref is the preeminent registrar amongst journal publications.
In March 2015, of the 1,464,818 valid DOI links on the English Wikipedia, 99.9% were registered with Crossref [@doi:10.1007/978-3-319-49304-6_40].
This percentage was slightly lower for other languages — 99.8% on the Chinese Wikipedia and 98.0% on the Japanese Wikipedia.
Hence, the overwhelming majority of DOI-referenced scholarly content is registered with Crossref.
Since Crossref has the most comprehensive and featureful programmatic access, there was a strong incentive to focus solely on Crossref-registered DOIs.
Given Crossref's preeminence, the omission of other Registration Agencies is unlikely to severely influence our findings. 

We queried the `works` endpoint of the [Crossref API](https://api.crossref.org/) to retrieve the metadata for all DOIs, storing the responses in a MongoDB database.
The queries began on March 21, 2017 and took 12 days to complete.
In total, we retrieved metadata for 87,542,370 DOIs corresponding to all Crossref works as of March 21, 2017.
The source code for this step is available on GitHub at [`greenelab/crossref`](https://github.com/greenelab/crossref).
Due to its large file size (7.4 GB), the MongoDB database export of DOI metadata is not available on GitHub and instead hosted via figshare [@doi:10.6084/m9.figshare.4816720.v1].
We created TSV files with the minimal information needed for this study.
First, a DOI table with columns for work type and date issued.
Date issued refers to the earliest known publication date, i.e. the date of print or online publication, whichever occurred first.
Second, a mapping of DOI to ISSN for associating articles with their journal of publication.

We [selected](https://github.com/greenelab/scihub/issues/7) a subset of Crossref work types to include in our Sci-Hub coverage analyses that corresponded to scholarly publications.
The following types were included: `book-chapter`, `book-part`, `book-section`, `journal-article`, `proceedings-article`, `reference-entry`, `report`, `standard`.
Types such as `book`, `journal`, `journal-issue`, and `report-series` were excluded since they're generally containers for individual publications rather than scholarly publications themselves.
Since we couldn't locate definitions for the Crossref types, we used our best judgment and evaluated sample works of a given type in the case of uncertainty.
After filtering by type, 81,609,016 DOIs remained.
For the purposes of this study, these DOIs represent the entirety of the scholarly literature.

### Scopus

Prior to June 2017, the Crossref API had an [issue](https://github.com/CrossRef/rest-api-doc/issues/179) that prevented exhaustively downloading journal metadata.
Therefore, we instead relied on the [Scopus](https://www.scopus.com) database to catalog scholarly journals.
Scopus uses "title" to refer to all of the following: peer-reviewed journals, trade journals, book series, and conference proceedings.
For this study, we refer to all of these types as journals.
From the January 2017 data release of Scopus titles, we extracted metadata for 62,482 titles including title name, ISSNs, subject areas, open access status, and active status.
Furthermore, we tidied the Scopus Journal Metrics, which evaluate titles based on the number of citations their articles receive.
Specifically, we extracted a 2015 CiteScore for 22,256 titles.
Finally, we queried the Elsevier API to [retrieve](https://github.com/dhimmel/journalmetrics/issues/2) homepage URLs for 20,442 Scopus titles.
See [`dhimmel/journalmetrics`](https://github.com/dhimmel/journalmetrics) for the source code and data relating to Scopus.

### LibGen scimag

We downloaded the LibGen scimag metadata database from April 7, 2017 as a SQL dump.
We [imported](https://github.com/greenelab/scihub/issues/2) the SQL dump into MySQL, and then exported the scimag table to a TSV file.
Each row of this table corresponds to a publication in LibGen, as identified by its DOI.
The `TimeAdded` field represents indicates when the publication was uploaded to LibGen.
After removing records missing date added, 64,195,940 DOIs remained.
56,205,763 (87.6%) of the DOIs were in our Crossref-derived catalog of scholarly literature.
The 12.4% of LibGen scimag DOIs missing from our Crossref catalog, likely consist of incorrect DOIs, DOIs whose metadata availability postdates our Crossref export, DOIs from other Registration Agencies, and DOIs for excluded work types.

Next, we explored the cumulative size of LibGen scimag over time according to the `TimeAdded` field.
However, when we [compared](https://github.com/greenelab/scihub/issues/8#issuecomment-296710357) our plot to one generated from the LibGen scimag database SQL dump on January 5, 2014 [@doi:10.1002/asi.23445], we noticed a major discrepancy.
The earlier analysis identified a total of 22,829,088 DOIs, whereas we found only 234,504 DOIs added on or before January 5, 2014.
We hypothesize that the discrepancy arose since `DateAdded` may indicate the date modified rather than created.
Specifically, when a document in the database is changed, the database record for that DOI is entirely replaced.
Hence, the `DateAdded` value is effectively overwritten upon every update to a record.
Unfortunately, many research questions require the date first added.
For example, lag-time analyses (the time from study publication to LibGen upload) may be unreliable.
Therefore, we don't report on these findings in this manuscript.
In addition, findings from some previous studies may need to be reconsidered.
For example, Cabanac writes:

> The growth of LibGen suggests that it has benefited from a few isolated, but massive, additions of scientific articles to its cache. For instance, 71% of the article collection was uploaded in 13 days at a rate of 100,000+ articles a day. It is likely that such massive collections of articles result from biblioleaks [@doi:10.2196/jmir.3331], but one can only speculate about this because of the undocumented source of each file cached at LibGen.

While we agree this is most likely the case, confirmation is needed to rule out the possibility that bulk metadata updates created the appearance of biblioleaks from previously incremental additions. 


### Sci-Hub DOIs


### Sci-Hub request logs

