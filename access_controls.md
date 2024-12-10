---
layout: default
---

# Improving Access Controls for a fictional business | IAM 

In this hands-on activity from the `Google Cybersecurity Professional Certificate`, I simulated being the first cybersecurity professional hired by a growing business to investigate a near-miss incident where a deposit was nearly sent to an unknown bank account. After confirming that the finance manager did not initiate the transfer, I was tasked with reviewing access logs, identifying potential threat actors, analyzing exploited access control weaknesses, and recommending improved access controls to prevent future incidents.

The scenario was described as such: 

"You’re the first cybersecurity professional hired by a growing business.

Recently, a deposit was made from the business to an unknown bank account. The finance manager says they didn’t make a mistake. Fortunately, they were able to stop the payment. The owner has asked you to investigate what happened to prevent any future incidents.

To do this, you’ll need to do some accounting on the incident to better understand what happened. First, you will review the access log of the incident. Next, you will take notes that can help you identify a possible threat actor. Then, you will spot issues with the access controls that were exploited by the user. Finally, you will recommend mitigations that can improve the business' access controls and reduce the likelihood that this incident reoccurs."

The access control worhseet I produced is the following:

| | **Note(s)** | **Issue(s)** | **Recommendation(s)** |
|:---|:---|:---|:---|
| **Authorization / Authentication** | Failed money transfer to 'Faux_Bank' caused by unauthorized user. | Enforce least privilege and separation of duties. Implement role-based access control and MFA for payment-related actions. | User 'Robert Taylor Jr.' with administrator privileges, despite being a former contractor. |
