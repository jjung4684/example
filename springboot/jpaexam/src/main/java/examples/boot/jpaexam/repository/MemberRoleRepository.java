package examples.boot.jpaexam.repository;

import examples.boot.jpaexam.domain.MemberRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRoleRepository extends JpaRepository<MemberRole, Long> {

    MemberRole findByName(String name);
}
