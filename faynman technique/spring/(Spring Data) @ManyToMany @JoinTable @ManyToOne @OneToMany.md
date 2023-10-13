```java
@Entity
public class Product {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   private String name;

   @ManyToMany(mappedBy = "products")
   private List<Member> members = new ArrayList<>();
}
```

```java
@Entity
public class Member {
  ...
   
   @ManyToMany
   @JoinTable(name = "member_product")
   private List<Product> products = new ArrayList<>();
   
  ...
}
```
- JPA @ManyToMany 어노테이션을 사용하고
- @JoinTable을 통해 연결할 테이블을 지정할 수 있다.
- 사용하지 않는다고 한다.
# @ManyToOne @OneToMany
```java
@Entity
public class Member {
  ...
       
   @OneToMany(mappedBy = "member")
   private List<MemberProduct> memberProducts = new ArrayList<>();

  ...
}
```

```java
@Entity
@Getter
@Setter
public class MemberProduct {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne
   @JoinColumn(name = "member_id")
   private Member member;

   @ManyToOne
   @JoinColumn(name = "product_id")
   private Product product;
}
```

```java
@Entity
public class Product {

  ...

   @OneToMany(mappedBy = "product")
   private List<MemberProduct> members = new ArrayList<>();
   
  ...
}
```
- JPA가 만들어내는 중간 테이블들을 밖으로 꺼내준다.