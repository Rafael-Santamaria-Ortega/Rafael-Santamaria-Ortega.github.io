---
layout: default
---

# Incident Handler's Journal | Linux Bash Shell, Wireshark, tcpdump, Suricata, Splunk, Chronicle, Ticketing Systems, VirusTotal, Social Engineering, Threat Intelligence

In this exercise from the Google Cybersecurity Professional Certificate, I document the details of 9 simulated security incidents and how I handled them using technical tools in hands-on labs. This excercise also gave me hands-on experience with various tools such as suricata, tcpdump, Wireshark, ticketing systems, Splunk, Chronicle, and the Linux Bash Shell; which are all essential proficiencies for any cybersecurity position. 

The criteria given to document is the following:

"
* The journal entry date and number

* A description of the journal entry

* 1-2 sentences addressing each of the 5 W's of the scenario:

  * Who caused the incident?

  * What happened?

  * When did the incident occur?

  * Where did the incident happen?

  * Why did the incident happen?

*1-2 sentences on any additional thoughts or questions about the scenario.
"

## Entry #1

In this first entry, I simulated being a level one security operations center (SOC) analyst responding to a security incident at a small U.S. healthcare clinic. The scenario involved investigating a ransomware attack where the attackers gained access through phishing emails and encrypted critical files, disrupting business operations. My goal was to document the incident and analyze the steps taken to identify and mitigate the ransomware threat.

The scenario is described as such:

"A small U.S. health care clinic specializing in delivering primary-care services experienced a security incident on a Tuesday morning, at approximately 9:00 a.m. Several employees reported that they were unable to use their computers to access files like medical records. Business operations shut down because employees were unable to access the files and software needed to do their job.

Additionally, employees also reported that a ransom note was displayed on their computers. The ransom note stated that all the company's files were encrypted by an organized group of unethical hackers who are known to target organizations in healthcare and transportation industries. In exchange for restoring access to the encrypted files, the ransom note demanded a large sum of money in exchange for the decryption key. 

The attackers were able to gain access into the company's network by using targeted phishing emails, which were sent to several employees of the company. The phishing emails contained a malicious attachment that installed malware on the employee's computer once it was downloaded.

Once the attackers gained access, they deployed their ransomware, which encrypted critical files. The company was unable to access critical patient data, causing major disruptions in their business operations. The company was forced to shut down their computer systems and contact several organizations to report the incident and receive technical assistance."

This is the documentation I made concerning the incident:

| **_Entry:_**            | **1**      |
|-------------------------|------------|
| <br> **_Date:_** <br>    | <br> 10/04/2024 <br> |
| <br> **_Description:_** <br> | <br> A small health care provider in the U.S.A. experienced a security incident that completely disrupted business continuity. <br> |
|<br> **_Tool(s) used:_**  <br> | <br> NO TOOLS WERE USED <br> |
| <br> **_The 5 W's:_**  <br>   | <br> _Who caused the incident?_ A group of unethical hackers that target the healthcare and transportation industries.<br><br> _What happened?_ Through spear phishing, the malicious actors gained access to company data and encrypted it, then sent a ransom demand for the decryption key. This security incident is called a Ransomware attack.<br><br> _When did the incident occur?_ The incident occurred on Tuesday at 9:00 a.m.<br><br> _Where did the incident happen?_ The incident happened in a small health care provider in the U.S.A.<br><br> _Why did the incident happen?_ The cause was a successful spear phishing attack. One or more targeted employees inadvertently gave access to the threat actors. <br>|
| <br> **_Additional notes:_** <br> | <br> To avoid further incidents like this, it is recommended to encrypt the company’s data in the three states of data, apply stronger password policies, enforce the principle of least privilege and separation of duties, and finally, increase employee training to detect and report these incidents. <br> |

## Entry #2

In this secon entry I simulated being a Security Analyst tasked with investigating network traffic using Wireshark. 

This is my documentation of the activity:

