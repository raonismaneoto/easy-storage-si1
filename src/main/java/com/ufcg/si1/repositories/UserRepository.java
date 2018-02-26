package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ufcg.si1.model.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}