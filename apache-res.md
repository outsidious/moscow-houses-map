### 1000 запросов с балансировкой

This is ApacheBench, Version 2.3 <$Revision: 1807734 $>       
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/      
Licensed to The Apache Software Foundation, http://www.apache.org/      
      
Benchmarking localhost (be patient)    
Completed 100 requests    
Completed 200 requests    
Completed 300 requests   
Completed 400 requests   
Completed 500 requests   
Completed 600 requests    
Completed 700 requests   
Completed 800 requests   
Completed 900 requests   
Completed 1000 requests   
Finished 1000 requests   
    
    
Server Software:        nginx/1.14.0    
Server Hostname:        localhost    
Server Port:            80    
    
Document Path:          /api/v1/   
Document Length:        139 bytes   
    
Concurrency Level:      15    
Time taken for tests:   0.707 seconds   
Complete requests:      1000    
Failed requests:        0   
Non-2xx responses:      1000    
Total transferred:      541000 bytes    
HTML transferred:       139000 bytes    
Requests per second:    1414.24 [#/sec] (mean)    
Time per request:       10.606 [ms] (mean)    
Time per request:       0.707 [ms] (mean, across all concurrent requests)   
Transfer rate:          747.17 [Kbytes/sec] received   
     
Connection Times (ms)    
              min  mean[+/-sd] median   max    
Connect:        0    1   3.0      1      17    
Processing:     1    9   6.0      7      27   
Waiting:        1    8   5.8      7      26    
Total:          1   10   6.5      9      32   
     
Percentage of the requests served within a certain time (ms)    
  50%      9    
  66%     13   
  75%     14   
  80%     16   
  90%     19   
  95%     22   
  98%     27   
  99%     30   
 100%     32 (longest request)   
