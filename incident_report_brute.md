---
layout: default
---

# Tcpdump log analysis to detect and report a Brute Force Attack | Networking, Network Protocols, Network Security, tcpdump

In this exercise from the `Google Cybersecurity Professional Certificate`, I simulated being a cybersecurity analyst responding to a security incident at `yummyrecipesforme.com`, a website selling recipes and cookbooks. The scenario involved investigating an attack by a former employee who used a `brute force attack` to access the website’s admin panel, embedding malware that redirected users to a fake site. My goal was to document the incident, analyze network protocols used in the attack, and recommend preventive measures to improve security, including protections against brute force attacks. 

The scenario was described as such:

"_You are a `cybersecurity analyst` for `yummyrecipesforme.com`, a website that sells recipes and cookbooks. A former employee has decided to lure users to a fake website with malware. The baker executed a brute force attack to gain access to the web host. They repeatedly entered several known default passwords for the administrative account until they correctly guessed the right one. After they obtained the login credentials, they were able to access the admin panel and change the website’s source code. They embedded a `javascript` function in the source code that prompted visitors to download and run a file upon visiting the website. After embedding the malware, the baker changed the password to the administrative account. When customers download the file, they are redirected to a fake version of the website that contains the malware._

_Several hours after the attack, multiple customers emailed yummyrecipesforme’s helpdesk. They complained that the company’s website had prompted them to download a file to access free recipes. The customers claimed that, after running the file, the address of the website changed and their personal computers began running more slowly. In response to this incident, the website owner tries to log in to the admin panel but is unable to, so they reach out to the website hosting provider. You and other cybersecurity analysts are tasked with investigating this security event._

_To address the incident, you create a sandbox environment to observe the suspicious website behavior. You run the network protocol analyzer `tcpdump`, then type in the URL for the website, `yummyrecipesforme.com`. As soon as the website loads, you are prompted to download an executable file to update your browser. You accept the download and allow the file to run. You then observe that your browser redirects you to a different URL, greatrecipesforme.com, which contains the malware. The logs show the following process:_

* _The browser initiates a `DNS request`: It requests the `IP address` of the `yummyrecipesforme.com` URL from the `DNS server`._
* _The `DNS` replies with the correct IP address._ 
* _The browser initiates an `HTTP request`: It requests the `yummyrecipesforme.com` webpage using the IP address sent by the DNS server._
* _The browser initiates the download of the `malware`._
* _The browser initiates a `DNS request` for `greatrecipesforme.com`._
* _The `DNS server` responds with the `IP address` for `greatrecipesforme.com`._
* _The browser initiates an `HTTP request` to the `IP address` for `greatrecipesforme.com`._

_A senior analyst confirms that the website was compromised. The analyst checks the source code for the website. They notice that javascript code had been added to prompt website visitors to download an executable file. Analysis of the downloaded file found a script that redirects the visitors’ browsers from `yummyrecipesforme.com` to `greatrecipesforme.com`. The cybersecurity team reports that the web server was impacted by a `brute force attack`. The disgruntled baker was able to guess the password easily because the admin password was still set to the default password. Additionally, there were no controls in place to prevent a brute force attack._ 

_Your job is to `document the incident in detail`, including identifying the network protocols used to establish the connection between the user and the website. You should also recommend a security action to take to prevent brute force attacks in the future._"

The `tcpdump` log for this activity contains the following information:

```tcpdump
14:18:32.192571 IP your.machine.52444 > dns.google.domain: 35084+ A?
yummyrecipesforme.com. (24)
14:18:32.204388 IP dns.google.domain > your.machine.52444: 35084 1/0/0 A
203.0.113.22 (40)

14:18:36.786501 IP your.machine.36086 > yummyrecipesforme.com.http: Flags
[S], seq 2873951608, win 65495, options [mss 65495,sackOK,TS val 3302576859
ecr 0,nop,wscale 7], length 0
14:18:36.786517 IP yummyrecipesforme.com.http > your.machine.36086: Flags
[S.], seq 3984334959, ack 2873951609, win 65483, options [mss 65495,sackOK,TS
val 3302576859 ecr 3302576859,nop,wscale 7], length 0
14:18:36.786529 IP your.machine.36086 > yummyrecipesforme.com.http: Flags
[.], ack 1, win 512, options [nop,nop,TS val 3302576859 ecr 3302576859],
length 0
14:18:36.786589 IP your.machine.36086 > yummyrecipesforme.com.http: Flags
[P.], seq 1:74, ack 1, win 512, options [nop,nop,TS val 3302576859 ecr
3302576859], length 73: HTTP: GET / HTTP/1.1
14:18:36.786595 IP yummyrecipesforme.com.http > your.machine.36086: Flags
[.], ack 74, win 512, options [nop,nop,TS val 3302576859 ecr 3302576859],
length 0
...<a lot of traffic on the port 80>...

14:20:32.192571 IP your.machine.52444 > dns.google.domain: 21899+ A?
greatrecipesforme.com. (24)
14:20:32.204388 IP dns.google.domain > your.machine.52444: 21899 1/0/0 A
192.0.2.17 (40)

14:25:29.576493 IP your.machine.56378 > greatrecipesforme.com.http: Flags
[S], seq 1020702883, win 65495, options [mss 65495,sackOK,TS val 3302989649
ecr 0,nop,wscale 7], length 0
14:25:29.576510 IP greatrecipesforme.com.http > your.machine.56378: Flags
[S.], seq 1993648018, ack 1020702884, win 65483, options [mss 65495,sackOK,TS
val 3302989649 ecr 3302989649,nop,wscale 7], length 0
14:25:29.576524 IP your.machine.56378 > greatrecipesforme.com.http: Flags
[.], ack 1, win 512, options [nop,nop,TS val 3302989649 ecr 3302989649],
length 0
14:25:29.576590 IP your.machine.56378 > greatrecipesforme.com.http: Flags
[P.], seq 1:74, ack 1, win 512, options [nop,nop,TS val 3302989649 ecr
3302989649], length 73: HTTP: GET / HTTP/1.1
14:25:29.576597 IP greatrecipesforme.com.http > your.machine.56378: Flags
[.], ack 74, win 512, options [nop,nop,TS val 3302989649 ecr 3302989649],
length 0
...<a lot of traffic on the port 80>...
```

