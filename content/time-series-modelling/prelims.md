---
title: Preliminaries
---
A univariate EEG signal $\mathbf{x} \in \mathbb{R}^t$ is a sequence of $t$ real-valued observations sampled at uniform time intervals from a single EEG channel (i.e., electrode):

$$
\mathbf{x} = [x_1, x_2, \dots, x_t]^\top
$$

Here, $t$ denotes the *sequence length* of the signal.

A multivariate EEG time series $X \in \mathbb{R}^{d \times t}$ consists of $d$ univariate signals recorded concurrently across $d$ EEG channels:

$$
X = \begin{bmatrix}
\mathbf{x}^{(1)} \\
\mathbf{x}^{(2)} \\
\vdots \\
\mathbf{x}^{(d)}
\end{bmatrix}
$$

Each $\mathbf{x}^{(i)} \in \mathbb{R}^t$ represents a univariate signal from channel $i$, and $t$ is the shared sequence length.

An EEG time series classification (TSC) dataset $\mathcal{D}$ comprises $n$ multivariate EEG samples and their corresponding class labels:

$$
\begin{align*}
\mathcal{X} = \{ X_1, X_2, \dots, X_n \}&, \quad X_i \in \mathbb{R}^{d \times t_i} \\
\mathbf{y} = [y_1, y_2, \dots, y_n]^\top \in \mathbb{N}^n&, \quad y_i \in \mathcal{C} = \{1, 2, \dots, c\}
\end{align*}
$$

Here, $d$ is the number of EEG channels (constant across all samples), $t_i$ is the sequence length for sample $i$, and $\mathcal{C}$ is the set of target classes.


A time series classification model is a function

$$
\mathcal{M}: \mathbb{R}^{d \times t} \rightarrow [0, 1]^c
$$

that maps a multivariate time series $X \in \mathbb{R}^{d \times t}$ to a class probability vector

$$
\hat{\mathbf{y}} = \mathcal{M}(X) = [\hat{y}_1, \hat{y}_2, \dots, \hat{y}_c]^\top, \quad \sum_{i=1}^c \hat{y}_i = 1
$$

Each $\hat{y}_i$ represents the predicted probability of class $i$. The predicted label is given by

$$
\hat{y} = \arg\max_{i \in \mathcal{C}} \hat{y}_i
$$


