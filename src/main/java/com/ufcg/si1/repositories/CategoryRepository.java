package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ufcg.si1.model.Category;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
}