# Fair Assignment System using the Bogomolnaia–Moulin Probabilistic-Serial Algorithm

## Abstract
This project presents a browser-based implementation of the Bogomolnaia–Moulin (2001) algorithm for fair allocation of indivisible goods under ordinal preferences.

## 1 Introduction
The fair allocation of indivisible resources is a central topic in mechanism design and social choice.  The algorithm proposed by Bogomolnaia & Moulin [1] is distinguished by three desirable properties:

1. **Ordinal Efficiency** – no alternative random assignment is ex-ante Pareto superior.
2. **Envy-Freeness** – every agent weakly prefers their own assignment to that of any other agent.
3. **Strategy-Proofness** – truthful preference revelation weakly dominates all misreports.

Despite its theoretical appeal, hands-on demonstrations are scarce outside research prototypes.  This project bridges that gap by providing an interactive, zero-deployment web application suitable for classroom instruction, research demonstrations, and small-scale user studies.

## 2 Algorithmic Details
### 2.1  Probabilistic-Serial Eating Procedure
Let N be the agent set and M the item set.  At time t=0 all agents “eat” their top choice with equal probability.  When the capacity of an item j is exhausted, every agent currently eating j moves to their most preferred item that still has remaining capacity.  The process terminates at t=1.  The fraction of time agent i spends eating item j equals the probability p.

### 2.2  Randomised Rounding
The fractional matrix P is converted to a discrete assignment via independent sampling without replacement.  Items are processed in random order; for each item, an agent is drawn with probability proportional to p_ij among those not yet assigned.

## 3 Usage Instructions
1. **Open** `index.html` in a browser.  No build step is required.
2. **Enter Items** – comma-separated list, e.g. `Research, Writing, Presentation`.
3. **Add Participants** – type a name, press Enter.
4. **Submit Preferences** – each participant enters a permutation such as `2,3,1` and clicks *Confirm*.
5. **Observe Results** – the PS probabilities and final assignment appear automatically.
6. **Start New Session** – resets the interface for subsequent experiments.


## References
[1] A. Bogomolnaia and H. Moulin. *A New Solution to the Random Assignment Problem.* Journal of Economic Theory 100 (2), 295-328, 2001.

---
**Author** Masao Ishihara   (✉ 26ishiharam@keio.jp)

*Last updated:* <!-- YYYY-MM-DD will be inserted by Git commit history --> 