| **_Entry:_**            | 2          |
|-------------------------|------------|
| <br> **_Date:_**    <br> | <br> 11/04/2024 <br> |
| <br> **_Description:_**  <br> | <br> In this hands-on scenario, I simulated being a security analyst investigating traffic to a website using the Wireshark network protocol analyzer and an existing capture <br><br> _The key steps were:_ <br> 1. Opening a network packet capture file in `Wireshark` and examining the high-level overview of the data, including packet types, protocols, and visual cues provided by coloring rules.<br> 2. Applying a basic filter to inspect a specific TCP packet in detail, examining protocol layers (Ethernet, IP, TCP) to understand packet structure and contents.<br> 3. Using filters to select packets based on source/destination IP addresses or MAC addresses and examine protocol information.<br> 4. Exploring DNS traffic by filtering for `UDP port 53` packets and inspecting DNS query and response data.<br> 5. Filtering for `TCP port 80` traffic to examine web-related packets, reviewing details like Time to Live, frame length, and destination addresses.<br> 6. Finally, using an advanced filter to locate packets containing specific text data, such as those involving the `curl` command.<br><br> _Conclusion:_ Throughout the activity, the focus was on using `Wireshark`'s filtering and packet inspection capabilities to understand network traffic structure and contents—an essential skill for network analysis and troubleshooting. <br> |
| <br> **_Tool(s) used:_**  <br>   | <br> `Wireshark:` A free and open-source tool for network analysis and troubleshooting. <br> |
| <br> **_The 5 W's:_**   <br> | _Who caused the incident?_ N/A<br><br> _What happened?_ N/A<br><br> _When did the incident occur?_ N/A<br><br> _Where did the incident happen?_ N/A<br><br> _Why did the incident happen?_ N/A |
| <br> **_Additional notes:_** <br> | Wireshark is an excellent tool for network traffic analysis. The best part is that it is open-source and easy to use, thanks to its GUI. |

## Entry #3

In this third entry, I continued my simulation as a level one security operations center (SOC) analyst at a financial services company. The scenario was similar to the previous one, where I received an alert about suspicious network activity. The goal was to become familiar with using tcpdump to identify network interfaces, inspect live network traffic, capture traffic to a file, and then filter the captured data.

This is my documentation of the activity:

| **_Entry:_**            | 3 |
|-------------------------|---|
| <br> **_Date:_**  <br> | <br> 11/04/2024 <br> |
| <br> **_Description:_**  <br>    | <br> Captured and filtered network traffic using tcpdump on a Linux system.<br><br> _The key steps were:_ <br> 1. Identifying network interfaces using `ifconfig` and `tcpdump -D` to list the available network interfaces for packet capture.<br> 2. Inspecting network traffic with tcpdump using `tcpdump -i eth0 -v –c5` to capture and display 5 packets of live network traffic from the `eth0` interface.<br> 3. Capturing network traffic to a file using `tcpdump -i eth0 -nn -c9 port 80 -w capture.pcap &` to capture 9 packets of `HTTP (port 80)` traffic and save them to a file named `capture.pcap`.<br> 4. Filtering the captured packet data using `tcpdump -nn -r capture.pcap -v` to view the packet headers and `tcpdump -nn -r capture.pcap -X` to see the hexadecimal and ASCII representation of the captured packets. <br><br> The lab emphasized the importance of using the `-nn` option to avoid resolving IP addresses and ports to names, which can alert threat actors that an investigation is underway. It also covers some basic understanding of the packet data displayed by tcpdump.<br><br> _Conclusion:_ Overall, this lab provides a solid introduction to `network traffic` capture and analysis using `tcpdump` on a Linux system, which is an essential skill for security analysts. <br> |
| <br> **_Tool(s) used:_**  <br>   | <br> `tcpdump`: a free data-network packet analyzer computer program that runs under a command-line interface. It allows the user to display `TCP/IP` and other packets being transmitted or received over a network. <br><br> `Linux Bash Shell`: a command interpreter into which all other commands are entered. <br> |
| <br> **_The 5 W's:_**   <br>   | <br> _Who caused the incident?_ N/A<br><br> _What happened?_ N/A<br><br> _When did the incident occur?_ N/A<br><br> **Where did the incident happen?** N/A<br><br> **Why did the incident happen?** N/A <br> |
| <br> **_Additional notes:_** <br> | <br> Using `tcpdump` is very fun because I like typing shell commands to feel more in control of the instructions given to the program. <br> |

