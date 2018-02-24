package com.ufcg.si1.service;

import com.ufcg.si1.model.Batch;
import java.util.Iterator;
import java.util.List;

public interface BatchService {

	List<Batch> findAllBatchs();

	Batch findById(long id);

	void updateBatch(Batch batch);

	void deleteBatchById(long id);

	Batch saveBatch(Batch batch);
}