**_NOTES:_** 
| **TCP Flag codes include:** |
|:--------------------------------|
| Flags [S] - Connection Start  |
| Flags [F] - Connection Finish |
| Flags [P] - Data Push |
| Flags [R] - Connection Reset |
| Flags [.] - Acknowledgment |

My documentation and recommendations regarding the incident is the following report:

## Security Incident Report for Brute Force Attack

| **Section 1: Identify the network protocol involved in the incident** | 
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| <br> The network protocol involved is the `TCP/IP (Transmission Control Protocol/ Internet Protocol)`; more specifically the incident involves the `Application layer`, according to the `TC/IP model`, which handles network requests and their respective answers `(DNS requests, HTTP requests, etc.)`. <br> | 

| **Section 2: Document the incident** | 
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <br> The incident was first reported by many users to the web server helpdesk, after said server prompted them to download and run a file in order to access the free recipes. When they ran the executable file, the web address changed and their computers became slower. <br><br> When the owner was made aware of the incident, they tried to access the administration panel with their login credentials, only to find out that they couldn’t. So, they contacted the website hosting provider, who passed the case to their cyber security analysts. <br><br> To analyze the incident in a controlled environment, a sandbox was created to mimic the user's interaction with the web server, and the `tcpdump` tool was employed to read the incoming `network traffic`. First, the site `yummyrecipesforme.com` was accessed through a browser as normal. This is represented by the first four lines of the tcpdump log. Indeed, the source computer makes a `DNS request` through `port 52444` for the url `yummyrecipesforme.com`, which is replied by the google domain server with the `correct IP address (203.0.113.22)`. <br><br> With the IP address, the source computer sends a connection request through `port 36086` to the `.http port` of `yummyrecipesforme.com` (commonly associated with port 80), which was acknowledged by the intended url as shown by the flag `[S.]` (Connection start acknowledged). Thus, establishing a connection for about two minutes as shown by the log timestamps. <br><br> After said connection, the log shows that the browser sends an `HTTP:GET version 1.1. Data push request` to `yummyrecipesforme.com`, it also shows that it was acknowledged with the flag `[P.]` (Data push acknowledged). This could be the malicious file download prompt. <br><br> When the prompted file was downloaded and allowed to run, the log shows that a `DNS request` is made to google domains server through the normal `port 52444`, but for an unintended url named `greatrecipesforme.com`, which has the associated `IP 192.0.2.172`. <br><br> Then, the source computer sends a connection request to the `.http port (port 80)` of `greatrecipesforme.com`, through the unexpected `port 56378`. The connection is then established between the spoofed website and the device, as shown by the flags `[S]` (Connection start) and `[S.]` (Connection start acknowledged) in the last log entries. Thus, traffic is rerouted from `yummyrecipesforme.com` to `greatrecipesforme.com`. <br><br> After reviewing the case, a senior analyst concluded that admin credentials of the site `yummyrecipesforme.com` were compromised by a `brute force attack`, thus allowing the malicious actor to modify the web page for redirecting traffic and installing malware. This was confirmed by said senior analyst, when he checked the source code, which showed an added `javascript` code that prompts the user to download the executable file and redirect traffic. It was concluded that the most likely suspect is a disgruntled employee. <br> | 

| **Section 3: Recommend one remediation for brute force attacks** | 
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <br> To avoid any further brute force attacks in the future, the `cyber security team` recommends the owner of `yummyrecipesforme.com` the following security measures: <br><br> 1. `Reset the admin login credentials`, so as to take control away from the malicious actor. <br> 2. Establish `Multi factor authorization` or `2 factor authorization`, to harden login access. This means adding extra steps to verify the identity of the person accessing. <br> 3. Establish `Captcha` or `reCaptcha` systems to avoid bots trying to `brute force passwords`. <br> 4. Enforce more `strict password policies`, such as regular changing, complex passwords, adding of different symbols than alpha numerical. <br> 5. Using `hashing` and `salting` tools for passwords to be `encrypted` and contain random characters. | 

[Back](./)
