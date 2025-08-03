---
title: Time-Series Modelling
---
I've recently gotten quite into the interpretability problem of Time-Series Modelling, i.e. how might I develop a system to interpret the output for a blackbox model $\mathcal{M}: x \rightarrow y$ that is able to classify an input time series $x$?

I recently found [LASTS](LASTS.md), a similar endeavour focused on looking into single-sample based counterfactual analysis. In essence, LASTS provides 3 values:
1. The saliency map, $\Phi = \left| \hat{x} - \hat{x}_{\neq} \right|$
2. The exemplar values $\hat{X}_=$ and the counterexamplar values $\hat{X}_{\neq}$
3. The Shapelet Tree Classifier
