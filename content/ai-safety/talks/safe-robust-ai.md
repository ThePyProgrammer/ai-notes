---
title: Building Safe and Robust AI Systems
---
> Based on the Opening Keynote to ICLR 2025, given by [Professor Zico Kolter from CMU](https://zicokolter.com/) (Director of the ML Department @ CMU)

He lied, the topic wasn't really on safe and robust systems but more so "**Making an impact with academic research**".

![](../../images/safe-robust-ai.png)

## Opening Reflections: Then vs Now
- _Test of Time Awards:_
	- Highlighted the profound long-term impact of early ICLR papers, including Adam, Neural Machine Translation (which introduced softmax), and many more
	- Raised the bar for long-term research relevance.
- _ICLR Growth:_
    - ICLR 2015: only ~31 papers
    - ICLR 2025: ~3700 papers!
- Have we lost anything in the past 10 years?
    - 10 years ago, there was a persistent sense that the work being done was going to be transformative to the field
    - This has been lost....

How should we think about academic research in 2025 to recapture a bit of that "spark" and impact of 2015?
- _Prof Kolter's View:_  We don't need to pursue a fundamentally new direction, the progress we are making is increasing and the integration of industry is very important
- What work has Prof Kolter's group done in the past 10 years, and why haven't they had the impact that ICLR 2015 papers had?
	- Optimization & Implicit Layers
	- Certified Adversarial Robustness
	- Empirics of DL
	- AI Safety

---

## Optimization & Implicit Layers
### Context
Back in 2015, Prof Kolter had come into AI from a convex optimization background, and his goal was to build in convex optimization to develop better DL architectures in order to leverage the things he knew best.

### Research
- [**Input Convex Neural Networks (ICML 2017)**](https://arxiv.org/abs/1609.07152)
    - ReLU is a complex function, and these can be optimized very easily
    - Positive combinations of convex functions can be combined
    - Enabled energy models with guaranteed optimization.
    - Used for provably stabilizing dynamical systems (e.g., Lyapunov functions).
- [**OptNet: (Differentiable) Optimization as a Layer (ICML 2017)**](https://arxiv.org/abs/1703.00443)
	- Specific layer in a network that solves the optimization problem
	- Complex optimization problem, as it generalizes most activations + linear layers
	- Embeds a logical structure within the architecture at the individual layers, which Ilya Sutskever has said was going to be as big as ResNets
	- Learning hard constraints from data (2018)
	- Solving Sudoku with MNIST digits using a diff SDP solver ([Wang et al, 2019](https://arxiv.org/abs/1905.12149))
	- Optimize downstream loss in learning ([Donti et al, 2018](https://aiforsocialgood.github.io/2018/pdfs/track1/118_aisg_neurips2018.pdf))
- [**Deep Equilibrium Models (DEQ, NeurIPS 2019)**](https://proceedings.neurips.cc/paper/2019/hash/01386bd6d8e091c2ab4c7c7de644d37b-Abstract.html)
    - Task was to design an infinite-layer network with tied weights.
    - DEQ ended up making each layer the same, so the same function kept being applied over and over again
    - Memory-efficient and outperformed normal transformers in some specific settings
    - Currently: people are looking at DEQ models for test-time compute
    - Reflections: Promising idea but not transformative enough to justify the architectural shift towards a low-parameter, high-compute system.

### What went wrong?
- These models took **twice as long** as normal depth deep networks
- Fundamentally, they were increasing the compute per layer while using fewer parameters
- Industry-side cannot afford that, they can store more weights but compute is a bottleneck
- Ultimately, Mixture-of-Experts (more params, less compute) won out
- Essentially, these were cool ideas that spoke with the philosophy at the time, but it didn't pan out.

---

## Certified Adversarial Robustness
### Context
Back in 2017, adversarial robustness was already well-established, and it was able to use tiny perturbations to change classification outputs, which reduced trust in these "intelligent" systems.

Hence, work was done to explore strategies to defend and address these problems, but at that point, most of these could be easily circumvented, and were easy to break. Hence, there was a need for a **certifiably robust** system.

### Research
- [**Convex Adversarial Polytope (ICML 2018)**](https://arxiv.org/abs/1711.00851)
    - Used convex relaxation to gurantee robustness.
    - Since ReLU is non-linear, DL models are also non-linear.
    - Handled non-linearity of such activations.
- [**Randomized Smoothing (ICML 2019)**](https://arxiv.org/abs/1902.02918)
    - Added Gaussian noise to inputs; used majority vote over noisy samples for classification.
    - Provable robustness bounds.

### What went wrong?
- Robust models came at a steep monetary cost.
	- These were systems adapting to a _tiny_ amount of noise
	- Classifier performance was reduced significantly
- Threat models adapted to existing research.
- The researchers were not ensuring "robustness", but solving a toy problem, and they couldn't even solve that.
- Industry preferred performant models over robust ones, it was happy to use the "good enough" category of models.
- These efforts addressed an important concern but lacked broad practical impact.

---

## Empirics of DL
### Context
By 2020, the scaling era has arrived. Academia could no longer compete with industry at scaling and building SOTA models. The role shifted toward _scientific understanding_ of DL, i.e. running basic experiments very quickly to find emergent trends, and hope that industry partners were able to pick it up. Most individuals took it as "scientific study" of existing models to develop an underlying "biology/physics" of these deep networks.

### Research
- [**Edge of Stability** (ICLR 2021)](https://arxiv.org/abs/2103.00065)
    - Challenged assumptions about having to pick a learning rate based on the "sharpness" (top eigenvalue of the Hessian).
    - A lot of proofs in DL papers assumed the bound on "sharpness" was correct
    - Showed sharpness plateaus even as loss decreases.
- [**Generalization and Agreement**](https://arxiv.org/abs/2106.13799)
    - Trained two different classifiers with the same architectures but different initialization of weights
    - Compute disagreement between classifiers
    - Found that disagreement ≈ average test error
    - A novel predictor of generalization performance, and an interesting way to predict the error without any supervised labels
- [**Agreement on the Line (NeurIPS 2022)**](https://proceedings.neurips.cc/paper_files/paper/2022/hash/7a8d388b7a17df480856dff1cc079b08-Abstract-Conference.html)
    - Built on “Accuracy on the Line” ([Miller et al. 2021](https://arxiv.org/abs/2107.04649)).
	    - observed that out-of-distribution accuracy degrades with in-distribution accuracy
	- Similar property applies to agreement, i.e. strong linear correlation between in-distribution and out-of-distribution agreement
	- Sample slope between agreement and accuracy, which suggests one can estimate the performance of a model on a new distribution of data without any labels for that data

### Did anything go wrong?
- No, empirical studies are valuable
- Building the _science_ (biology/physics) of DL by observing large models
- We went from developing models to building techniques to simply analysing existing models by big labs and observing their perfomances

---

## AI Safety
### Context
Back in 2022, with the GPT-esque models, AI system capability was accelerating faster than had been anticipated, but there is a general belief that the [AI Safety](../index.md) domain of research is largely underserved, even to this day.

The robustness of models have become a big concern again, and the belief is that academic research should now focus on influencing this field by understanding and mitigating the vulnerabilities of AI systems.

### Research
- [**Automated Universal Jailbreaks (GCG)**](https://arxiv.org/abs/2307.15043)
    - Simple idea: adding a nonsense suffix to a prompt to jailbreak models
    - Optimized token suffixes to bypass LLM safety filters and alignment
    - Used open-source LLMs for token probabilities, and based on these, they modified the extra tokens to increase the probability of an unsafe output
- **Benchmarking Unlearning**
    - Goal: remove knowledge (e.g., toxic info) from models.
    - [TOFU: A Task of Fictitious Unlearning for LLMs](https://arxiv.org/abs/2401.06121)
    - Dataset of fictitious authors (not in pretraining corpus) used for controlled unlearning experiments.
    - FInetuned models to learn the fictitious author data, and then attempt to unlearn this information.
    - Found: forgetting harms model utility.
- [**Antidistillation Sampling**](https://arxiv.org/abs/2504.13146v2)
	- Website Link: https://antidistillation.com/
    - Generated samples via good teacher models that DO NOT help student learning.
    - Inspired by prior work in data corruption and poisoning.
- [**Safety Pretraining**](https://www.arxiv.org/abs/2504.16980)
	- Website Link: http://locuslab.github.io/safety-pretraining
    - Current LLMs learn toxic content, then rely on RLHF to "unlearn" it.
    - But finetuning often degrades alignment.
    - Instead, try to start with a safe pretraining objective

### What could go wrong?
- Are we only addressing superficial safety problems?
- Can we identify the _underlying_ safety problems?
- Could better models inherently solve these issues?
- Academic focus on foundational safety challenges is lacking.

---

## Parting thoughts

### For Junior Researchers and Students
- Don’t worry if your research doesn't seem quite too “strategic.”
- Great ideas often arise through serendipity (chance interactions) and curiosity (towards problems).
- Seek novel, uncharted territories.

### For Senior Faculty
- Support early-career researchers — even the unconventional ones.

> “Machines will be capable, within twenty years, of doing any work a person can do.”  
> — _Herbert Simon, 1965_