package com.ufcg.si1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ufcg.si1.dataBaseOperations.DataBaseOperations;
import com.ufcg.si1.model.Batch;
import com.ufcg.si1.model.Product;
import com.ufcg.si1.model.enumerations.Status;

@Service("productService")
public class ProductBatchServiceImpl implements ProductBatchService {

	@Autowired
	private DataBaseOperations dataBaseOperations;
	
	/*
	 * Product Operations
	 */
	@Override
	public List<Product> findAllProducts() {
		return dataBaseOperations.findAllProducts();
	}

	@Override
	public Product findProductByBarCode(String barCode) {
		return dataBaseOperations.findProduct(barCode);
	}
	
	@Override
	public Product saveProduct(Product product) {
		return dataBaseOperations.saveProduct(product);
	}
	
	@Override
	public Product updateProduct(Product product) {
		//TODO Find a better way to do that
		return dataBaseOperations.saveProduct(product);
	}

	@Override
	public void deleteProduct(String barCode) {
		dataBaseOperations.deleteProduct(barCode);
	}

	@Override
	public boolean productAlreadyExists(String barCode) {
		Product product = dataBaseOperations.findProduct(barCode);
		return product != null;
	}

	@Override
	public void makeProductAvailable(Product product) {
		product.setStatus(Status.AVAILABLE);
		dataBaseOperations.saveProduct(product);
	}
	
	/*
	 * Batch Operations
	 */
	@Override
	public List<Batch> findAllBatches() {
		return dataBaseOperations.findAllBatches();
	}

	@Override
	public Batch saveBatch(Batch batch) {
		Product product = batch.getProduct();
		if (batch.getNumberOfItems() > 0) {
			product.setStatus(Status.AVAILABLE);
			product = updateProduct(product);
		}
		batch.setProduct(product);
		return dataBaseOperations.saveBatch(batch);
	}
	
	@Override
	public List<Batch> getBatchesByProduct(Product product) {
		return dataBaseOperations.getBatchesByProduct(product);
	}
}
