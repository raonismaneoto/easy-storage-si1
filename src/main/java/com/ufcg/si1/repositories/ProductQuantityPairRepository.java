package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ufcg.si1.model.ProductQuantityPair;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductQuantityPairRepository extends JpaRepository<ProductQuantityPair, Long> {
}