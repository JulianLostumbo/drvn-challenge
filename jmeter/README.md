Restful Booker JMeter Test

Prerequisites
----------------
1. Install Java 8+:
   > java -version

2. Download Apache JMeter (binary only):
   https://jmeter.apache.org/download_jmeter.cgi
   - Extract to: C:\apache-jmeter-5.6.3\

3. Add JMeter to your system PATH (optional)

Project Files
----------------
- Restful Booker - DRVN.jmx → The JMeter test plan
- bookingdata.txt → CSV test data used in the test

Running in GUI Mode
----------------------
For debugging or editing the test:
> jmeter.bat -t "Restful Booker - DRVN.jmx"
(Linux/Mac: ./jmeter -t "Restful Booker - DRVN.jmx")

Running in Non-GUI Mode (Performance)
---------------------------------------
1. Run test and store results:
> jmeter -n -t "Restful Booker - DRVN.jmx" -l results.jtl -q bookingdata.txt

2. Run test and generate HTML report:
> jmeter -n -t "Restful Booker - DRVN.jmx" -l results.jtl -e -o reports/ -q bookingdata.txt

3. Override properties from command line:
> jmeter -n -t "Restful Booker - DRVN.jmx" -l results.jtl -JBASE_URL=restful-booker.herokuapp.com -JTHREADS=20 -JRAMPUP=120 -JDURATION=300
In this last step, an scenario for 20 virtual users can be simulated with a 2 minutes ramp-up, followed by a 5 minutes of steady load.

Key Metrics to Monitor
-------------------------
- Throughput (requests per second)
- p95 latency (95th percentile response time)
- Error % (4xx/5xx/timeouts)
- Connection drops (saturation)

Example Full Run
-------------------
> cd C:\apache-jmeter-5.6.3\bin
> jmeter -n -t "C:\projects\Restful Booker - DRVN.jmx" -l C:\projects\results.jtl -e -o C:\projects\html-report -q C:\projects\bookingdata.txt

Then open:
> C:\projects\html-report\index.html