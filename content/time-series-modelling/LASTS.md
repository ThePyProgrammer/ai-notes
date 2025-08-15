---
title: LASTS
---
LASTS is a method to interpret the result of classification by a blackbox model $\mathcal{M}$, where $\hat{y} = \mathcal{M}(X)$. Here, $X$ is a time series sample, and $\hat{\mathbf{y}}$ is a specific class that the model is trying to classify.

## The Variational Autoencoder
LASTS uses a variational autoencoder (VAE) comprised of a encoder $E: X \rightarrow \mathbf{z}$ and decoder $D : \mathbf{z} \rightarrow \hat{X}$. Here $z$ is effectively a "latent space" representation of $X$, and $\hat{X}$ is an approximation made by the decoder $D$ for $X$. This model $M: X \rightarrow \hat{X}$ minimizes the loss function $\mathcal{L} = (X - \hat{X})^2$ in order to ensure limited difference between $X$ and $\hat{X}$ while finding a good value set for $\mathbf{z}$.

The usability of $\mathbf{z}$ is that in condenses $X$ into a very simple vector. For example, LASTS uses a latent space of just **two** dimensions with an input sequence of 128 time series values.

## Counterfactual Search (CFS)
Once I have $\mathbf{z}$, LASTS uses a **neighbourhood generation (NG)** method to sample values very close to the $\mathbf{z}$ value. Think of this as a circle / sphere / $n$-th dimensional circular object being drawn around the point $\mathbf{z}$ in the environment, and taking random values from that object. This neighbourhood $Z$ is then put through the decoder $D$ to give a set of values $\mathcal{X}$ which is then put through the blackbox $\mathcal{M}$ to get a set of values $\mathbf{y}$. If any of these values differ from the original label $y$, we take note of them as **counterfactuals**, stored in a database $Z_{\neq}$, and the threshold value for this object is halved. They do this again and again until NO **counterfactuals** are newly found. After this, all data in $Z_{\neq}$ is assessed against $\mathbf{z}$ via a distance metric to find the closest value $\mathbf{z}_{\neq}$ to $\mathbf{z}$, which is considered the closest counterfactual found by this **counterfactual search (CFS)** algorithm.

## The Saliency Map, $\Phi$
Once I have $\mathbf{z}_{\neq}$, I am able to then put this value through the decoder $D$ to provide me a value $\hat{X}_{\neq}$, which is effectively the closest similar sample to $\hat{X}$ that is of a **different class**. This allows me to find specific features within the signal that likely caused the classification different. The scale of how much each timestep contributes to the class is known as a **saliency map**, $\Phi$, which can be computed very simply via

$$
\Phi = \| \hat{X} - \hat{X}_{\neq} \|
$$

The larger the differences are, the larger the saliency map reading at that timestamp.

## Neighbourhood Generation (NG)
Next, LASTS uses another neigbourhood generation (NG) method, but this time around $\mathbf{z}_{\neq}$. The rationale for this is that
1. Values around $\mathbf{z}_{\neq}$ are right around the decision boundary. This means that the likelihood of there being similarly classified or differently classified samples within a small radius is very high.
2. Values around $\mathbf{z}$ are likely to be similarly classified due to it possibly being very far away from the decision boundary.

This NG provides a new neighbourhood $Z$, which I am then able to put through the decoder $D$ in order to provide me with a "neighbourhood" $\hat{\mathcal{X}}$. I can then use the model $\mathcal{M}$ to classify the equivalent $\hat{\mathbf{y}}$ labels. This gives me two datasets $\hat{\mathcal{X}}_=$ and $\hat{\mathcal{X}}_{\neq}$ which are values that are **similar** to the signal, but with some being classified similarly and some that are not.

## The Shapelet Tree
After this, LASTS finally has one last step: figuring out what sort of subsequences are present in certain time series objects that aren't present in other ones. This can be visualised as a decision tree making decisions whether certain subsequences exist within a sample. The merit of this is that decision tree models are generally considered highly interpretable unlike most of modern machine learning.

To do this, LASTS utilizes a **subsequence transform** (they implement various methods including SAX and Shapelets) to do this. This transform breaks down our signals into an array of 0s and 1s that represent the presence of certain subsequences. These arrays are fixed length across all samples, and can be used alongside $\hat{\mathbf{y}}$ to train a Decision Tree Classifier, which we can call a **Shapelet Tree**.

## Quick Reference
- *Paper Link: https://dl.acm.org/doi/10.1145/3624480*
- *GitHub Link: https://github.com/fspinna/lasts*
