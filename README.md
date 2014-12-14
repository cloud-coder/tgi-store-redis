tgi-store-redis
===============

- all your source code goes in here: lib/tgi-store-redis.source.js
- need to do npm install first
- uses thing called gulp to build - it will install some stuff for it but you may need to install global
- after above type gulp from bash (not sure how windows works - you prob using linux?)
- if successfail you should see this:

 gulp
[08:16:23] Using gulpfile ~/repos/tgi-store-redis/gulpfile.js
[08:16:23] Starting '_buildLib'...
[08:16:23] Starting '_buildSpec'...
[08:16:23] Finished '_buildSpec' after 21 ms
[08:16:23] Starting '_lintSpec'...
[08:16:23] Finished '_lintSpec' after 12 ms
[08:16:24] Finished '_buildLib' after 347 ms
[08:16:24] Starting '_lintLib'...
[08:16:24] Finished '_lintLib' after 2.95 ms
[08:16:24] Starting 'lint'...
[08:16:24] Finished 'lint' after 9.19 μs
[08:16:24] Starting 'test'...
*** MUTE ON ***
RedisStore unavailable (Error: Doug: need to code connect)

[08:16:24] 'test' errored after 76 ms
[08:16:24] Error: Command failed:
    at ChildProcess.exithandler (child_process.js:648:15)
    at ChildProcess.emit (events.js:98:17)
    at maybeClose (child_process.js:756:16)
    at Socket.<anonymous> (child_process.js:969:11)
    at Socket.emit (events.js:95:17)
    at Pipe.close (net.js:465:12)
$
