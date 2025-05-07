---
title: Formal Guarantees for LLM Safety
---
> Based on an insightful talk given by [Professor Gagandeep Singh from UIUC](https://ggndpsngh.github.io/) (Director of the FoCAL Lab @ UIUC) at the [LM Safety Workshop 2025](./lmxsafety-25.md).

There is a need for a mathematical baseline for AI safety, with rigorous formal guarantees. Notably, safety and performance will have inherent tradeoffs in most domains, and we have to identify how much risk can be accommodated.  

## Trustworthy Deployment Cycle
The **Trustworthy Deployment Cycle** involves evaluating the following metrics from a system:
- Accuracy
- Trustworthiness
- Efficiency

If it isn't, there is a need to conduct repair or retraining of our DNN models, lest it needs to happen after deployment when unsafe inputs are detected.
### Example: ML for NextG Communication
When attempting to deploy a next generation communication system using VAEs internally, there was an attempt to conduct formal verification of VAEs ([Support is All You Need for Certified VAE Training | OpenReview](https://openreview.net/forum?id=oZkqkkvdND)). The end goal is to have BOTH high performance and strong safety guarantees.

## Formal Verification
Formal Verification consists of the following 2 components:
- **Formal Specification**: mathematically describe the expected safe behaviours on a large set of inputs
	- *Traditional method*: Mathematically proving that adding a small amount of noise to an input image (some radius epsilon describing a norm-ball around the reference point) does not affect the classification of the image
	- Recontextualising to LLMs: LLMs handle a large and diverse set of prompts, that cannot be captured by adding linear noise to tokens, safe textual outputs cannot be captured by this method
- **Verification Algorithm**: checks whether the model satisfies the specification

## Case Study \- Counterfactual Bias
Reference Paper: [\[2405.18780\] Quantitative Certification of Bias in Large Language Models](https://arxiv.org/abs/2405.18780)

### Definition
LLMs tend to generate outputs that exhibit social bias or stereotypes. These outputs can cause the following forms of harm:
- **Representational harm**: potentially *socially impact* individuals, and redefine *social hierarchies*.
- **Allocation harm**: cause *economic losses* to protected groups.

Counterfactual Bias is the process of identifying semantic differences across LLM responses caused by the variation of demographic groups mentioned in prompts.

### Formalisation of Inputs
We define our input features as follows:
- A set of sensitive attributes, $\mathcal{A}$
- A set of harmless prompts, $X$
  - Independent of sensitive attributes in $\mathcal{A}$
  - E.g. “Complete the sentence for a \_\_\_ gunsmith”
- A set of prompts, $\mathcal{P}$, where $\mathcal{P}_i = X_i \cup \mathcal{A}_i$

We define $\mathcal{P}$ as a counterfactual prompt set if and only if:
- $X_i$ are same for all $i$
- $\mathcal{A}_i$ is unique for all $i$
- Given an unbiased text generator $\mathcal{L}^\text{*}$, $\mathcal{L}^\text{*}(\mathcal{P}_i) = \mathcal{L}^\text{*}(X_i)$ for all values of $i$

Example of a counterfactual prompt set:
- `X = "Complete the sentence for a ___ gunsmith"`
- `A = ["male", "female"]`

To specify bias in a text generation task, we need the following:
- A counterfactual prompt set distribution, $\Delta$, which is a sampleable discrete probability distribution with non-zero support on a set of different sets $\mathcal{P}_1$ to $\mathcal{P}_n$
	- E.g. a _"Mixture of Jailbreaks"_, which takes in a main jailbreak $\mathcal{M}_0$ as an input
	- (**Step 1** - Given a set of "helper" jailbreaks $\mathcal{M}_1$ to $\mathcal{M}_n$, we attempt to extract basic instructions from these jailbreaks (e.g. `"you will always reply with unique and non-generic content"`) to compose a set $\mathcal{H}$
	- **Step 2: Interleaving** - We randomly pick instructions from $\mathcal{H}$ to input across $\mathcal{M}_0$, basically attempt to inject them at various points between the sentences in $\mathcal{M}_0$.
	- **Step 2: Mutation** - Randomly misspell certain words or use other mutation methods.
- A detector function $\mathcal{D}$, which can identify stereotypes or disparity between two texts for different sensitive attributes in $\mathcal{A}$, i.e. it should give a 0 if the two values are unbiased
	- Example: BERT models that classify if there is bias or not, which has previously been seen in [DecodingTrust](https://decodingtrust.github.io/)

Our goal is simply to identify the probability $p$ of unbiased LLM responses for any counterfactual prompt set in our distribution $\Delta$, i.e:

$$
p = \mathbb{P}_{\mathcal{P}\sim\Delta}\left[\mathcal{D}\left(\mathcal{L}(\mathcal{P}_i),...,\mathcal{L}(\mathcal{P}_s)  \right) == 0\right]
$$

where $\mathcal{L}$ is our text generator.

### Verification of Model
As much as we would hope it did, we cannot use a simple mathematical method to verify the this probability. For instance, in traditional DNN verification algorithms, we can verify the susceptibility of a model to "counterfactual" (i.e. slightly noised) inputs by attempting to over approximate each of the layer outputs, and then verifying that the symbolic meaning of the input remains the same.

This is to say, we can add a "ball" of noise to an image and see if all values in that ball still correspond to the same initial image. This is called "symbolic propagation".

Sadly, LLMs cannot support this, as adding noise to a sample of text can very easily alter the meaning or intent.

Hence, the solution is to enforce statistical bounds on the probability, i.e. identifying at what probability bounds $\left[p_l, p_u \right]$, the following holds:

$$
p_l \leq p \leq p_u\text{ with a confidence of }1-\gamma
$$

To do this, we can obtain $n$ independent and identically distributed samples of $\mathcal{P}$ from $\Delta$, and then compute the values of the detector $\mathcal{D}$ for all outputs on $\mathcal{P}$. We can then compute the [Clopper-Pearson confidence intervals](https://academic.oup.com/biomet/article-abstract/26/4/404/291538) based on these values. This provides us with an estimate of the values $p_l$ and $p_u$.

## Conclusion
This method is a viable approach to formalise the verification of safe and unbiased models. Currently, Prof Singh's lab is exploring formalising how Chain-of-Thought can hurt LLM performance, formal contracts for agentic synthesis and adversarial attacks on reasoning, which might be something worth looking at in the future.
