---
layout: default
---

# Applying Filters to SQL queries | Linux, SQL

In this scenario, I obtain specific information about employees, their machines, and the departments they belong to from the database provided by the Google Certificate Lab. My team needs data to investigate potential security issues and to update computers. I am responsible for filtering the required information from the database. 

## Retrieve after hours failed login attempts 

To retrieve after hours failed login attempts I ran the following query: 

```sql
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
```

Breaking it down to it’s components: I use ‘SELECT’ to select the columns to return, in this case all, represented by the ‘*’. Then, ‘FROM’ to indicate the table containing said columns, in this case ‘log_in_attempts’. After, I use ‘WHERE’ to filter the relevant data, in this case unsuccessful login times past 18:00. The unsuccessful are represented by ‘0’ since the database stores success and failure in boolean. The ‘AND’ filter states that both conditions must be met. Of course, I also properly stated that the query is finished with a ‘;’. The output displays a table with failed login attempts after business hours (18:00). 

## Retrieve login attempts on specific dates 

To do this I used the following query:

```sql
MariaDB [organization]> SELECT *
    -> FROM log_in_attempts
    -> WHERE login_date='2022-05-08' OR login_date='2022-05-09';
+----------+----------+------------+------------+---------+---------------+---------+
| event_id | username | login_date | login_time | country | ip_address    | success |
+----------+----------+------------+------------+---------+---------------+---------+
|        1 | jrafael  | 2022-05-09 | 04:56:27   | CAN     | 192.168.243.140 |    1    |
|        3 | dkot     | 2022-05-09 | 06:47:41   | USA     | 192.168.151.162 |    1    |
|        5 | dkot     | 2022-05-08 | 02:00:39   | USA     | 192.168.178.71  |    1    |
|        8 | bisles   | 2022-05-08 | 01:30:17   | USA     | 192.168.119.173 |    1    |
|       11 | dkot     | 2022-05-09 | 10:02:31   | USA     | 192.168.100.158 |    1    |
|       15 | lyamamot | 2022-05-09 | 17:17:26   | USA     | 192.168.183.51  |    1    |
|       21 | arusso   | 2022-05-09 | 06:49:39   | MEXICO  | 192.168.118.171 |    1    |
|       23 | sabeliah | 2022-05-09 | 07:09:42   | USA     | 192.168.33.137  |    1    |
|       26 | apatel   | 2022-05-08 | 17:27:00   | CANADA  | 192.168.123.105 |    1    |
|       24 | aestrada | 2022-05-09 | 19:28:12   | MEXICO  | 192.168.27.57   |    0    |
+----------+----------+------------+------------+---------+---------------+---------+
```

Breaking it down to components: ‘SELECT * FROM’ was already explained. The change is in the ‘WHERE’ filters, which are now two conditions (login dates) that can be met, or just one or the other. This is represented by the filter ‘OR’. The output displays a table with the login attempts either in 2022-05-08 or 2022-05-09. 

## Retrieve login attempts outside of Mexico 

I used the next query for this:

```sql
MariaDB [organization]> SELECT *
    -> FROM log_in_attempts
    -> WHERE country LIKE 'MEX%';
+----------+----------+------------+------------+---------+---------------+---------+
| event_id | username | login_date | login_time | country | ip_address    | success |
+----------+----------+------------+------------+---------+---------------+---------+
|        1 | jrafael  | 2022-05-09 | 04:56:27   | CAN     | 192.168.243.140 |    1    |
|        2 | apatel   | 2022-05-10 | 20:27:27   | CAN     | 192.168.205.12  |    0    |
|        3 | dkot     | 2022-05-09 | 06:47:41   | USA     | 192.168.151.162 |    1    |
|        4 | dkot     | 2022-05-08 | 02:00:39   | USA     | 192.168.178.71  |    1    |
|        5 | jrafael  | 2022-05-11 | 03:05:59   | CANADA  | 192.168.86.232  |    1    |
|        7 | eraab    | 2022-05-11 | 01:45:14   | CAN     | 192.168.170.243 |    0    |
|        8 | bisles   | 2022-05-08 | 01:30:17   | US      | 192.168.119.173 |    1    |
|       10 | bisles   | 2022-05-12 | 09:33:19   | CANADA  | 192.168.228.221 |    1    |
|       11 | sgilmore | 2022-05-11 | 10:16:29   | CANADA  | 192.168.140.81  |    1    |
|       12 | dkot     | 2022-05-08 | 09:11:34   | USA     | 192.168.100.158 |    1    |
|       13 | jwrath   | 2022-05-11 | 09:29:34   | USA     | 192.168.246.135 |    0    |
+----------+----------+------------+------------+---------+---------------+---------+
```

