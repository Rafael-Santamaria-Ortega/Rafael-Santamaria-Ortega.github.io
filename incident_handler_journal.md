---
layout: default
---

# Incident Handler's Journal | Linux Bash Shell, Wireshark, tcpdump, Suricata, Splunk, Chronicle, Ticketing Systems, VirusTotal, Social Engineering

In this excercise from the Google Cybersecurity Professional Certificate, I document the details of various security incidents and how I handled them using technical tools in hands-on labs. This excercise also gave me hands-on experience with various tools such as suricata, tcpdump, Wireshark, ticketing systems, Splunk, Chronicle, and the Linux Bash Shell; which are all essential proficiencies for any cybersecurity position. 

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

### Entry #1

The first entry scenario:

"A small U.S. health care clinic specializing in delivering primary-care services experienced a security incident on a Tuesday morning, at approximately 9:00 a.m. Several employees reported that they were unable to use their computers to access files like medical records. Business operations shut down because employees were unable to access the files and software needed to do their job.

Additionally, employees also reported that a ransom note was displayed on their computers. The ransom note stated that all the company's files were encrypted by an organized group of unethical hackers who are known to target organizations in healthcare and transportation industries. In exchange for restoring access to the encrypted files, the ransom note demanded a large sum of money in exchange for the decryption key. 

The attackers were able to gain access into the company's network by using targeted phishing emails, which were sent to several employees of the company. The phishing emails contained a malicious attachment that installed malware on the employee's computer once it was downloaded.

Once the attackers gained access, they deployed their ransomware, which encrypted critical files. The company was unable to access critical patient data, causing major disruptions in their business operations. The company was forced to shut down their computer systems and contact several organizations to report the incident and receive technical assistance."

This is the documentation I made concerning the incident:

"

**_Date:_** 10/04/2024 

**_Entry:_** 1  

**_Description:_** A small health care provider in the U.S.A. experienced a security incident that completely disrupted business continuity. 

**_Tool(s) used:_** NO TOOLS WERE USED 

**_The 5 W's:_**  

_Who caused the incident?_ A group of unethical hackers that target the healthcare and transportation industries.  

_What happened?_ Through spear phishing the malicious actors were able to gain access to the company data and encrypt it, to then send a ransom monetary request to provide the decryption key. This security incident is called a Ransomware attack. 

_When did the incident occur?_ The incident occurred on Tuesday at 9:00 a.m. 

_Where did the incident happen?_ The incident happened in a small health care provider in the U.S.A.  

_Why did the incident happen?_ The cause of the incident was a successful spear phishing attack. This means that one or more targeted employees unwillingly gave access to the threat actors. 

**_Additional notes:_** To avoid further incidents like this, it is recommended to encrypt the company’s data in the three states of data, apply stronger password policies, enforce the principle of least privilege and separation of duties, and finally, increase employee training to detect and report these incidents. 

"

### Entry #2

The second entry scenario is not specified beyond simulating being a Security Analyst investigating network traffic using Wireshark. 

This is my documentation of the activity:

"

**_Date:_** 11/04/2024  

**_Entry:_** 2 

**_Description:_** In this hands-on scenario I simulated being a security analyst investigating traffic to a website, using Wireshark network protocol analyzer. First I analyzed an existing capture. 

_The key steps were:_ 

* Opening a network packet capture file in `Wireshark` and examine the high-level overview of the data, including the different packet types, protocols, and visual cues provided by the coloring rules. 

* Applying a basic filter to inspect a specific TCP packet in detail, drilling down into the different protocol layers (Ethernet, IP, TCP) to understand the packet structure and contents. 

* Using filters to select packets based on source/destination IP addresses or Ethernet MAC addresses, and examine the protocol information contained within. 

* Exploring DNS traffic by filtering for `UDP port 53 packets`, and inspect the DNS query and response data. 

* Filtering for `TCP port 80` traffic to examine web-related packets, looking at details like Time to Live, frame length, and destination addresses. 

