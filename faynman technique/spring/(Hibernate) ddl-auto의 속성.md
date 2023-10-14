> spring.jpa.hibernate.ddl-auto

# 속성
위의 properties에 들어갈 수 있는 속성의 종류이다.
- create: Entity로 등록된 클래스와 매핑된 테이블을 항상 생성한다. 기존에 있던 테이블은 무시하고 새로 만든다.
- create-drop: ```create```와 비슷하지만 애플리케이션이 종료될 때 테이블을 삭제한다.
- update: 기존에 테이블이 없다면 새로 테이블을 생성하고, 존재한다면 기존 테이블의 컬럼을 수정한다.
- validate: 다른 테이블과 다르게 DDL을 작성하여 테이블을 생성하거나 수정하지 않고 검사만 한다.
- none(default): 아무 일도 일어나지 않았다.




EntityManagerFactory factory = Persistence.createEntityManagerFactory("hello");  
EntityManager manager = factory.createEntityManager();  
EntityTransaction transaction = manager.getTransaction();  
