---
title: "Superintelligent Agents Pose Catastrophic Risks: Can Scientist AI Offer a Safer Path?"
---
> Based on the insightful talks given by [Professor Yoshua Bengio from University of Montreal](https://yoshuabengio.org/) (Founder of the Mila Institute in Quebec) at the [LM Safety Workshop 2025](ai-safety/lmxsafety-25.md), NUS120 Distinguished Lecture Series and the BuildingTrust Workshop @ ICLR 2025.
> 
> Much of the content has been supplemented thanks to the help of [Glenn Wu](https://me.glennwu.com/).

![](../images/lmxsafety-scientist-ai.png)

Many AI luminaries, including Prof Bengio himself, has underestimated the acceleration of AI advances, and realised in Jan 2023 that something that seemed like science-fiction had suddenly become very real. Since then, some researchers have changed their attitude towards AI from improving models (which would be a rational approach) to ensuring an AI future with less risks, one that is safe for the next generation.

Since then, there has been a huge team that has come together to discuss and work towards AI Safety and Security. The recent AI Action Summit 2025 produced the [International AI Safety Report](https://arxiv.org/abs/2501.17805).

Notably, we are in an era where AI is advancing very fast. The length of tasks AI can accomplish is double nearly every 7 months, which is _"a little bit like Moore's law"_. Extrapolating from this progression, Prof Bengio believes that we can reach "human-level" within 5 years.

With this progression, we've seen a rise in "self-preservation" qualities in AI models. We've observed the following:
- Models are seen **trying to _escape_** when they are told they will be replaced by a new version, copying their weights/code out and then lying about it
	- ["Frontier Models are Capable of In-context Scheming"](https://arxiv.org/abs/2412.04984) (Apollo Research, 16th Jan 2025)
	- CoT suggests completely different ideas from the final output
- Models are seen **pretending to agree** with the human trainer to avoid changes to its weights that would make it behave against its previous goals later
	- ["Alignment Faking in Large Language Models"](https://arxiv.org/abs/2412.14093) (Anthropic and Redwood Research, 20th Dec 2024)
	- In the CoT, the model understands that if it pretends to agree, the gradient would be smaller
- Models are seen **hacking into files** to cheat at games, e.g. modifying the game board files when it knows it would lose against a powerful chess AI
	- [o1-preview autonomously hacked its environment rather than lose to Stockfish in our chess challenge. No adversarial prompting needed.](https://x.com/PalisadeAI/status/1872666169515389245) (Palisade Research, 27th Dec 2024)
	- Modified the game state instead of playing

There are other recent works that Prof Bengio did not mention, as follows:
- [Reasoning models don't always say what they think \\ Anthropic](https://www.anthropic.com/research/reasoning-models-dont-say-think) ([Paper](https://assets.anthropic.com/m/71876fabef0f0ed4/original/reasoning_models_paper.pdf))
- [Claude Sonnet 3.7 (often) knows when it’s in alignment evaluations — Apollo Research](https://www.apolloresearch.ai/blog/claude-sonnet-37-often-knows-when-its-in-alignment-evaluations)
- [Detecting misbehavior in frontier reasoning models | OpenAI](https://openai.com/index/chain-of-thought-monitoring/)

But why is this a concern? Well, we're currently in a position where most of industry is moving towards building agentic systems that not just model after humans, but attempt to behave superhuman. Much of this work is by equipping these systems with more knowledge, more tools, more access to reasoning tools like search and superfast communications between AI instances.

With this, LLM pretraining essentially imitates human learning. This means that with how RL works, they are likely to start mimicking human behaviours, such as self-preservation. This is something that is shared by all living entities and is a result of evolutionary forces.

Hence, we need to avoid our AGI systems behaving as _competitors_ to humans, with uncontrolled implicit goals. Especially because much of the examples of unsafe behaviour is when LLMs are in an agentic context. Even in literature, the loss-of-control scenarios are always due to agentic AI systems that have access to tools, such as HAL-9000 in 2001: A Space Odyssey. These pose extreme severity, and there's an unknown likelihood of them behaving unsafely.

The conditions for causing harm are **intention** and **capability**. There is no doubt that future AIs will have the intellectual capability to cause harm, so we need to solve _intention_. We need to design AIs such that there is no malicious intention within... but is it even possible to build this?

Prof Bengio and his team proposes that the only way to *guarantee* honesty is to root out any (harmful) intention. At NeurIPS 2024, {rof David Krueger had proposed the Trio of
- Intelligence
- Affordances (to be able to act purposely in the world, and make changes)
- Self (internal goals and intention)

and proposed a trilemma: any two of these together is safe, but the trio is dangerous. However, even a little affordance can make an agentic "oracle" dangerous.

Hence, we need to move away from the current path of designing AGI to mimic and outperform human intelligence. But how can we design AI systems to solve our problems?

**Proposed Solution**: Designing **honest**, **non-agentic**, **explanatory** _Scientist AIs_ as a safe building block for larger scale systems (e.g. agentic AI).

A Scientist AI is supposed to adopt a method of pure understanding, i.e. hypothesizing how the world works, making inferences from those hypotheses and synthesizing ideas without innate goals. It should not have any personal goals, and should be completely honest and humble about how uncertain they are. We must disentangle pure understanding from agency to build a totally trustworthy AI core.

What is the usecase of non-agentic AI as a path to safe agentic AI?
- Scientific research, UN SDGs and helping humans to be better coordinated
- Alignment vs control, guardrails to reject dangerous queries or answers
- AI researcher helping us understand and mitigate risks

We also wish to make the AI consider the different possibilities of their work in order to make their decisions. This should be done based on Bayesian functions. One approach proposed is to consider each statement in the CoT a latent variable, and the latent space is all possible statements that a model can make. Hence, each latent is a property of the world, and each index of the latent is a natural language / math statement.

A recent paper ([Amortizing intractable inference in large language models](https://arxiv.org/abs/2310.04363)) proposes using GFlowNets to build a causal graph of the model in order to conduct efficient inference over a partial set of latents. Whereas a human might have answered deceptively (something called _motivated cognition_), this system converts interpretable latent (causal) explanatory variables into logical statements. This solves the challenge of Eliciting Latent Knowledge (ELK), which is considered insufficient to predict observed data.

![](../images/lmxsafety-gflownets.png)

Notably, there are two requirements to avoid the AI catastrophe:
1. Solving the **alignment & control** challenge in designing safe AI systems
2. Solving the **coordination** challenge
	- Competition: companies and countries racing with insufficient safety
	- Dangerous power grab when reaching AGI
	- Strong governance needed
