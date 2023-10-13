```kotlin
implementation("org.springframework.cloud:spring-cloud")
```
Netflix hystrix에서 영감받아 만들어진 라이브러리로, Hystrix보다 가볍고 사용하기 쉬운 내결함성 라이브러리다. 위의 라이브러리는 여러 모듈로 이루어져있다.

- Resilience4j-circuitbreaker: 회로 차단기
- Resilience4j-ratelimiter: Rate limiter
- Resilience4j-bulkhead: Bulkheading
- Resilience4j-retry: 실패한 실행을 반복합니다.
- Resilience4j-timelimiter: Timeout handling
- Resilience4j-cache: Result caching

# Resilience4j-circuitbreaker

