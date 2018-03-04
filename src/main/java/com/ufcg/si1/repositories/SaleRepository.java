package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ufcg.si1.model.Sale;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
}