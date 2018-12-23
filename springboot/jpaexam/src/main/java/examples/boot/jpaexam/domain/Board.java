package examples.boot.jpaexam.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "board")
@Getter
@Setter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_category_id")
    private BoardCategory boardCategory;

    //CascadeType.ALL : 영속성을 같이 관리하는 것
    //FetchType.LAZY : 연결된 도메인을 모두 조회는 안한다. 실행한것만 조회.
    //FetchType.EAGER : 연결된 도메인을 모두 조회 한다. 무한루프가 발생 가능 함.
    @OneToMany(mappedBy = "board", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BoardFile> boardFiles;

    private String title;
    private String content;
    private int readCount;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;


}
