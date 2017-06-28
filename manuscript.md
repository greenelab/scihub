# Sci-Hub's remarkable coverage of the scholarly literature

This is a working draft of the manuscript for this study.
It's written in markdown and currently uses the [referencing format](https://github.com/greenelab/deep-review/blob/master/CONTRIBUTING.md#markdown) from the Deep Review.

## Abstract

The website Sci-Hub provides access to scholarly literature via full text PDF downloads.
The site enables users to access scholarly articles that would otherwise be paywalled.
Since its creation in 2011, Sci-Hub has grown rapidly in popularity.
However, until now, the extent of Sci-Hub's coverage of scholarly literature was unclear.
As of March 2017, we find that Sci-Hub provides access to 68.9% of all 81.6 million scholarly articles.
If only considering articles in closed access journals, Sci-Hub's coverage increases to 85.2%.
Furthermore, Sci-Hub provides access to 77.0% of the 5.2 million articles published by currently inactive journals.
Coverage varies by discipline, with 92.8% coverage of articles in chemistry journals compared to 76.3% for computer science.
Coverage also varies by publisher, with the coverage of the largest publisher, Elsevier, at 97.3%.
Our interactive browser at [greenelab.github.io/scihub](https://greenelab.github.io/scihub) allows users to explore these findings in more detail.
Finally, we estimate that over a six month period in 2015–2016, Sci-Hub provided access for 99.3% of valid incoming requests.
Hence, the sustainability of the subscription publishing model is dubious.
For the first time, the overwhelming majority of scholarly literature is available gratis for anyone to download.

## Introduction

Historical problems related to access to scholarly literature.

What is Sci-Hub?

History of Sci-Hub. Paragraphs for the

+ mechanics of the service
+ history of LibGen
+ motivations of Alexandra Elbakyan
+ popular awareness and press coverage
+ legal proceedings
+ previous studies of Sci-Hub / LibGen coverage & usage

Here are some relevant existing studies.

+ [@doi:10.1002/asi.23445]
+ [@doi:10.1126/science.352.6285.508]
+ [@url:https://hdl.handle.net/10760/30981]
+ [@doi:10.12688/f1000research.11366.1]
+ [@doi:10.15200/winn.146485.57797]

Media coverage:

+ [@url:http://bigthink.com/neurobonkers/a-pirate-bay-for-science]
+ [@doi:10.1038/nature.2016.19841]

Comment with additional references [here](https://github.com/greenelab/scihub/issues/3).

## Results

To define the extent of the scholarly literature, we relied on DOIs from the Crossref database, as downloaded on March 21, 2017.
We define the scholarly literature as 81,609,016 texts identified by their DOIs.
We refer to these texts as "articles", although a diverse compilation of text types are encompassed, including for example book chapters, front matters, and standards.

To assess the articles available from Sci-Hub, we relied on a list of DOIs released by Sci-Hub on March 19, 2017.
Sci-Hub's offerings included 56,246,220 articles from the corpus of scholarly literature, equating to 68.9% of all articles.
Each article in Crossref's database is assigned a type.
Figure XX shows coverage by article type:

![Sci-Hub coverage by Crossref type](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/coverage-by-type.svg)

The literature consists primarily of journal articles, for which Sci-Hub had 77.8% coverage.
Sci-Hub's coverage was also strong for the 5 million proceedings articles at 79.7%.
Overall coverage suffered from the 10 million book chapters where coverage was poor (14.2%).
The remaining Crossref types were uncommon, and hence contributed little to overall coverage.

### Coverage by year

Next, we investigated coverage based on the year an article was published.
For most years since 1850, annual coverage is between 60–80%.
However, there's a dropoff in coverage, starting in 2010, for recently published articles.
For example, coverage for 2016 articles was XX.
One factor is likely that it takes some time for an article to be uploaded to LibGen following its publication.
Another, albeit purely speculative, factor could be that some journals are just deploying anti-piracy measures, making recent articles less accessible.

![Sci-Hub coverage by year](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/coverage-by-year.svg)

### Coverage by Journal

We defined a comprehensive set of scholarly publishing venues, referred to as "journals", extracted from the Scopus database.
In reality, these venues include conferences with proceedings as well as book series.
For inclusion in this analysis, a venue required an ISSN and at least one article as part of the scholarly literature.
Accordingly, our catalog of journals consisted of 22,193 publishing venues encompassing 57,074,208 articles.
Of these journals, 4,345 were inactive (19.6%, no longer publishing articles), and 2,650 were open access (11.9%).
Only two journals were inactive and also open access.

We calculated Sci-Hub's coverage for each of the 22,193 journals. The following table shows coverage for the ten journals with the most articles.

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

The complete journal coverage results are available in our [Sci-Hub Stats Browser](https://greenelab.github.io/scihub/#/).
In general, a journal's coverage was either nearly complete or nearly entirely absent (Figure XX).
As a result, relatively few journals had coverage between 5–75%.

![Sci-Hub journal/publisher coverage distributions](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/coverage-distributions.svg)

At the extremes, 2,342 journals had zero coverage, whereas 2,067 had perfect coverage.
Of zero-coverage journals, 22.3% were inactive, and 27.2% were open access.
Of perfect-coverage journals, 80.3% were inactive, and 1.9% were open access.
Hence, inactive subscription journals make up the bulk of perfect-coverage journals.

Next we explored article coverage according to journal attributes (Figure XX).
Sci-Hub covered 83.4% of the 57,074,208 articles that were attributable to a journal.
Articles from inactive journals had slightly lower coverage than active journals (77.0% versus 84.3%).
Strikingly, coverage was substantially higher for articles from subscription journals than open access journals (85.2% versus 49.1%).
Coverage did vary by subject area, with the highest coverage in chemistry at 92.8% and the lowest coverage in computer science at 76.3%.
Accordingly, no major disciplines were vastly uncovered.

![Sci-Hub coverage by journal attribute](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/coverage.svg)

We evaluated whether journal coverage varied by journal impact.
We assessed journal impact using the 2015 CiteScore, which measures the average number of citations articles published in 2012–2014 received during 2015.
Highly-cited journals tended to have higher coverage in Sci-Hub (Figure XXA).
The 1,730 least cited journals (lowest decile) had 40.9% coverage on average, whereas the 1,729 most cited journals (top decile) averaged 90.3% coverage.

### Coverage by Publisher

Next, we evaluated coverage by publisher (Figure XX).
The largest publisher was Elsevier, with 13,185,971 articles from 3,356 journals.
Sci-Hub covered 97.3% of Elsevier articles.
For the eight publishers who reached the million article milestone, the following coverage was observed:
97.3% of Elsevier,
89.4% of Springer Nature,
94.8% of Wiley-Blackwell,
96.2% of Taylor & Francis,
79.2% of Wolters Kluwer,
98.8% of American Chemical Society,
95.3% of SAGE, and
84.9% of Oxford University Press.
In total, 4,879 publishers were represented in the journal catalog.
The coverage distribution amongst publishers resembled the journal coverage distribution, with most publishers occupying the extremities (Figure XX).
Sci-Hub had zero coverage for 1,206 publishers and complete coverage for 323 publishers.

![Sci-Hub coverage by publisher](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/coverage-by-publisher.svg)

### Sci-Hub Request Logs

Sci-Hub released article request records from its server logs covering 165 days from September 2015 through February 2016 [@doi:10.1126/science.352.6285.508 @doi:10.1126/science.aaf5664 @doi:10.5061/dryad.q447c/1].
We filtered for valid requests by restricting to DOIs in our literature catalog and omitting requests that occurred before the article's publication date.
Accordingly, we identified 26,984,851 valid requests for 10,116,937 distinct articles.
Hence on average, Sci-Hub received approximately 164,000 valid requests per day in late 2014 / early 2015.

### Sci-Hub request fulfillment rate

The logs do not indicate whether a request was fulfilled.
However, we can estimate fulfillment rates by assuming that articles currently in Sci-Hub's database were available in the past, at the time of request.
Accordingly, we estimate that Sci-Hub fulfilled 99.3% of valid requests during this period.
The estimated fulfillment rates were nearly 100% for all article types besides book chapters.
Users that requested book chapters received access 82.1% of the time.
In total, only 141,466 articles were requested that are not presently in Sci-Hub.
Of these inaccessible articles, 14,154 [were](https://github.com/greenelab/scihub/issues/5#issuecomment-298952622) book chapters from _Lecture Notes in Computer Science_.

We computed journal-level metrics based on average article requests.
The "visitors" metric assesses the average number of IP addresses that requested each article published by a journal during the 20 months proceeding September 2015 (the log's start date).
In aggregate, articles from closed access journals average 1.30 visitors, whereas articles from open access journals averaged 0.27 visitors.
Figure XXB shows that articles from highly cited journals were on average much more frequently visited.
Articles in the least cited closed access journals averaged almost zero visitors compared to approximately 15 visitors for the most cited journals.
In addition, Figure XXB shows that Sci-Hub visitors are many times more frequent for articles in closed versus open access journals, even after accounting for journal impact.

![Sci-Hub Coverage & Visitors versus Journal's 2015 CiteScore](https://cdn.rawgit.com/greenelab/scihub/8d81188368939b4636ba348b3af871559ab7685e/figure/citescore.svg)

## Discussion

Sci-Hub provides access to nearly all requests.
Sci-Hub used to circumvent paywalls.

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
Specifically, we extracted a 2015 CiteScore for 22,256 titles, 17,295 of which were included in our journal catalog.
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
In addition, findings from some previous studies may need additional scrutiny.
For example, Cabanac writes [@doi:10.1002/asi.23445]:

> The growth of LibGen suggests that it has benefited from a few isolated, but massive, additions of scientific articles to its cache.
For instance, 71% of the article collection was uploaded in 13 days at a rate of 100,000+ articles a day.
It is likely that such massive collections of articles result from biblioleaks [@doi:10.2196/jmir.3331], but one can only speculate about this because of the undocumented source of each file cached at LibGen.

While we agree this is most likely the case, confirmation is needed that the bulk addition of articles does not just correspond to bulk updates rather than bulk initial uploads.

### Sci-Hub DOIs

On March 19, 2017, Sci-Hub [tweeted](https://twitter.com/Sci_Hub/status/843546352219017218):

> If you like the list of all DOI collected on Sci-Hub, here it is … 62,835,101 DOI in alphabetical order

The Tweet included a download link for a file with the 62,835,101 DOIs that Sci-Hub claims to provide access to.
Of these DOIs, 56,246,220 were part of the Crossref-derived catalog of scholarly texts.
99.5% of the DOIs from Sci-Hub's list were in the LibGen scimag DOIs (after filtering).
Based on existing descriptions of Sci-Hub's infrastructure, these corpuses should be identical.
Essentially, Sci-Hub is a layer on top of the LibGen scimag database.
On Twitter, the Sci-Hub account [commented](https://twitter.com/Sci_Hub/status/844165613203480576) "with a small differences, yes the database is the same".
Therefore, we proceeded under the assumption that the LibGen scimag and Sci-Hub corpurses are synonymous.

### Sci-Hub request logs

The 2016 study titled "Who's downloading pirated papers? Everyone" analyzed a dataset of Sci-Hub request logs [@doi:10.1126/science.352.6285.508 @doi:10.1126/science.aaf5664].
Alexandra Elbakyan worked with journalist John Bohannon to produce a dataset of download requests received by Sci-Hub from September 1, 2015 through February 29, 2016 [@doi:10.5061/dryad.q447c/1].
In November 2015, Sci-Hub's domain name [was suspended](https://torrentfreak.com/sci-hub-and-libgen-resurface-after-being-shut-down-151121/) as the result legal action by Elsevier [@doi:10.1038/nature.2015.18876].
According to Bohannon, this resulted in "an 18-day gap in the data starting November 4, 2015 when the domain sci-hub.org went down and the server logs were improperly configured."
Of the 10,552,418 distinct DOIs in the request logs, 10,293,836 (97.5%) were part of the Crossref-derived catalog of scholarly texts.
Bohannon notes [@doi:10.5061/dryad.q447c/2]: "some DOIs are invalid, due to typos from the Sci-Hub users or … because a website listed the wrong DOI."

We summarized the requests for each text using the following metrics:

1. downloads: total number of requests
2. visitors: number of IP addresses that requested the text
3. countries: number of countries (geolocation by IP address) that requested the text
4. days: number of days the text was requested
5. months: number of months the text was requested

Next, we calculated journal-level request metrics based on articles published from January 1, 2014 up until the start of the Sci-Hub request log records on September 1, 2015.
For each journal, we calculated the average values for the five request log metrics described above.
Interestingly, the journal [_Medicine - Programa de Formación Médica Continuada Acreditado_](http://www.sciencedirect.com/science/journal/03045412) received the most visitors per articles, averaging 33.4 visitors for each of its 326 articles.