## Entry #4

In this fourth entry I simulated being a level one security operations center (SOC) analyst at a financial services company, that received an alert about a suspicious file being downloaded on an employee's computer.

The scenario is described as such:

"You are a level one security operations center (SOC) analyst at a financial services company. You have received an alert about a suspicious file being downloaded on an employee's computer.

You investigate this alert and discover that the employee received an email containing an attachment. The attachment was a password-protected spreadsheet file. The spreadsheet's password was provided in the email. The employee downloaded the file, then entered the password to open the file. When the employee opened the file, a malicious payload was then executed on their computer.

You retrieve the malicious file and create a SHA256 hash of the file. You might recall from a previous course that a hash function is an algorithm that produces a code that can't be decrypted. Hashing is a cryptographic method used to uniquely identify malware, acting as the file's unique fingerprint.

Now that you have the file hash, you will use VirusTotal to uncover additional IoCs that are associated with the file."

This is my documentation of the hands-on lab:

| **_Entry:_**            | 4 |
|-------------------------|---|
| <br> **_Date:_**   <br> | <br> 11/04/2024 1:20 p.m. <br> |
| <br> **_Description:_**   <br>   | <br> Received an IDS alert of an employee downloading and executing a file from an email, and performed an investigation of the alert. <br><br> _The key steps were:_ <br> _1. Reviewing the details of the alert:_ <br>   `SHA256` file hash: `54e6ea47eb04634d3e87fd7787e2136ccfbcc80ade34f246a12cf93bab527f6b` <br>   _The timeline of events:_ <br>   - 1:11 p.m.: Employee receives an email containing a file attachment <br>   -1:13 p.m.: Employee successfully downloads and opens the file <br>   - 1:15 p.m.: Multiple unauthorized executable files are created on the employee's computer <br>   - 1:20 p.m.: Intrusion detection system detects the executable files and sends an alert to the SOC <br><br> _2. Entered the file hash in VirusTotal_ <br><br> _. Analyzed the VirusTotal report and determined if the file is malicious:_ <br>   - The fact that three sandboxes and a high community score in VirusTotal indicates that it is likely a malicious file of the trojan family. Furthermore, the hash has been found with other names that suggest a threat actor has changed and it downloads some files that make system changes. However, the file `bfsvc.exe` is also a legitimate Windows OS file, so it is likely that threat actors masquerade their malware with that legitimate file’s name. There are some insights that can tell apart the malware from the actual file: first, the size, if it’s relatively small, it is most likely the legitimate file. Second, the description of the file states properly that it’s a Microsoft file that doesn’t have the ability to change files or make files. Third, if the date in properties of last execution or update matches the last Windows update, it most likely is the legitimate file. <br><br> _4. Filling a Pyramid of Pain with the IoCs pertaining the .exe file:_ <br>   - Domain names: `e11290.dspg.akamaiedge.net` is reported as a malicious contacted domain under the Relations tab in the VirusTotal report. <br>   - IP address: `104.115.151.81` is listed as one of many IP addresses under the Relations tab in the VirusTotal report. This IP address is also associated with the `e11290.dspg.akamaiedge.net` domain as listed in the DNS Resolutions section under the Behavior tab from the `Zenbox` sandbox report. <br>   - Hash value: `287d612e29b71c90aa54947313810a25` is a `MD5` hash listed under the Details tab in the `VirusTotal` report. <br>   - Network/host artifacts: The malware executes `HTTP` requests to `e86303.dscx.akamaiedge.net`. This is listed in the Network Communications section under the Behavior tab. <br>   - Tools: Execution of runtime modules. Malicious actors use runtime modules to avoid detection. <br>   - TTPs: Defense evasion. Malicious actors execute different strategies to avoid being detected. <br> |
| <br> **_Tool(s) used:_**   <br>  | <br> `VirusTotal`: a service that allows anyone to analyze suspicious files, domains, URLs, and IP addresses for malicious content. Through crowdsourcing, VirusTotal gathers and reports on threat intelligence from the global cybersecurity community. This helps security analysts determine which IoCs have been reported as malicious. So, hands-on experience with this service is essential. <br><br> `Pyramid of Pain`: a conceptual model for understanding cybersecurity threats that organizes IoCs into six different levels: TTPs, Tools, Network/host artifacts, Domain names, IP addresses, and Hash values. <br><br> |
| <br> **_The 5 W's:_**  <br> | <br> _Who caused the incident?_ An employee unknowingly downloading a malicious file <br><br> _What happened?_ The employee downloaded a file that was executed via a password given as a pretense to open the document. <br><br> _When did the incident occur?_ 1:11 p.m. <br><br> _Where did the incident happen?_ In the employee’s work computer. <br><br> _Why did the incident happen?_ Because there wasn’t enough awareness about social engineering attacks, email filters, and lack of user restrictions to download and execute files. <br><br> |
| <br> **_Additional notes:_** <br> | <br> The company must do more awareness campaigns and install filters. Also, the principle of least privilege must be more strongly enforced. <br> |

