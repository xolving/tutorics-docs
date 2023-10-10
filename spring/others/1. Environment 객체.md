외부 설정 파일의 내용을 읽어와서 그 안에 있는 설정값들을 사용할 수 있는 객체이다.
하나의 애플리케이션에는 Environment 객체가 단 하나만 존재할 수 있으며 ```getProperty()``` 메소드로 값을 추출할 수 있다.

```properties
// userInfo.properties
user.name = 6283hz
user.password = what1234
```

```java
public class Main {
 public static void main(String[] args){
	// 1
	ConfigurableApplicationContext context = new GenericXmlApplicationContext(); 
	
	// 2
	ConfigurableEnvironment environment = context.getEnvironment();
	
	// 3
	MutablePropertySources source = environment.getPropertySources();
 }
}
```
1. context 객체를 생성한다.
2. environment 객체를 불러온다.
3. environment가 가지고 있는 모든 property 소스를 가져온다.

물론 원하는 property만 가져오는 방법도 있다.
```java
String userId = environment.getProperty("user.id");
System.out.println(userId);
```
