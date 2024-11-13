---
layout: default
---

# Data Leak Investigation | Information Security

In this hands-on activity of the `Google Cybersecurity Professional Certificate`, I acted as a security analyst for an educational technology company following a data leak of internal business plans on social media. The investigation revealed that an employee accidentally shared confidential documents with an external partner, and that the principle of least privilege was not followed during a sales meeting. My task involved evaluating the incident, reviewing existing data leak prevention controls, identifying ways to strengthen information privacy, and justifying how these improvements would enhance data security across the organization.

The scenario was described as such: 

"You work for an educational technology company that developed an application to help teachers automatically grade assignments. The application handles a wide range of data that it collects from academic institutions, instructors, parents, and students.

Your team was alerted to a data leak of internal business plans on social media. An investigation by the team discovered that an employee accidentally shared those confidential documents with an external business partner. An audit into the leak is underway to determine how similar incidents can be avoided.

A supervisor provided you with information regarding the leak. It appears that the principle of least privilege was not observed by employees at the company during a sales meeting. You have been asked to analyze the situation and find ways to prevent it from happening again.

First, you'll need to evaluate details about the incident. Then, you'll review the controls in place to prevent data leaks. Next, you'll identify ways to improve information privacy at the company. Finally, you'll justify why you think your recommendations will make data handling at the company more secure."

The investigation worhsheet I produced is the following: 

## Data leak worksheet

**Incident summary:** A sales manager shared access to a folder of internal-only documents with their team during a meeting. The folder contained files associated with a new product that has not been publicly announced. It also included customer analytics and promotional materials. After the meeting, the manager did not revoke access to the internal folder, but warned the team to wait for approval before sharing the promotional materials with others.

During a video call with a business partner, a member of the sales team forgot the warning from their manager. The sales representative intended to share a link to the promotional materials so that the business partner could circulate the materials to their customers. However, the sales representative accidentally shared a link to the internal folder instead. Later, the business partner posted the link on their company's social media page assuming that it was the promotional materials.

| **Control**                   | **Least privilege**                                                                                                                                                                                                                                                                                                                                                           |
|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Issue(s)**                  | The factors that contributed were deficient technical and operational security controls. The manager should have revoked access to sensitive data, per the principle of least privilege. Additionally, the employee should have waited for approval before sharing materials and should have been more aware of the data shared with an external partner. |
| **Review**                    | The NIST SP 800-53: AC-6 addresses data leak protection (PR.DS-5) under the Data Security (PR.DS) category within the ‘Protect’ function. It emphasizes safeguards to manage security risks, such as the principle of least privilege and control enhancements for enforcement.                                                              |
| **Recommendation(s)**         | Improve the principle of least privilege by implementing these control enhancements: <br>• Restrict access to sensitive resources based on user role. <br>• Automatically revoke access to information after a set period.                                                                                                               |
| **Justification**             | These improvements address the issue by ensuring that access to sensitive information is automatically revoked over time, reducing the risk of accidental exposure. Restricting access based on roles ensures that only authorized personnel, such as managers, can share information with third parties.                                |

[Back](./)
