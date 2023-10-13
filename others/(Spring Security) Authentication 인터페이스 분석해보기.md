> package org.springframework.security.core

# 분석해보기
- Authentication 인터페이스는 Principal과 Serializable이라는 인터페이스를 상속받고 있다.
- AuthenticationManager를 통해 받아온 해당 클라이언트의 권한을 getAuthorities 메소드로 확인한다.


