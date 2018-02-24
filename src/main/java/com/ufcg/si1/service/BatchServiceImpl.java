package com.ufcg.si1.service;

import com.ufcg.si1.model.Batch;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

@Service("batchService")
public class BatchServiceImpl implements BatchService {

	private static final AtomicLong counter = new AtomicLong();

	private static List<Batch> batchs;

	static {
		batchs = new ArrayList<>();
	}

	@Override
	public List<Batch> findAllBatchs() {
		return batchs;
	}

	@Override
	public Batch saveBatch(Batch batch) {
		batch.setId(counter.incrementAndGet());
		batchs.add(batch);
		return batch;
	}

	@Override
	public Batch findById(long id) {
		for (Batch batch : batchs) {
			if (batch.getId() == id) {
				return batch;
			}
		}
		return null;
	}

	@Override
	public void updateBatch(Batch batch) {
		int index = batchs.indexOf(batch);
		batchs.set(index, batch);

	}

	@Override
	public void deleteBatchById(long id) {
		for (Iterator<Batch> iterator = batchs.iterator(); iterator.hasNext();) {
			Batch lote = iterator.next();
			if (lote.getId() == id) {
				iterator.remove();
			}
		}
	}
}
