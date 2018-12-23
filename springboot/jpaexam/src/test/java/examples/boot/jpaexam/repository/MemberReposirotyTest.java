package examples.boot.jpaexam.repository;

import examples.boot.jpaexam.domain.Member;
import examples.boot.jpaexam.domain.MemberRole;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Set;

@RunWith(SpringRunner.class)
@DataJpaTest
public class MemberReposirotyTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    public void getMemberTest(){
        Member member = memberRepository.getOne(1L);
        Set<MemberRole> memberRoles = member.getMemberRoles();

        for(MemberRole memberRole : memberRoles){
            System.out.println("*************************************");
            System.out.println(memberRole.getId() + " , " + memberRole.getName());
            System.out.println("*************************************");
        }

    }


}