Breaking it down to its components: The new components that need to be explained are the filters. In this case, to find all login attempts outside of Mexico I used the ‘NOT’ filter to negate a condition, after which I stated the condition ‘country LIKE ‘MEX%’. The ‘LIKE’ in this one is used to accommodate the wildcard ‘%’, which means that any entry in the column that contains ‘MEX’ or ‘MEX’ and something more should be displayed. 

The output displays a table with all the log in attempts made outside of Mexico. 

## Retrieve employees in Marketing 

To do this I used the next query: 

```sql
MariaDB [(organization)]> SELECT * FROM employees WHERE department="Marketing" AND office LIKE "East%";
employee_id | device_id     | username  | department | office
-----------|---------------|-----------|------------|-------
1000       | a320b137c219  | elarson   | Marketing  | East-170
1032       | a192b174c940  | jdacruz   | Marketing  | East-195 
1089       | b573yd83g772  | fbaatist  | Marketing  | East-267
1091       | b982h75m233   | pjohnson  | Marketing  | East-378
1103       | NULL          | randeras  | Marketing  | East-460
1161       | a184jh785707  | deliery   | Marketing  | East-417
1163       | h679l515j339  | cwilliam  | Marketing  | East-216

9 rows in set (0.001 sec)
```

Breaking it down to its components: I have already explained all, the only thing to add here is the change of table and the use of ‘AND’ to specify two conditions to be met. The output displays a table with all employees from the Marketing department with an office in the east building. 

## Retrieve employees in Finance or Sales 

To do this I used the following query:

```sql
MariaDB [(organization)]> SELECT * FROM employees WHERE department="Finance" OR department="Sales";
employee_id | device_id     | username  | department | office
-----------|---------------|-----------|------------|----------
1003       | d394eb16f943  | sgilmore  | Finance    | South-153
1004       | h17414974143  | jgeffrey  | Finance    | North-406
1008       | i858j583k571  | abernard  | Finance    | South-170
1009       | NULL          | brodrigq  | Sales      | South-134
1010       | k24212l2m542  | jlansky   | Finance    | South-109
1013       | l784m612n230  | claris    | Finance    | North-188
1015       | p61lq262r345  | jgoto     | Finance    | North-271
1017       | r530m624p230  | clark     | Finance    | South-488

8 rows in set (0.001 sec)
```

Breaking it down to its components: The only thing to add is that both conditions specified are stated with an ‘OR’, and that they both are from the same column. Despite this, they are two different conditions, so both must be fully stated. The output displays a table with all employees from Finance or Sales departments. 

## Retrieve all employees not in IT 

To do this I used the following query: 

```sql
MariaDB [(organization)]> SELECT * FROM employees WHERE NOT department='Information Technology';
employee_id | device_id     | username  | department         | office
-----------|---------------|-----------|--------------------|-----------
1000       | a320b137c219  | elarson   | Marketing          | East-170
1001       | b233c825d915  | jsmith    | Marketing          | Central-276
1002       | c116d593e558  | tshah     | Human Resources    | North-434
1003       | d394eb16f943  | sgilmore  | Finance            | South-153
1004       | e218f877p788  | ezaab     | Human Resources    | South-127
1005       | f551g340h832  | psparza   | Human Resources    | South-366
1007       | h174l4974l3   | wjaffrey  | Finance            | North-406
1008       | i858j583k571  | abernard  | Finance            | South-170
1009       | NULL          | irodriqx   | Sales             | South-134
1010       | k24212l2m542  | jlansky   | Finance            | South-292
1011       | l748m120n401  | drosas    | Sales              | South-292

11 rows in set (0.001 sec)
```

Breaking it down to its components: The only thing to add is that the filter is the negation of a condition represented by ‘NOT’. 

The output displays a table with all employees that are not form IT department. 

## Summary 

First, I retrieve all failed login attempts after business hours. Second, I retrieve all login attempts that occurred on specific dates. Third, I retrieve logins that didn't originate in Mexico. Fourth, I retrieve information about certain employees in the Marketing department. Fifth, I retrieve information about employees in the Finance or the Sales department. Finally, I obtain information about employees who are not in the Information Technology department. 