## Entry #5

This fifth entry builds up on entry #4 as the investigation and escalation by means of ticketing of the incident mentioned. 

This is my documentation of the hands-on lab:

"
| **_Entry:_** | 5 |
|:-------------|---|
| <br> **_Date:_** <br> | <br> 12/04/2024 at 10:04 a.m. <br> |
| <br> Description <br> |<br> Analyzed a `phishing alert` for a financial services company as a `Level 1 SOC analyst`, to evaluate and escalete an alert involving a suspicious file download from a phishing email. <br> _The key steps were:_ <br> 1. Reviewing the [`Phishing Playbook and Flowchart`](https://github.com/Rafael-Santamaria-Ortega/Rafael-Santamaria-Ortega.github.io/blob/main/Phishing%20incident%20response%20playbook.pdf) to understand the proper incident response procedures <br> 2. Updating the alert ticket status to "Investigating" to reflect active analysis. <br> 3. Evaluating the alert details including severity, sender information, message content, and attachment analysis. <br> 4. Determining if escalation is required based on alert severity and findings <br> _Conclusion:_The investigation confirmed that the email attachment's file hash was malicious, indicating a successful phishing attempt that requires further analysis and `escalation to Level 2 SOC`. <br> |  
| <br> **_Tool(s) used_** <br> | <br> `Ticketing system`: a software applications designed to manage and track various types of service requests or issues, by providing a structured way for organizations to receive, categorize, prioritize, and respond to requests from customers, clients, or internal teams. <br><br> `Phishing Playbook`: a manual on how to respond, mitigate and document a phishing related security incident. <br> | 
| <br> **_The 5 W's_** <br> | <br> _Who caused the incident?_ A ‘Clyde West’, probably a malicious actor impersonating a real person. <br><br> _What happened?_ Said person sent an email expressing interest to work in the company, so a password protected ‘CV’ named ‘bsfc.exe’ was attached to the mail. <br><br> _When did the incident occur?_ The incident occurred in 12/04/2024 <br><br> _Where did the incident happen?_ In the company’s premises <br><br> _Why did the incident happen?_ The incident happened because a supposed ‘job application’ bypassed the email filters. <br> |
| **_Additional notes:_** | The company must ensure that execution permits are in accordance to the least privilege principle. Also, even more awareness campaigns to detect and report more phishing attacks. |


**_Simulated Alert ticket resulting from this activity:_**  

| Ticket ID | Alert Message | Severity | Details | Ticket status | Ticket comments | Additional information: |
|:-------------|:------------------|:-------------|:-------------|:-------------|:-------------|:------------|
| A-2703  | SERVER-MAIL Phishing attempt possible download of malware | Medium | The user may have opened a malicious email and opened attachments or clicked links. | Escalated  | The email is probably a phishing email sent to gain access to the company’s systems, since it has a known malware file attached to it, as confirmed by the hash value and name of the file ‘bfscv.exe’. Not only that, but the sender’s email also ‘76tguyhh6tgftrt7tg.su’ and IP are very suspicious, since the name ‘Clyde West’ |is inconsistent with it, as well as the name ‘Def Communications’. Also suspicious are the grammatical mistakes, which usually are strong indicators of a phishing attempt. If the user opens the attachment is recommended to scan the network for malicious activity. Based on all this evidence, and the ‘medium’ severity of the incident, I proceed to escalate it. | Known malicious file hash: 54e6ea47eb04634d3e87fd7787e2136ccfbcc80ade34f246a12cf93bab527f6b |

| **_Malicious Email Sample:_** | 
|:-------------------------------| 
| From: Def Communications <76tguyhh6tgftrt7tg.su>  <114.114.114.114> <br><br> Sent: Wednesday, July 20, 2022 09:30:14 AM <br><br> To: <hr@inergy.com> <176.157.125.93> <br> Subject: Re: Infrastructure Egnieer role <br><br> Dear HR at Ingergy, <br><br> I am writing for to express my interest in the engineer role posted from the website. <br><br> There is attached my resume and cover letter. For privacy, the file is password protected. Use the password paradise10789 to open. <br><br> Thank you, <br> Clyde West <br><br> Attachment: filename="bfsvc.exe" |


## Entry #6 

In this hands-on lab, I simulated being a Security Analyst for the mid-sized retail company, and investigated the final report for the recent data breach incident. 

The scenario of this entry is described as such:

"You recently joined the security team as a level-one security operation center (SOC) analyst at a mid-sized retail company. Along with its physical store locations, your company also conducts operations in e-commerce, which account for 80% of its sales.

You are spending your first week of training becoming familiar with the company's security processes and procedures. Recently, the company experienced a major security incident involving a data breach of over one million users. Because this was a recent and major security incident, your team is working to prevent incidents like this from happening again. This breach happened before you began working at the company. You have been asked to review the final report."

This is my documentation of the hansds-on lab:

"
**_Date:_** 12/04/2024 11:40 a.m. 

**_Entry:_** 6 

**_Description:_** I analyzed a `final incident report` for a `data breach` that occurred at the company, focusing on forced browsing attack that exposed customer `PII` and `financial information`. The incident resulted in approximately 50,000 affected customer records and an estimated financial impact of $100,000 in direct costs and potential revenue loss. 

_The key events and findings were:_ 

* Initial ransom email received on December 22, 2022 

* Second email with proof of stolen data received on December 28, 2022 

* Vulnerability in e-commerce web application allowed forced browsing attack 

* Attacker exploited purchase confirmation page URLs to access customer data 

* Organization provided free identity protection services to affected customers 

The investigation effectively used web server logs to confirm the attack pattern, showing sequential access to customer orders - a clear indicator of automated exploitation. 

**_Tool(s) used:_** **Final Incident Report**: s comprehensive document detailing the security incident, including timeline, investigation findings, response actions, and future security recommendations. 

**_The 5 W's_**  

_Who caused the incident?_ External threat actor who initially demanded $25,000 in cryptocurrency 

_What happened?_ Forced browsing attack exploiting e-commerce web application vulnerability to access customer PII and financial data 

_Where did the incident happen?_ Company's e-commerce web application, specifically in the purchase confirmation page system 

_When did the incident occur?_ December 22-28, 2022, with initial contact on Dec 22 and escalation on Dec 28 

_Why did the incident happen?_ Vulnerability in URL string handling of order numbers in purchase confirmation pages allowed unauthorized access 

**_Additional notes:_** The incident highlightd e several key issues: 

* Initial email was dismissed as spam, delaying response 

* Attacker used proof of stolen data to escalate ransom demands from $25,000 to $50,000 

* Company implemented allowlisting and authentication controls as preventive measures 

* Importance of routine vulnerability scanning and penetration testing was emphasized in recommendations. 

"

## Entry #7

This scenario gave me first hand experience configuring and using `Suricata`, an Intrusion Detection System (`IDS`), through `Linux Bash Shell` commands. The exercise focused on understanding Suricata's rule structure, running the tool with custom rules, and analyzing different types of log outputs. 

This is my documentation of the hands-on lab:

"

**_Date:_** 12/05/2024 

**_Entry:_** 7 

**_Description:_** Configured and used `Suricata` custom alerts to monitor network traffic and trigger alert. 

_The key steps were:_ 

* Examining custom rules in `Suricata` and understanding their components (action, header, rule options) 

* Running Suricata with a custom rule against sample PCAP file to trigger alerts 

* Analyzing output logs in both `fast.log` and eve.json formats 

* Using jq tool to parse and format `JSON` output from `eve.json` 

* The lab emphasized the importance of understanding rule components: 

* Action: Determines what happens when conditions are met (alert, drop, pass, reject) 

* Header: Defines traffic parameters (protocols, source/destination IPs, ports, direction) 

* Rule Options: Additional parameters to customize signatures (msg, flow, content, sid, rev) 

**_Tool(s) used:_** `Suricata`, `jq`, and `Linux Bash Shell` 

`Suricata` is an open source threat detection engine that can act as an IDS, IPS, network security monitoring and packet processing engine.

`jq` is a lightweight command-line `JSON` processor for parsing and formatting JSON data. 

`Linux Bash Shell` is a Command line interface (`CLI`) used to execute commands and scripts.

**_The 5 W's:_**  

_Who caused the incident?_ N/A 

_What happened?_ Configured and tested Suricata IDS rules against sample network traffi. 

_Where did the incident happen?_ Test environment using sample `PCAP` file. 

_When did the incident occur?_ N/A 

_Why did the incident happen?_ N/A 

**_Additional notes:_** The exercise demonstrated the difference between `fast.log` (deprecated but useful for quick checks) and `eve.json` (main, detailed log format) in `Suricata`. Working with `JSON`-formatted logs using `jq` made the data much more readable and easier to analyze, which is crucial for real-world incident response and threat hunting tasks. 
"

## Entry #8

In this scenario I simulated investigating a security incident for Buttercup Games (a fictional e-commerce) as a Security Analyst, which mainly consisted in performing `Splunk` queries and analyzing the results.

This is my documentation of the hands-on lab:

"

**_Date:_** 15/04/2024 

**_Entry:_** 8 

**_Description:_** Using the `Splunk Cloud Platform` I investigated potential security issues with the company's mail server. Specifically, any `failed SSH login attempts` for the root account. 

_The key steps were:_

* Logged into the `Splunk Cloud Platform` and navigated to the `Splunk` home page. 

* Uploaded the sample `tutorialdata.zip` file, which contained data that could be ingested and indexed by Splunk. 

* Performed an initial search using the query `index=main` to confirm that the data had been successfully ingested and was searchable. 

* Examined the search results, noting the various host, source, and sourcetype fields that were attached to the indexed events. 

* Narrowed the search to focus on events generated by the `mailsv` host, which represented the company's mail server. 

* Crafted a more targeted search query to look for any failed SSH login attempts for the root account: `index=main host=mailsv fail* root`. 

The search results from this final query provided over 300 events that matched the specified criteria, indicating there were potentially security issues with failed root account login attempts on the mail server. 
 
The `Ip` is associated with two domains: `signin.accounts-gooqle.com` and `signin.office365x24.com`. 

**_Tool(s) used:_** **Splunk Cloud Platform and Splunk Search**  

The `Splunk Cloud Platform` is a `SIEM` (Security Information and Event Management) tool used to ingest, index, and analyze security-related data. 

Splunk Search is the query language and interface used to search and analyze data within the Splunk platform. 

**_The 5 W's:_**  

_Who caused the incident?_ An employee sgared it's credentials in to a malicious link.

_What happened?_ At 14:10 on 2023-01-31 `ashton-davidson-pc` signed in to the malicious link and and the `POST` flag suggests a successful phishing attempt, likewise other devices are possible compromised. 

_Where did the incident happen?_ `ashton-davidson-pc`, but possibly other affected devices.

When did the incident occur? 14:10 on 2023-01-31

Why did the incident happen? Lack of `security awareness campaigns`, as well as lack of email filtering. 

Additional notes 

The `Splunk search queries` and analysis techniques demonstrated in this exercise are essential skills for security analysts. By leveraging the data indexing and querying capabilities of a `SIEM` tool like `Splunk`, I was able to efficiently sift through large volumes of log data to identify potential security concerns. This information can then be used to inform further investigation, remediation, and overall security improvements for the organization 

"

## Entry #9

In this scenario I simulated being a Security Analyst for a financial services company, and investigated an alert about an employee receiving a phishing email containing a suspicious domain.

This is my documentation of the hands-on lab:

"

**_Date: 15/06/2024_**

**_Entry:_** 9 

**_Description:_** I conducted an investigation into the suspicious domain `signin.office365x24.com` that was identified in a phishing email received by one of the company's employees. 

_The key steps were:_

* Searched for the domain `signin.office365x24.com` in the `Chronicle` search bar to retrieve information about it. 

* Analyzed the `threat intelligence data` available for this domain and its top-level domain `office365x24.com`, including `VirusTotal` and `WHOIS` information. 

* Reviewed the Timeline and Assets tabs to identify the specific assets (employees/devices) that had accessed the domain, as well as the `HTTP requests` made (including `POST` requests). 

* Followed up by searching for the `IP address (40.100.174.34)` that the domain resolved to, to see if it was associated with any other suspicious domains. 

_Based on the investigation, I concluded:_

* Several employee assets had accessed the `signin.office365x24.com domain`, indicating many potential phishing attempts. 

* The domain resolved to the `IP address 40.100.174.34`, which was also associated with the domain `signin.accounts-gooqle.com`, further raising suspicions of maliciousness. 

* Multiple `POST` requests were made to the `signin.office365x24.com/login.php` page, suggesting that employees may have entered sensitive information like login credentials on the malicious site. 

Given the evidence gathered, it is clear that the `signin.office365x24.com` domain is highly suspicious and likely part of a phishing campaign targeting the company's employees. I will recommend further investigation and appropriate actions to mitigate the potential compromise. 

**_Tool(s) used :_** **Chronicle** 

**Chronicle** is a security investigation platform developed by Google that provides threat intelligence and analysis capabilities. 

**_The 5 W's_**  

_Who caused the incident?_ Several employees that accessed the `signin.office365x24.com` suspicious domain. 

_What happened?_ The `signin.office365x24.com` domain was likely part of a phishing campaign, with multiple POST requests made to the login page, suggesting employees may have entered sensitive information. 

_When did the incident occur?_ 31/01/2023 at 14:40  

_Where did the incident happen?_ In several employee assests (`roger-spence-pc`, `emil-palmer-pc`, `coral-alvarez-pc`) 

_Why did the incident happen?_ Lack of security awareness campaigns concerning phishing. 

**_Additional notes:_** This investigation highlights the value of having a robust security monitoring and investigation platform like Chronicle. By quickly analyzing the relevant threat intelligence and activity data, I was able to assess the risk posed by the suspicious domain and the associated indicators of compromise. This information will be crucial in guiding the company's incident response and security improvement efforts. Furthermore, this exercise underscores the importance of security awareness campaigns to avoid security incidents. 

"

[Back](./)
