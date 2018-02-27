package com.ufcg.si1.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufcg.si1.model.Batch;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {
}