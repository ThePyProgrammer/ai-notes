---
title: LASTS
---
Paper Link: https://dl.acm.org/doi/10.1145/3624480
GitHub Link: https://github.com/fspinna/lasts


LASTS is a method to interpret the result of classification by a blackbox function $f: x \rightarrow y$, where $x$ is a time series sample and $y$ is a classification label, for an instance $x_i$.

## The Variational Autoencoder
LASTS uses a variational autoencoder (VAE) comprised of a encoder $E: x \rightarrow z$ and decoder $D : z \rightarrow \hat{x}$. Here $z$ is effectively a "latent space" representation $x$, and $\hat{x}$ is an approximation made by the decoder $D$ for $x$. This model $M: x \rightarrow \hat{x}$ minimizes the loss function $\mathcal{L} = (x - \hat{x})^2$ in order to ensure limited difference between $x$ and $\hat{x}$ while finding a good value set for $z$.

The usability of $z$ is that in condenses $x$ into a very simple vector. For example, LASTS uses a latent space of just **two** dimensions with an input sequence of 128 time series values.

## Counterfactual Search (CFS)
Once I have $z$, LASTS uses a **neighbourhood generation (NG)** method to sample values very close to the $z$ value. Think of this as a circle / sphere / $n$-th dimensional circular object being drawn around the point $z$ in the environment, and taking random values from that object. This neighbourhood $Z$ is then put through the decoder $D$ to give a set of values $X$ which is then put through the blackbox $f$ to get a set of values $Y$. If any of these values differ from the original label $y$, we take note of them as **counterfactuals**, stored in a database $Z_{\neq}$, and the threshold value for this object is halved. They do this again and again until NO **counterfactuals** are newly found. After this, all data in $Z_{\neq}$ is assessed against $z$ via a distance metric to find the closest value $z_{\neq}$ to $z$, which is considered the closest counterfactual found by this **counterfactual search (CFS)** algorithm.

## The Saliency Map, $\Phi$
Once I have $z_{\neq}$, I am able to then put this value through the decoder $D$ to provide me a value $\hat{x}_{\neq}$, which is effectively the closest similar sample to $\hat{x}$ that is of a **different class**. This allows me to find specific features within the signal that likely caused the classification different. The scale of how much each timestep contributes to the class is known as a **saliency map**, $\Phi$, which can be computed very simply via

$$
\Phi = \| \hat{x} - \hat{x}_{\neq} \|
$$

The larger the differences are, the larger the saliency map reading at that timestamp.

## Neighbourhood Generation (NG)
Next, LASTS uses another neigbourhood generation (NG) method, but this time around $z_{\neq}$. The rationale for this is that
1. Values around $z_{\neq}$ are right around the decision boundary. This means that the likelihood of there being similarly classified or differently classified samples within a small radius is very high.
2. Values around $z$ are likely to be similarly classified due to it possibly being very far away from the decision boundary.

This NG provides a new neighbourhood $Z$, which I am then able to put through the decoder $D$ in order to provide me with a "neighbourhood" $\hat{X}$. I can then use the function $f$ to classify the equivalent $\hat{Y}$ labels. This gives me a set of values $\hat{X}_=$ and $\hat{X}_{\neq}$ which are values that are **similar** to the signal, but with some being classified similarly and some that are not.

## The Shapelet Tree
After this, LASTS finally has one last step: figuring out what sort of subsequences are present in certain time series objects that aren't present in other ones. This can be visualised as a decision tree making decisions whether certain subsequences exist within a sample. The merit of this is that decision tree models are generally considered highly interpretable unlike most of modern machine learning.

To do this, LASTS utilizes a **subsequence transform** (they implement various methods including SAX and Shapelets) to do this. This transform breaks down our signals into an array of 0s and 1s that represent the presence of certain subsequences. These arrays are fixed length across all samples, and can be used alongside $\hat{Y}$ to train a Decision Tree Classifier, which we can call a **Shapelet Tree**.


