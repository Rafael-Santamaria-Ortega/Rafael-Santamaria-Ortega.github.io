---
layout: default
---

# Applying Filters to SQL queries | Linux, SQL

In this scenario, I obtain specific information about employees, their machines, and the departments they belong to from the database provided by the Google Certificate Lab. My team needs data to investigate potential security issues and to update computers. I am responsible for filtering the required information from the database. 

## Retrieve after hours failed login attempts 

To retrieve after hours failed login attempts I ran the following query: 

MariaDB [organization]> SELECT * FROM log_in_attempts WHERE login_time>'18:00' AND success=0;
+----------+-----------+------------+------------+---------+---------------+---------+
| event_id | username  | login_date | login_time | country | ip_address    | success |
+----------+-----------+------------+------------+---------+---------------+---------+
|       2  | apatel    | 2022-05-10 | 20:27:27   | CAN     | 192.168.205.12|    0    |
|      18  | pwashing  | 2022-05-11 | 19:28:20   | US      | 192.168.66.142|    0    |
|      20  | thash     | 2022-05-12 | 18:56:30   | MEXICO  | 192.168.109.50|    0    |
|      24  | aestrada  | 2022-05-09 | 19:28:12   | MEXICO  | 192.168.27.57 |    0    |
|      41  | drossa    | 2022-05-09 | 19:52:14   | USA     | 192.168.43.98 |    0    |
|      52  | cgriffin  | 2022-05-09 | 23:04:05   | USA     | 192.168.45.177|    0    |
|      53  | cjjackson | 2022-05-10 | 21:27:07   | CAN     | 192.168.54.57 |    0    |
|      69  | wjaffrey  | 2022-05-11 | 19:55:15   | USA     | 192.168.163.108|   0    |
|      81  | abennard  | 2022-05-12 | 23:38:46   | MEX     | 192.168.234.49 |   0    |
|      88  | apatle    | 2022-05-12 | 18:53:50   | CAN     | 192.168.132.153|   0    |
|      96  | ivelasco  | 2022-05-09 | 22:36:36   | CAN     | 192.168.84.163|    0    |
|     104  | asundara  | 2022-05-12 | 18:38:07   | USA     | 192.168.80.25 |    0    |
|     107  | bisles    | 2022-05-10 | 20:25:36   | USA     | 192.168.116.187|   0    |
|     111  | aestarada | 2022-05-10 | 21:00:26   | MEXICO  | 192.168.76.27 |    0    |
|     127  | abellmas  | 2022-05-11 | 22:00:55   | CANADA  | 192.168.170.192|   0    |
|     131  | bisles    | 2022-05-10 | 20:33:53   | USA     | 192.168.113.171|   0    |
|     155  | cgriffin  | 2022-05-12 | 21:28:42   | USA     | 192.168.236.176|   0    |
|     160  | jclark    | 2022-05-10 | 20:49:00   | CANADA  | 192.168.214.49 |   0    |
|     199  | ypaphah   | 2022-05-11 | 19:34:48   | MEXICO  | 192.168.44.232|    0    |
+----------+-----------+------------+------------+---------+---------------+---------+
19 rows in set (0.156 sec)

Breaking it down to it’s components: I use ‘SELECT’ to select the columns to return, in this case all, represented by the ‘*’. Then, ‘FROM’ to indicate the table containing said columns, in this case ‘log_in_attempts’. After, I use ‘WHERE’ to filter the relevant data, in this case unsuccessful login times past 18:00. The unsuccessful are represented by ‘0’ since the database stores success and failure in boolean. The ‘AND’ filter states that both conditions must be met. Of course, I also properly stated that the query is finished with a ‘;’. The output displays a table with failed login attempts after business hours (18:00). 

## Retrieve login attempts on specific dates 

To do this I used the following query:


Breaking it down to components: ‘SELECT * FROM’ was already explained. The change is in the ‘WHERE’ filters, which are now two conditions (login dates) that can be met, or just one or the other. This is represented by the filter ‘OR’. The output displays a table with the login attempts either in 2022-05-08 or 2022-05-09. 

## Retrieve login attempts outside of Mexico 

I used the next query for this:


Breaking it down to its components: The new components that need to be explained are the filters. In this case, to find all login attempts outside of Mexico I used the ‘NOT’ filter to negate a condition, after which I stated the condition ‘country LIKE ‘MEX%’. The ‘LIKE’ in this one is used to accommodate the wildcard ‘%’, which means that any entry in the column that contains ‘MEX’ or ‘MEX’ and something more should be displayed. 

The output displays a table with all the log in attempts made outside of Mexico. 

## Retrieve employees in Marketing 

To do this I used the next query: 


Breaking it down to its components: I have already explained all, the only thing to add here is the change of table and the use of ‘AND’ to specify two conditions to be met. The output displays a table with all employees from the Marketing department with an office in the east building. 

## Retrieve employees in Finance or Sales 

To do this I used the following query:



Breaking it down to its components: The only thing to add is that both conditions specified are stated with an ‘OR’, and that they both are from the same column. Despite this, they are two different conditions, so both must be fully stated. The output displays a table with all employees from Finance or Sales departments. 

## Retrieve all employees not in IT 

To do this I used the following query: 


Breaking it down to its components: The only thing to add is that the filter is the negation of a condition represented by ‘NOT’. 

The output displays a table with all employees that are not form IT department. 

## Summary 

First, I retrieve all failed login attempts after business hours. Second, I retrieve all login attempts that occurred on specific dates. Third, I retrieve logins that didn't originate in Mexico. Fourth, I retrieve information about certain employees in the Marketing department. Fifth, I retrieve information about employees in the Finance or the Sales department. Finally, I obtain information about employees who are not in the Information Technology department. 