* Finally, using a more advanced filter to locate packets containing specific text data, such as those involving the `curl` command. 

Throughout the activity, the focus is on using `Wireshark`'s powerful filtering and packet inspection capabilities to understand the structure and contents of network traffic, which is an essential skill for network analysis and troubleshooting. 

**_Tool(s) used:_** `Wireshark:` a free and open source tool for network analysis and troubleshooting. 

**_The 5 W's:_**  

_Who caused the incident?_ N/A 

_What happened?_ N/A 

_When did the incident occur?_ N/A 

_Where did the incident happen?_ N/A 

_Why did the incident happen?_ N/A 

**_Additional notes:_** Wireshark is a very good tool to use in network traffic analysis. The best parts is that it is an open-source and easy to use because of the GUI. 

"

### Entry #3

The third entry scenario is the same as entry 2: simulating being a Security Analyst investigating Network Traffic, but with different tools. These are 'tcpdump' and the Linux Bash Shell.

This is my documentation of the activity:

"

**_Date:_** 11/04/2024  

**_Entry:_** 3 

**_Description:_** In this hands-on lab I learned how to capture and filter network traffic using tcpdump on a Linux system, by simulating being a security analyst. The goal was to become familiar with using tcpdump to identify network interfaces, inspect live network traffic, capture traffic to a file, and then filter the captured data. 

_The key steps were:_ 

* Identifying network interfaces using `ifconfig` and `tcpdump -D` to list the available network interfaces that can be used for packet capture. 

* Inspecting network traffic with tcpdump using `tcpdump -i eth0 -v –c5` to capture and display 5 packets of live network traffic from the `eth0` interface. 

* Capturing network traffic to a file using `tcpdump -i eth0 -nn -c9 port 80 -w capture.pcap &` to capture 9 packets of `HTTP (port 80)` traffic and save them to a file named `capture.pcap.` 

* Filtering the captured packet data using `tcpdump -nn -r capture.pcap -v` to view the packet headers, and
* `tcpdump -nn -r capture.pcap -X` to see the hexadecimal and ASCII representation of the captured packets. 

The lab emphasized the importance of using the `-nn` option to avoid resolving IP addresses and ports to names, which can alert threat actors that an investigation is underway. It also covers some basic understanding of the packet data displayed by tcpdump. 

Overall, this lab provides a solid introduction to `network traffic` capture and analysis using `tcpdump` on a Linux system, which is an essential skill for security analysts. 

**_Tool(s) used:_** `tcpdump` and `Linux Bash Shell` 

**tcpdump** is a free data-network packet analyzer computer program that runs under a command line interface. It allows the user to display `TCP/IP` and other packets being transmitted or received over a network.  

**Linux Bash Shell** is a command interpreter into which all other commands are entered. 

**_The 5 W's:_**  

_Who caused the incident?_ N/A 

_What happened?_ N/A 

_When did the incident occur?_ N/A 

_Where did the incident happen?_ N/A 

_Why did the incident happen?_ N/A 

**_Additional notes:_** Using `tcpdump` is very fun because I like typing shell commands to feel more in control of the instructions given to the program.

"

### Entry #4

The fourth entry scenario is described as such:

"You are a level one security operations center (SOC) analyst at a financial services company. You have received an alert about a suspicious file being downloaded on an employee's computer. 

You investigate this alert and discover that the employee received an email containing an attachment. The attachment was a password-protected spreadsheet file. The spreadsheet's password was provided in the email. The employee downloaded the file, then entered the password to open the file. When the employee opened the file, a malicious payload was then executed on their computer. 

You retrieve the malicious file and create a `SHA256` hash of the file. You might recall from a previous course that a hash function is an algorithm that produces a code that can't be decrypted. Hashing is a cryptographic method used to uniquely identify malware, acting as the file's unique fingerprint. 

Now that you have the file hash, you will use VirusTotal to uncover additional IoCs that are associated with the file."

This is my documentation of the activity:

"

**_Date:_** 11/04/2024 1:20 p.m. 

**_Entry:_** 4 

