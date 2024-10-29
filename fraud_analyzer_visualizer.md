---
layout: default
---

## Fraud Transaction Analyzer | Python, pandas, matplotlib, Data Analysis


This code suite loads and analyzes a dataset related to transaction data, identifying fraudulent activity patterns and visualizing key features. It includes functions to extract, sample, and summarize information, as well as custom plots to investigate transaction types, fraud occurrences, and balance deltas associated with fraud.

### 1. Data Loading Function

```python
def exercise_0(file):
    df = pd.read_csv(file)
    return df
```

[back](./)
