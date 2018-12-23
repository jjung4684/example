package examples.boot.jpaexam.security;

import examples.boot.jpaexam.domain.Member;
import examples.boot.jpaexam.domain.MemberRole;
import examples.boot.jpaexam.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberDetailsService implements UserDetailsService {

    @Autowired
    MemberService memberService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        //email에 해당하는 member 정보를 구한다.
        Member member = memberService.getMemberByEmail(email);
        List<GrantedAuthority> list = new ArrayList<>();

        for (MemberRole memberRole : member.getMemberRoles()){
            list.add(new SimpleGrantedAuthority(memberRole.getName()));
        }

        //userDetails를 구현하고 있는 객체를 생성 (email, password)
        UserDetails userDetails = new User(member.getEmail(), member.getPassword(), list);

        //해당 객체를 리턴
        return userDetails;
    }
}
