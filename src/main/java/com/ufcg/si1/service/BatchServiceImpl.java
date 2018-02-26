package com.ufcg.si1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Batch;

@Service("batchService")
public class BatchServiceImpl implements BatchService {
	
	@Autowired
	private DataBaseOperations databaseOperations;
	
	@Override
	public List<Batch> findAllBatchs() {
		return databaseOperations.findAllBatchs();
	}

	@Override
	public Batch saveBatch(Batch batch) {
		return databaseOperations.saveBatch(batch);
	}
	
}
