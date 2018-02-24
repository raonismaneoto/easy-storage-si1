package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ufcg.si1.model.Product;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
}