**_Description:_** In this hands-on scenario I simulated being a SOC analyst that received an IDS alert of an employee downloading and executing a file from an email. The key steps were: 

* _Reviewing the details of the alert:_ 

  `SHA256` file hash: `54e6ea47eb04634d3e87fd7787e2136ccfbcc80ade34f246a12cf93bab527f6b`

  **The timeline of events is:**  

  * 1:11 p.m.: Employee receives an email containing a file attachment 

  * 1:13 p.m.: Employee successfully downloads and opens the file 

  * 1:15 p.m.: Multiple unauthorized executable files are created on the employee's computer 

  * 1:20 p.m.: Intrusion detection system detects the executable files and sends an alert to the SOC 

* _Entered the file hash in VirusTotal_

* _Analyzed the VirusTotal report and determined if the file is malicious:_  

  * The fact that three sandboxes and a high community score in VirusTotal indicates that it is likely a malicious file of the trojan family. Furthermore, the hash has been found with other names that suggest a threat actor has changed and it downloads some files that make system changes.

  * However, the fil bfsvc.exe is also a legitimate Windows OS file, so it is likely that threat actors masquerade their malware with that legitimate file’s name. There are some insights that can tell apart the malware from the actual file: first, the size, if it’s relatively small, it is most likely the legitimate file. Second, the description of the file states properly that it’s a Microsoft file that doesn’t have the ability to change files or make files. Third, if the date in properties of last execution or update matches the last Windows update, it most likely is the legitimate file. 

* _Filling a Pyramid of Pain with the IoCs pertaining the .exe file:_

  * Domain names: `e11290.dspg.akamaiedge.net` is reported as a malicious contacted domain under the Relations tab in the VirusTotal report. 

  * IP address: `104.115.151.81` is listed as one of many IP addresses under the Relations tab in the VirusTotal report. This IP address is also associated with the `e11290.dspg.akamaiedge.net` domain as listed in the DNS Resolutions section under the Behavior tab from the `Zenbox` sandbox report. 

  * Hash value: `287d612e29b71c90aa54947313810a25` is a `MD5` hash listed under the Details tab in the `VirusTotal` report. 

  * Network/host artifacts: The malware executes `HTTP` requests to `e86303.dscx.akamaiedge.net`. This is listed in the Network Communications section under the Behavior tab. 

  * Tools: Execution of runtime modules. Malicious actors use runtime modules to avoid detection. 

  * TTPs: Defense evasion. Malicious actor execute different strategies to avoid being detected. 
 
**_Tool(s) used:_** `VirusTotal` and `Pyramid of Pain` 

**VirusTotal** is a service that allows anyone to analyze suspicious files, domains, URLs, and IP addresses for malicious content. Through crowdsourcing, VirusTotal gathers and reports on threat intelligence from the global cybersecurity community. This helps security analysts determine which IoCs have been reported as malicious. So, hands-on experience this service is essential. 

The **Pyramid of Pain** is a conceptual model for understanding cybersecurity threats that organizes IOCs into six different levels: TTPs, Tools, Network/host artifacts, Domain names, IP adresses, and Hash values. 

**_The 5 W's_**

_Who caused the incident?_ An employee unknowingly downloading a malicious file 

_What happened?_ The employee downloaded a file that was executed via a password given as a pretense to open the document. 

_When did the incident occur?_  

  * 1:11 p.m.: An employee receives an email containing a file attachment. 

  * 1:13 p.m.: The employee successfully downloads and opens the file. 

  * 1:15 p.m.: Multiple unauthorized executable files are created on the employee's computer. 

  * 1:20 p.m.: An intrusion detection system detects the executable files and sends out an alert to the SOC. 

_Where did the incident happen?_ In the employee’s work computer. 

_Why did the incident happen?_ Because there wasn’t enough awareness about social engineering attacks, email filters and lack of user restrictions to download and execute files. 

**_Additional notes:_** The company must do more awareness campaigns and install filters. Also, the principle of least privilege must be more strongly enforced,  

"

### Entry #5

