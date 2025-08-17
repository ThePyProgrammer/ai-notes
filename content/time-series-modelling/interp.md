---
title: Time Series Interpretability
---
I've recently gotten quite into the interpretability problem of Time-Series Modelling, i.e. how might I develop a system to interpret the output for a blackbox model $\mathcal{M}$ that is able to classify an input time series $X$?

I recently found [LASTS](LASTS.md), a similar endeavour focused on looking into single-sample based counterfactual analysis. In essence, LASTS provides 3 values:
1. The saliency map, $\Phi = \left| \hat{X} - \hat{X}_{\neq} \right|$
2. The exemplar values $\hat{\mathcal{X}}_=$ and the counterexamplar values $\hat{\mathcal{X}}_{\neq}$
3. The Shapelet Tree Classifier
